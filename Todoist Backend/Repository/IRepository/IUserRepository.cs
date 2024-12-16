using ToDoList.Models;

namespace ToDoList.Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<List<User>> GetAllUsersWithRoleUserAsync();

    }
}
