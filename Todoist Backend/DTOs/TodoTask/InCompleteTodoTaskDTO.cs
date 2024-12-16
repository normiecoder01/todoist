using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.TodoTask
{
    public class InCompleteTodoTaskDTO
    {
        public int TodoTaskId { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public string TaskPriority { get; set; }
        public string RepeatFrequency { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int PercentageComplete { get; set; }
        public string CreatedByUserName { get; set; }
        public string AssignedToUserName { get; set; }

        public string BucketName { get; set; }

    }
}
