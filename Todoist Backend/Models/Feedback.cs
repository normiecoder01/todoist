using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ToDoList.Models
{


    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        [Required(ErrorMessage = "Feedback type is required.")]
        [StringLength(50)]
        public string FeedbackType { get; set; }

        [Required(ErrorMessage = "Feedback text is required.")]
        [StringLength(1000, ErrorMessage = "Feedback text cannot exceed 1000 characters.")]
        public string FeedbackText { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        // Foreign key to User
        
        [Required(ErrorMessage = "Created by user is required.")]
        public int CreatedByUserId { get; set; }  // Foreign key

        // Navigation property to User
        [ForeignKey("CreatedByUserId")]
        public virtual User CreatedBy { get; set; }  // Navigation property to User





    }


}
