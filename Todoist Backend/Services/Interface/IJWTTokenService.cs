using ToDoList.Models;

namespace ToDoList.Services.Interface
{
    public interface IJWTTokenService 
    {
        Task<string> GenerateToken(AppUser user);
    }
}
