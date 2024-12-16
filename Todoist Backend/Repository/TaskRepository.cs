using ToDoList.Data;
using ToDoList.DTOs.TodoTask;
using ToDoList.Models;
using ToDoList.Repository.IRepository;
using ToDoList.Repository.Repository;
using Microsoft.EntityFrameworkCore;

namespace ToDoList.Repository
{
    public class TaskRepository : Repository<TodoTask>, ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context) : base(context)
        {
             _context = context;
        }

        public async Task<List<InCompleteTodoTaskDTO>> GetIncompleteTasksByUserIdAsync(int userId)
        {
            var incompleteTasks = await (from task in _dbSet
                                         join createdByUser in _context.Users
                                             on task.CreatedBy equals createdByUser.UserId
                                         join assignedToUser in _context.Users
                                             on task.AssignedTo equals assignedToUser.UserId
                                         join bucket in _context.Buckets
                                             on task.BucketId equals bucket.BucketId
                                         where (task.AssignedTo == userId || task.CreatedBy == userId)
                                             && !task.IsComplete
                                         select new InCompleteTodoTaskDTO
                                         {
                                             TodoTaskId = task.TodoTaskId,
                                             TaskTitle = task.TaskTitle,
                                             TaskDescription = task.TaskDescription,
                                             TaskPriority = task.TaskPriority,
                                             RepeatFrequency = task.RepeatFrequency,
                                             CreatedDate = task.CreatedDate,
                                             DueDate = task.DueDate,
                                             PercentageComplete = task.PercentageComplete,
                                             CreatedByUserName = createdByUser.UserName,    // Fetch CreatedBy username
                                             AssignedToUserName = assignedToUser.UserName,  // Fetch AssignedTo username
                                             BucketName = bucket.BucketName                 // Fetch Bucket name
                                         })
                                         .ToListAsync();

            return incompleteTasks;
        }

        public async Task<List<CompleteTodoTaskDTO>> GetCompletedTasksByUserIdAsync(int userId)
        {
            var completedTasks = await (from task in _dbSet
                                        join createdByUser in _context.Users
                                            on task.CreatedBy equals createdByUser.UserId
                                        join assignedToUser in _context.Users
                                            on task.AssignedTo equals assignedToUser.UserId
                                        join bucket in _context.Buckets
                                            on task.BucketId equals bucket.BucketId
                                        where (task.AssignedTo == userId || task.CreatedBy == userId)
                                            && task.IsComplete // Change for completed tasks
                                        select new CompleteTodoTaskDTO
                                        {
                                            TodoTaskId = task.TodoTaskId,
                                            TaskTitle = task.TaskTitle,
                                            TaskDescription = task.TaskDescription,
                                            TaskPriority = task.TaskPriority,
                                            RepeatFrequency = task.RepeatFrequency,
                                            CreatedDate = task.CreatedDate,
                                            DueDate = task.DueDate,
                                            CompletedDate = task.CompletedDate,
                                            CreatedByUserName = createdByUser.UserName,   // Fetch CreatedBy username
                                            AssignedToUserName = assignedToUser.UserName, // Fetch AssignedTo username
                                            BucketName = bucket.BucketName                // Fetch Bucket name
                                        })
                                        .ToListAsync();

            return completedTasks;
        }

    }
}
