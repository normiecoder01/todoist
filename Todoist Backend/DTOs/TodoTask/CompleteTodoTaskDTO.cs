using System.ComponentModel.DataAnnotations;
using ToDoList.Models;

namespace ToDoList.DTOs.TodoTask
{
    public class CompleteTodoTaskDTO
    {
        public int TodoTaskId { get; set; }

        public string TaskTitle { get; set; }

        public string TaskDescription { get; set; }

        public string TaskPriority { get; set; }

        public string RepeatFrequency { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public string CreatedByUserName { get; set; }

        public string AssignedToUserName { get; set; }

        public string BucketName { get; set; }

    }
}
