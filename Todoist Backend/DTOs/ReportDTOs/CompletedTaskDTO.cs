using System.Runtime.CompilerServices;

namespace ToDoList.DTOs.ReportDTOs
{
    public class CompletedTaskDTO
    {
        public string TaskTitle { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? Complete { get; set; }
        public string CreatedBy { get; set; }
    }
}
