using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.Reminder
{
    public class UpdateReminderDTO
    {
        [DataType(DataType.Date)]
        public DateTime SetForDate { get; set; }  // The updated date for the reminder
    }
}
