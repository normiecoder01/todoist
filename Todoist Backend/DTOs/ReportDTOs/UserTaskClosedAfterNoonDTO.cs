namespace ToDoList.DTOs.ReportDTOs
{
    public class UserTaskClosedAfterNoonDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public TaskClosedAfterNoonDTO TaskDetails { get; set; }
    }
}
