using Microsoft.EntityFrameworkCore;
using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Repository.IRepository;
using ToDoList.Repository.Repository;

namespace ToDoList.Repository
{
    public class ReminderRepository : Repository<Reminder>, IReminderRepository
    {
        private readonly AppDbContext _context;

        public ReminderRepository(AppDbContext context) : base(context)
        {
            _context = context;

        }

        // Fetch unsent reminders for a user
        public async Task<IEnumerable<string>> GetUnsentRemindersByUserIdAsync(int userId)
        {
            var reminders = await _context.Reminders
                .Include(r => r.TodoTask)
                .Where(r => r.SetBy == userId && !r.IsSent)
                .ToListAsync();

            var reminderMessages = reminders.Select(r =>
                r.TodoTask.DueDate.HasValue
                ? $"Reminder for task '{r.TodoTask.TaskTitle}' due on {r.TodoTask.DueDate.Value.ToString("yyyy-MM-dd")}"
                : $"Reminder for task '{r.TodoTask.TaskTitle}' without a due date."
            );

            return reminderMessages;
        }

        // Mark a specific reminder as sent
        public async Task MarkReminderAsSentAsync(int reminderId)
        {
            var reminder = await _context.Reminders.FindAsync(reminderId);
            if (reminder != null)
            {
                reminder.IsSent = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}

