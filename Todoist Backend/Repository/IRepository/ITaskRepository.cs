
using ToDoList.DTOs.TodoTask;
using ToDoList.Models;
using ToDoList.Repository.Repository;

namespace ToDoList.Repository.IRepository
{
    public interface ITaskRepository : IRepository<TodoTask>
    {
        public Task<List<InCompleteTodoTaskDTO>> GetIncompleteTasksByUserIdAsync(int userId);

        public Task<List<CompleteTodoTaskDTO>> GetCompletedTasksByUserIdAsync(int userId);



    }
}
