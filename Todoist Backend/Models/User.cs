using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, ErrorMessage = "First name can't exceed 50 characters.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(50, ErrorMessage = "Last name can't exceed 50 characters.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, ErrorMessage = "Username can't exceed 50 characters.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Mobile number is required.")]
        [Phone(ErrorMessage = "Invalid mobile number format.")]
        public string MobileNo { get; set; }

        public string UserRole { get; set; }

        // Link to the ApplicationUser class
        [ForeignKey("AppUser")]
        public string AppUserId { get; set; }

        // Navigation property
        public virtual AppUser AppUser { get; set; }

        public virtual ICollection<TodoTask> TodoTasks { get; set; }

        public virtual ICollection<Bucket> Buckets { get; set; }

        public virtual ICollection<Reminder> Reminders { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }

    }
}
