namespace ToDoList.DTOs.ReportDTOs
{
    public class ReminderDTO
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TaskTitle { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? TaskDueDate { get; internal set; }
        public int ReminderId { get; internal set; }
        public string ReminderMessage { get; internal set; }
    }
}
