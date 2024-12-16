using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.DTOs.Bucket
{
    public class CreateBucketDTO
    {
        [Required(ErrorMessage = "Bucket name is required.")]
        [StringLength(100, ErrorMessage = "Bucket name cannot exceed 100 characters.")]
        public string BucketName { get; set; }

        public int CreatedBy { get; set; }
    }
}
