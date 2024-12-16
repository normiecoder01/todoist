using ToDoList.DTOs.ReportDTOs;

namespace ToDoList.Repository.IRepository
{
    public interface IReportRepository 
    {
        public List<UserOverdueTaskDTO> GetOverdueTasksPerUser();

        public List<DailyTaskCountDTO> GetDailyTaskCounts(DateOnly dateFrom, DateOnly dateTo);

        public List<DailyReminderReportDTO> GetRemindersPerDay(DateOnly dateFrom, DateOnly dateTo);

        public List<UserCompletedTasksDTO> GetTasksCompletedInLast7Days(DateOnly dateFrom, DateOnly dateTo);

        public List<NoDueDateTasksDTO> GetTasksWithNoDueDate();

        public List<UserTaskClosedAfterNoonDTO> GetTasksClosedAfterNoon();
    }
}
