using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{
    public class TodoTask
    {
        [Key]
        public int TodoTaskId { get; set; }


        [Required(ErrorMessage = "Task title is required.")]
        [StringLength(200, ErrorMessage = "Task title cannot exceed 200 characters.")]
        public string TaskTitle { get; set; }


        [StringLength(1000, ErrorMessage = "Task description cannot exceed 1000 characters.")]
        public string TaskDescription { get; set; }


        [Required(ErrorMessage = "Task priority is required.")]
        public string TaskPriority { get; set; }


        public bool IsComplete { get; set; }

        [Required(ErrorMessage = "Repeat Frequency is required.")]
        public string RepeatFrequency { get; set; }


        [Required(ErrorMessage = "Created date is required.")]
        public DateTime CreatedDate { get; set; }


        [DataType(DataType.Date, ErrorMessage = "Invalid date format.")]
        public DateTime? DueDate { get; set; }


        [DataType(DataType.Date, ErrorMessage = "Invalid date format.")]
        public DateTime? UpdatedDate { get; set; }

        public DateTime? CompletedDate { get; set; }


        [Range(0, 100, ErrorMessage = "Completion percentage must be between 0 and 100.")]
        public int PercentageComplete { get; set; }


        // Foreign Key for CreatedBy (User table)
        [Required(ErrorMessage = "Created by user is required.")]
        public int CreatedBy { get; set; }


        // Foreign Key for AssignedTo (User table)
        public int AssignedTo { get; set; }


        // Foreign Key for Bucket
        [Required(ErrorMessage = "Bucket is required.")]
        public int BucketId { get; set; }


        // Navigation Properties
        //public virtual Bucket Bucket { get; set; } // Navigation to Bucket   //Commented because its was causing cyclic reference during json serialization.
        public virtual ICollection<Reminder> Reminders { get; set; }
        public virtual User User { get; set; }

        //public string? AttachmentFilePath { get; set; }
        //public string? AttachmentFileName { get; set; }


    }
}
