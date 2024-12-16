using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Repository;
using ToDoList.Repository.IRepository;
using ToDoList.Services.Interface;

namespace ToDoList.Services
{
    public class TaskRecurringService : ITaskRecurringService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskRecurringService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task ProcessRepeatingTasks()
        {
            var tasks = await _taskRepository.GetAllAsync();
            foreach (var task in tasks)
            {

                // Skip processing if DueDate is null
                if (task.RepeatFrequency != "None" && task.DueDate.HasValue && task.DueDate.Value < DateTime.UtcNow)
                {
                    var newTask = new TodoTask
                    {
                        TaskTitle = task.TaskTitle,
                        TaskDescription = task.TaskDescription,
                        TaskPriority = task.TaskPriority,
                        IsComplete = false,
                        DueDate = GetNextDueDate(task.DueDate.Value, task.RepeatFrequency),
                        CreatedDate = DateTime.UtcNow,
                        UpdatedDate = null,
                        PercentageComplete = 0,
                        CreatedBy = task.CreatedBy,
                        AssignedTo = task.AssignedTo,
                        BucketId = task.BucketId,
                        RepeatFrequency = task.RepeatFrequency
                    };

                    await _taskRepository.AddAsync(newTask);
                }
            }
        }

        private DateTime GetNextDueDate(DateTime dueDate, string frequency)
        {
            switch (frequency.ToLower())
            {
                case "daily":
                    return dueDate.AddDays(1);
                case "weekly":
                    return dueDate.AddDays(7);
                case "monthly":
                    return dueDate.AddMonths(1);
                case "yearly":
                    return dueDate.AddYears(1);
                default:
                    return dueDate;
            }
        }
    }

}

