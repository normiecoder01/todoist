using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Please enter the Username.")]
        public string Username { get; set; }


        [Required(ErrorMessage = "Please enter the Password.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
