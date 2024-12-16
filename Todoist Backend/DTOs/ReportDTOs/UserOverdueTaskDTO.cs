namespace ToDoList.DTOs.ReportDTOs
{
    public class UserOverdueTaskDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<OverdueTaskDTO> OverdueTasks { get; set; }
    }
}
