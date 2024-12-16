using ToDoList.DTOs.ReportDTOs;
using ToDoList.Models;

namespace ToDoList.Repository.IRepository
{
    public interface IReminderRepository : IRepository<Reminder>
    {
        Task<IEnumerable<string>> GetUnsentRemindersByUserIdAsync(int userId);

        Task MarkReminderAsSentAsync(int reminderId);

    }
}
