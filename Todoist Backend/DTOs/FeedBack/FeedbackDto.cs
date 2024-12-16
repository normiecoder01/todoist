using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.FeedBack
{


    //public class FeedbackDto
    //{
    //    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    //    public int Rating { get; set; }

    //    [Required(ErrorMessage = "Feedback type is required.")]
    //    public string FeedbackType { get; set; }

    //    [Required(ErrorMessage = "Feedback text is required.")]
    //    public string FeedbackText { get; set; }

    //    [EmailAddress(ErrorMessage = "Invalid email address.")]
    //    public string Email { get; set; }
    //}



    public class FeedbackDto
    {
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

        public DateTime CreatedAt { get; set; }

        // Since we are using a foreign key, we store the UserId here
        public int CreatedBy { get; set; }

        // If you need user details in the response, you can add this property
        public string CreatedByUserName { get; set; }
    }



}
