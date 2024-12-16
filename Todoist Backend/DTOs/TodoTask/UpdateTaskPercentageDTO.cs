using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.TodoTask
{
    public class UpdateTaskPercentageDTO
    {
        [Range(0, 100, ErrorMessage = "Completion percentage must be between 0 and 100.")]
        public int PercentageComplete { get; set; }
    }
}
