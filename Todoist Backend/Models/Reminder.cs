using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoList.Models
{
    public class Reminder
    {
        [Key]
        public int ReminderId { get; set; }

        // Foreign Key to TodoTask
        [Required(ErrorMessage = "Todo task ID is required.")]
        public int TodoTaskId { get; set; }

        // Foreign Key for the user who set the reminder
        [Required(ErrorMessage = "SetBy user is required.")]
        [StringLength(100, ErrorMessage = "SetBy user ID cannot exceed 100 characters.")]
        public int SetBy { get; set; } // Assuming the UserId is a string

        [Required(ErrorMessage = "Reminder date is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid date format for SetForDate.")]
        public DateTime SetForDate { get; set; }

        public bool IsSent { get; set; } = false; // Default value indicating if the reminder was sent

        // Navigation Property
        [JsonIgnore]
        public virtual TodoTask TodoTask { get; set; } // Navigation to TodoTask

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
