namespace ToDoList.DTOs.ReportDTOs
{
    public class TaskCountReportDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }

        // Task counts based on different statuses and priorities
        public int PendingTaskCount { get; set; }
        public int CompletedTaskCount { get; set; }
        public int OverdueTaskCount { get; set; }

        // Task counts by priority (assuming priority is a string like "High", "Low", etc.)
        public int HighPriorityTaskCount { get; set; }
        public int MediumPriorityTaskCount { get; set; }
        public int LowPriorityTaskCount { get; set; }
    }

}
