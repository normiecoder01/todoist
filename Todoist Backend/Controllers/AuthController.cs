using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Data;
using ToDoList.DTOs.Auth;
using ToDoList.Models;
using ToDoList.Repository.IRepository;
using ToDoList.Services.Interface;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly IJWTTokenService _jwtTokenService;
        private readonly AppDbContext _context;
        private readonly IUserRepository _userRepository;


        //Dependency injection using Constructor
        public AuthController(UserManager<AppUser> userManager,
                              SignInManager<AppUser> signInManager,
                              IConfiguration config,
                              IJWTTokenService jwtTokenService,
                              AppDbContext context,
                              IUserRepository userRepository)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenService = jwtTokenService;
            _context = context;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            // Check if the Username already exists
            var existingUser = _context.Users.FirstOrDefault(user => user.UserName == model.Username);

            if (existingUser != null)
            {
                return BadRequest(new { message = "Username already exists. Please choose a different Username." });
            }

            // Create a new ApplicationUser for Identity
            var identityUser = new AppUser
            {
                Email = model.Email,
                UserName = model.Username,   
                PhoneNumber = model.Mobileno,
            };

            // Create the user in the Identity framework
            var result = await _userManager.CreateAsync(identityUser, model.Password);

            if (result.Succeeded)
            {
                // Assign the default role "User"
                await _userManager.AddToRoleAsync(identityUser, "User");
                // Fetch the roles assigned to the user
                var roles = await _userManager.GetRolesAsync(identityUser);

                // Assuming only one role is assigned, we'll take the first one
                var userRole = roles.FirstOrDefault();

                // Save the user details in the User table
                var user = new User
                {
                    FirstName = model.Firstname,
                    LastName = model.Lastname,
                    Email = model.Email,
                    UserName = model.Username,
                    MobileNo = model.Mobileno,
                    AppUserId = identityUser.Id,
                    UserRole = userRole

                };

                await _userRepository.AddAsync(user);

                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoggedInUser>> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == model.Username);
            if (user == null)
            {
                return Unauthorized("Invalid Username.");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Username or Password is incorrect.");
            }
            else
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userData = _context.Users.FirstOrDefault(u => u.AppUserId == user.Id);
                var loggedInUser = new LoggedInUser
                {
                    FirstName = userData.FirstName,
                    LastName = userData.LastName,
                    Email = user.Email,
                    UserName = user.UserName,
                    UserId = userData.UserId,
                    Token = await _jwtTokenService.GenerateToken(user),
                    Role = userData.UserRole,
                    Expiration = DateTime.Now.AddHours(3),
                };
                return Ok(loggedInUser);
            }
        }

    }
}
