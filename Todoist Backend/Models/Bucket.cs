using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.Models
{
    public class Bucket
    {
        [Key]
        public int BucketId { get; set; }

        // Bucket name with required validation and maximum string length
        [Required(ErrorMessage = "Bucket name is required.")]
        [StringLength(100, ErrorMessage = "Bucket name cannot exceed 100 characters.")]
        public string BucketName { get; set; }

        // Foreign Key for the user who created the bucket
        [Required(ErrorMessage = "CreatedBy user is required.")]
        [ForeignKey("CreatedByUser")]
        public int CreatedBy { get; set; }

        // Navigation Properties
        public virtual ICollection<TodoTask> TodoTasks { get; set; }

        public virtual User User { get; set; } // Navigation to User (Creator)
    }
}
