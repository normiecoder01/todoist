using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.Auth
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Please Enter the Firstname.")]
        [StringLength(50, ErrorMessage = "Character length should be less than 50.")]
        [RegularExpression(@"^[a-zA-Z]{1,50}$", ErrorMessage = "Only letters are allowed and the maximum length is 50.")]
        public string Firstname { get; set; }


        [Required(ErrorMessage = "Please Enter the Lastname.")]
        [StringLength(50, ErrorMessage = "Character length should be less than 50.")]
        [RegularExpression(@"^[a-zA-Z]{1,50}$", ErrorMessage = "Only letters are allowed and the maximum length is 50.")]
        public string Lastname { get; set; }


        [Required(ErrorMessage = "Please enter the email address.")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter the Username.")]
        [StringLength(25, ErrorMessage = "Maximum 25 chareacter length username is allowed.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "please enter the email address.")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$",
            ErrorMessage = "The input must be at least 8 characters long and include at " +
            "least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Please enter the mobile no.")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Please enter a 10-digit mobile number.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Mobile number must be 10 digits and contain only numbers.")]
        public string Mobileno { get; set; }


        [Required(ErrorMessage = "Please agree the terms and conditions.")]
        public bool IsAgreed { get; set; }

    }
}
