namespace ToDoList.DTOs.ReportDTOs
{
    public class DailyReminderReportDTO
    {
        public DateOnly Date { get; set; }
        public List<ReminderDTO> Reminders { get; set; }
    }
}
