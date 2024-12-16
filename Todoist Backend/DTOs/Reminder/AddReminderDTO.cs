using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.Reminder
{
    public class AddReminderDTO
    {

        public int TodoTaskId { get; set; }

        public int SetBy { get; set; } // Assuming the UserId is a string

        [DataType(DataType.Date, ErrorMessage = "Invalid date format for SetForDate.")]
        public DateTime SetForDate { get; set; }

    }
}
