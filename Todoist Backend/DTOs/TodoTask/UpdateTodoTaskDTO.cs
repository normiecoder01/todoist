using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.TodoTask
{
    public class UpdateTodoTaskDTO
    {
        [StringLength(200, ErrorMessage = "Task title cannot exceed 200 characters.")]
        public string TaskTitle { get; set; }


        [StringLength(1000, ErrorMessage = "Task description cannot exceed 1000 characters.")]
        public string TaskDescription { get; set; }

        public string TaskPriority { get; set; }

        [Required(ErrorMessage = "Repeat Frequency is required.")]
        public string RepeatFrequency { get; set; }

        [DataType(DataType.Date, ErrorMessage = "Invalid date format.")]
        public DateTime? DueDate { get; set; }

        // Foreign Key for AssignedTo (User table)
        public int AssignedTo { get; set; }

        // Foreign Key for Bucket
        [Required(ErrorMessage = "Bucket is required.")]
        public int BucketId { get; set; }
    }
}
