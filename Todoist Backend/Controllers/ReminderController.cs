using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.Reminder;
using ToDoList.Models;
using ToDoList.Repository;
using ToDoList.Repository.IRepository;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReminderController : ControllerBase
    {
        private readonly IReminderRepository _reminderRepository;
        private readonly ITaskRepository _taskRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public ReminderController(IReminderRepository reminderRepository, ITaskRepository taskRepository,IUserRepository userRepository ,IMapper mapper)
        {
            _reminderRepository = reminderRepository;
            _taskRepository = taskRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost("add-reminder")]
        public async Task<IActionResult> AddReminder([FromBody] AddReminderDTO addReminderDto)
        {
            // Validate if the task exists
            var task = await _taskRepository.GetByIdAsync(addReminderDto.TodoTaskId);
            if (task == null)
            {
                return NotFound("TodoTask not found.");
            }

            // Validate if the user exists
            var user = await _userRepository.GetByIdAsync(addReminderDto.SetBy);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Manually map the DTO to the Reminder entity
            var reminder = new Reminder
            {
                TodoTaskId = addReminderDto.TodoTaskId,
                SetBy = addReminderDto.SetBy,
                SetForDate = addReminderDto.SetForDate,
                IsSent = false
            };

            // Save the reminder using the repository
            var createdReminder = await _reminderRepository.AddAsync(reminder);

            return Ok(createdReminder);
        }

        [HttpPut("update-reminder/{id}")]
        public async Task<IActionResult> UpdateReminder(int id, [FromBody] UpdateReminderDTO updateReminderDto)
        {
            // Validate if the reminder exists
            var existingReminder = await _reminderRepository.GetByIdAsync(id);
            if (existingReminder == null)
            {
                return NotFound("Reminder not found.");
            }

            // Map the DTO to the existing reminder entity
            _mapper.Map(updateReminderDto, existingReminder);

            // Save the updated reminder using the repository
            await _reminderRepository.UpdateAsync(existingReminder);

            return Ok(existingReminder);
        }

        [HttpDelete("delete-reminder/{id}")]
        public async Task<IActionResult> DeleteReminder(int id)
        {
            // Validate if the reminder exists
            var reminder = await _reminderRepository.GetByIdAsync(id);
            if (reminder == null)
            {
                return NotFound("Reminder not found.");
            }

            // Delete the reminder using the repository
            await _reminderRepository.DeleteAsync(reminder);

            return Ok("Reminder deleted successfully.");
        }

        // GET: api/reminder/user/{userId}/unsent-reminders
        [HttpGet("user/{userId}/unsent-reminders")]
        public async Task<IActionResult> GetUnsentRemindersByUserId(int userId)
        {
            try
            {
                // Fetch unsent reminders
                var reminderMessages = await _reminderRepository.GetUnsentRemindersByUserIdAsync(userId);

                if (!reminderMessages.Any())
                {
                    return NotFound("No unsent reminders found.");
                }

                return Ok(reminderMessages);
            }
            catch (Exception ex)
            {
                // Log the error (not shown here)
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/reminder/{reminderId}/mark-as-read
        [HttpPut("{reminderId}/mark-as-read")]
        public async Task<IActionResult> MarkReminderAsRead(int reminderId)
        {
            try
            {
                // Mark reminder as sent
                await _reminderRepository.MarkReminderAsSentAsync(reminderId);

                return Ok("Reminder marked as sent.");
            }
            catch (Exception ex)
            {
                // Log the error (not shown here)
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
