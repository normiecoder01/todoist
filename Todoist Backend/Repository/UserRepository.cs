using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Repository.IRepository;
using ToDoList.Repository.Repository;

namespace ToDoList.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public readonly AppDbContext _context;
        public UserRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsersWithRoleUserAsync()
        {
            return await _dbSet.Where(user => user.UserRole == "User").ToListAsync();
        }
    }
}
