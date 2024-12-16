namespace ToDoList.DTOs.ReportDTOs
{
    public class OverdueTaskDTO
    {
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public string TaskAssignedBy { get; set; }
        public DateTime TaskDueDate { get; set; }
        public string TimeElapsed { get; set; } // We will calculate this
        public string TaskPriority { get; set; }
        public int PercentageComplete { get; set; }
    }
}
