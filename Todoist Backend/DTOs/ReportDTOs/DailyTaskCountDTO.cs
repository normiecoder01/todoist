namespace ToDoList.DTOs.ReportDTOs
{
    public class DailyTaskCountDTO
    {
        public DateOnly Date { get; set; }
        public int TotalTasksCreated { get; set; }
        public int TotalTasksUpdated { get; set; }
        public int TotalTasksCompleted { get; set; }
        public int TotalTasksDue { get; set; }
    }
}
