using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.User;
using ToDoList.Repository.IRepository;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsersWithRoleUser()
        {
            var users = await _userRepository.GetAllUsersWithRoleUserAsync();

            // Optional: If you want to map it to a DTO
            var userDtos = _mapper.Map<List<UserDTO>>(users);

            return Ok(userDtos); // Or return Ok(users); if not using DTO
        }
    }
}