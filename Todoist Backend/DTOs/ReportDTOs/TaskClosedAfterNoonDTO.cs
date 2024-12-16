namespace ToDoList.DTOs.ReportDTOs
{
    public class TaskClosedAfterNoonDTO
    {
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime CreatedDate { get; set; }
        public TimeSpan CompletedTime { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
