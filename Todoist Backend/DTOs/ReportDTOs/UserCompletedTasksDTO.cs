namespace ToDoList.DTOs.ReportDTOs
{
    public class UserCompletedTasksDTO
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
        public List<CompletedTaskDTO> CompletedTasks { get; set; }
    }
}
