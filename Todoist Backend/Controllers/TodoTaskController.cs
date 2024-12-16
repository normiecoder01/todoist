using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.Bucket;
using ToDoList.DTOs.ReportDTOs;
using ToDoList.DTOs.TodoTask;
using ToDoList.Models;
using ToDoList.Repository.IRepository;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IBucketRepository _bucketRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public TaskController(ITaskRepository taskRepository, IBucketRepository bucketRepository, IMapper mapper, IUserRepository userRepository)
        {
            _bucketRepository = bucketRepository;
            _taskRepository = taskRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }



        //// GET: api/task/user-task-report
        //[HttpGet("user-task-report")]
        //public async Task<IActionResult> GetUserTaskReports()
        //{
        //    var tasks = await _taskRepository.GetAllAsync();
        //    var users = await _userRepository.GetAllAsync();

        //    // Group tasks by user and calculate task counts
        //    var report = users.Select(user => new TaskCountReportDto
        //    {
        //        UserId = user.UserId,
        //        UserName = user.UserName,

        //        PendingTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && !t.IsComplete),
        //        CompletedTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.IsComplete),
        //        OverdueTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && !t.IsComplete && t.DueDate < DateTime.UtcNow),

        //        HighPriorityTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.TaskPriority == "High"),
        //        MediumPriorityTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.TaskPriority == "Medium"),
        //        LowPriorityTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.TaskPriority == "Low")
        //    }).ToList();

        //    return Ok(report);
        //}

        // og code


        [HttpPost("create")]
        public async Task<IActionResult> CreateTask([FromBody] CreateTodoTaskDTO createTodoTaskDto)
        {
            // Validate that the bucket exists
            var bucket = await _bucketRepository.GetByIdAsync(createTodoTaskDto.BucketId);
            if (bucket == null)
            {
                return NotFound("Bucket not found.");
            }

            var todoTask = _mapper.Map<TodoTask>(createTodoTaskDto);
            if (todoTask != null)
            {
                todoTask.IsComplete = false;
                todoTask.CreatedDate = DateTime.Now;
                todoTask.UpdatedDate = DateTime.Now;
                todoTask.PercentageComplete = 0;
            }
            //var todoTask = new TodoTask
            //{
            //    TaskTitle = createTodoTaskDto.TaskTitle,
            //    TaskDescription = createTodoTaskDto.TaskDescription,
            //    TaskPriority = createTodoTaskDto.TaskPriority,
            //    IsComplete = false,
            //    RepeatFrequency = createTodoTaskDto.RepeatFrequency,
            //    CreatedDate = DateTime.Now,
            //    DueDate = DateTime.Now,
            //    UpdatedDate = DateTime.Now,
            //    PercentageComplete = 0,
            //    CreatedBy = createTodoTaskDto.CreatedBy,
            //    AssignedTo = createTodoTaskDto.AssignedTo,
            //    BucketId = createTodoTaskDto.BucketId
            //};

            // Save the new task using the repository
            var createdTask = await _taskRepository.AddAsync(todoTask);

            return Ok(createdTask);
        }

        [HttpPut("update/{taskId}")]
        public async Task<IActionResult> UpdateTask(int taskId, [FromBody] UpdateTodoTaskDTO updateTodoTaskDto)
        {
            // Fetch the existing task
            var existingTask = await _taskRepository.GetByIdAsync(taskId);
            if (existingTask == null)
            {
                return NotFound("Task not found.");
            }

            // Validate that the bucket exists (if the bucket can be changed)
            var bucket = await _bucketRepository.GetByIdAsync(updateTodoTaskDto.BucketId);
            if (bucket == null)
            {
                return NotFound("Bucket not found.");
            }

            // Map the updated values from DTO to the existing task
            _mapper.Map(updateTodoTaskDto, existingTask);

            // Update the UpdatedDate to the current time
            existingTask.UpdatedDate = DateTime.Now;

            // Save the updated task in the repository
            await _taskRepository.UpdateAsync(existingTask);

            return Ok(existingTask);
        }

        [HttpPatch("update-percentage/{taskId}")]
        public async Task<IActionResult> UpdateTaskPercentage(int taskId, [FromBody] UpdateTaskPercentageDTO updateTaskPercentageDto)
        {
            // Fetch the existing task
            var existingTask = await _taskRepository.GetByIdAsync(taskId);
            if (existingTask == null)
            {
                return NotFound("Task not found.");
            }

            // Update PercentageComplete
            existingTask.PercentageComplete = updateTaskPercentageDto.PercentageComplete;

            //// Update task completion status based on PercentageComplete
            //if (existingTask.PercentageComplete == 100)
            //{
            //    existingTask.IsComplete = true;
            //    existingTask.CompletedDate = DateTime.Now;
            //}
            //else
            //{
            //    existingTask.IsComplete = false;
            //    existingTask.CompletedDate = null;  // Reset if the task is no longer complete
            //}

            // Update the UpdatedDate to the current time
            existingTask.UpdatedDate = DateTime.Now;

            // Save the changes to the repository
            await _taskRepository.UpdateAsync(existingTask);

            return Ok(existingTask);
        }

        [HttpPatch("update-completion/{taskId}")]
        public async Task<IActionResult> UpdateTaskCompletion(int taskId, [FromBody] UpdateTaskCompletionDTO updateTaskCompletionDto)
        {
            // Fetch the existing task
            var existingTask = await _taskRepository.GetByIdAsync(taskId);
            if (existingTask == null)
            {
                return NotFound("Task not found.");
            }

            // Update IsComplete
            existingTask.IsComplete = updateTaskCompletionDto.IsComplete;

            // Update CompletedDate and PercentageComplete based on the IsComplete value
            if (existingTask.IsComplete == true)
            {
                existingTask.CompletedDate = DateTime.Now;
                existingTask.PercentageComplete = 100;
            }

            // Update the UpdatedDate to the current time
            existingTask.UpdatedDate = DateTime.Now;

            // Save the changes to the repository
            await _taskRepository.UpdateAsync(existingTask);

            return Ok(existingTask);
        }

        [HttpDelete("delete/{taskId}")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            // Fetch the existing task
            var existingTask = await _taskRepository.GetByIdAsync(taskId);
            if (existingTask == null)
            {
                return NotFound("Task not found.");
            }

            // Delete the task using the repository
            await _taskRepository.DeleteAsync(existingTask);

            return Ok($"Task with ID {taskId} has been deleted.");
        }

        [HttpGet("incomplete-tasks/{userId}")]
        public async Task<IActionResult> GetIncompleteTasksByUserId(int userId)
        {
            var incompleteTasks = await _taskRepository.GetIncompleteTasksByUserIdAsync(userId);

            if (incompleteTasks == null || !incompleteTasks.Any())
            {
                // Return an empty list instead of NotFound
                return Ok(new List<InCompleteTodoTaskDTO>());
            }

            return Ok(incompleteTasks);
        }

        [HttpGet("completed-tasks/{userId}")]
        public async Task<IActionResult> GetCompletedTasksByUserId(int userId)
        {
            var completedTasks = await _taskRepository.GetCompletedTasksByUserIdAsync(userId);

            if (completedTasks == null || !completedTasks.Any())
            {
                // Return an empty list instead of NotFound
                return Ok(new List<CompleteTodoTaskDTO>());
            }

            return Ok(completedTasks);
        }

        // Get a bucket by ID
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound("Bucket not found.");
            }

            return Ok(task);
        }


        // GET: api/task/user-task-report
        [HttpGet("user-task-report")]
        public async Task<IActionResult> GetUserTaskReport()
        {
            var tasks = await _taskRepository.GetAllAsync();
            var users = await _userRepository.GetAllAsync();

            // Group tasks by user and calculate task counts
            var report = users.Select(user => new TaskCountReportDto
            {
                UserId = user.UserId,
                UserName = user.UserName,

                PendingTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && !t.IsComplete),
                CompletedTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.IsComplete),
                OverdueTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && !t.IsComplete && t.DueDate < DateTime.UtcNow),

                HighPriorityTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.TaskPriority == "Important"),
                MediumPriorityTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.TaskPriority == "Medium"),
                LowPriorityTaskCount = tasks.Count(t => t.AssignedTo == user.UserId && t.TaskPriority == "Low")
            }).ToList();

            return Ok(report);
        }



    }



}

