using ToDoList.DTOs.ReportDTOs;

namespace ToDoList.Services.Interface
{
    public interface IExcelReportService
    {
        public byte[] GenerateOverdueTasksReportExcel(List<UserOverdueTaskDTO> reportData);

        public byte[] GenerateDailyTaskCountReportExcel(List<DailyTaskCountDTO> reportData);

        public byte[] GenerateReminderReportExcel(List<DailyReminderReportDTO> reportData);

        public byte[] GenerateCompletedTasksReportExcel(List<UserCompletedTasksDTO> reportData);

        public byte[] GenerateNoDueDateTasksReportExcel(List<NoDueDateTasksDTO> reportData);

        public byte[] GenerateTasksClosedAfterNoonReportExcel(List<UserTaskClosedAfterNoonDTO> reportData);

    }
}
