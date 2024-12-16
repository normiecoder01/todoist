using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.ReportDTOs;
using ToDoList.Repository.IRepository;
using ToDoList.Services.Interface;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly IExcelReportService _excelReportService;

        public ReportController(IReportRepository reportRepository, IExcelReportService excelReportService)
        {
            _reportRepository = reportRepository;
            _excelReportService = excelReportService;
        }

        // API to get the report on the screen
        [HttpGet("overdue-tasks")]
        public ActionResult<List<UserOverdueTaskDTO>> GetOverdueTasksReport()
        {
            var reportData = _reportRepository.GetOverdueTasksPerUser();
            return Ok(reportData);
        }

        // API to download the Excel report
        [HttpGet("overdue-tasks/excel")]
        public IActionResult GetOverdueTasksReportExcel()
        {
            var reportData = _reportRepository.GetOverdueTasksPerUser();
            var excelFile = _excelReportService.GenerateOverdueTasksReportExcel(reportData);
            return File(excelFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "OverdueTasksReport.xlsx");
        }

        [HttpGet("daily-task-count")]
        public ActionResult<List<DailyTaskCountDTO>> GetDailyTaskCountReport([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
        {
            var reportData = _reportRepository.GetDailyTaskCounts(dateFrom, dateTo);
            return Ok(reportData);
        }

        [HttpGet("daily-task-count/excel")]
        public IActionResult GetDailyTaskCountReportExcel([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
        {
            var reportData = _reportRepository.GetDailyTaskCounts(dateFrom, dateTo);
            var excelFile = _excelReportService.GenerateDailyTaskCountReportExcel(reportData);
            return File(excelFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DailyTaskCountReport.xlsx");
        }

        [HttpGet("reminders-per-day")]
        public ActionResult<List<DailyReminderReportDTO>> GetRemindersPerDay([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
        {
            var reportData = _reportRepository.GetRemindersPerDay(dateFrom, dateTo);
            return Ok(reportData);
        }

        [HttpGet("reminders-per-day/excel")]
        public IActionResult GetRemindersPerDayExcel([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
        {
            var reportData = _reportRepository.GetRemindersPerDay(dateFrom, dateTo);
            var excelFile = _excelReportService.GenerateReminderReportExcel(reportData);
            return File(excelFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ReminderReport.xlsx");
        }

        [HttpGet("completed-tasks")]
        public ActionResult<List<UserCompletedTasksDTO>> GetCompletedTasksReport([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
        {
            var reportData = _reportRepository.GetTasksCompletedInLast7Days(dateFrom, dateTo);
            return Ok(reportData);
        }

        [HttpGet("completed-tasks/excel")]
        public IActionResult GetCompletedTasksReportExcel([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
        {
            var reportData = _reportRepository.GetTasksCompletedInLast7Days(dateFrom, dateTo);
            var excelFile = _excelReportService.GenerateCompletedTasksReportExcel(reportData);
            return File(excelFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "CompletedTasksReport.xlsx");
        }

        [HttpGet("no-due-date-tasks")]
        public ActionResult<List<NoDueDateTasksDTO>> GetNoDueDateTasksReport()
        {
            var reportData = _reportRepository.GetTasksWithNoDueDate();
            return Ok(reportData);
        }

        [HttpGet("no-due-date-tasks/excel")]
        public IActionResult GetNoDueDateTasksReportExcel()
        {
            var reportData = _reportRepository.GetTasksWithNoDueDate();
            var excelFile = _excelReportService.GenerateNoDueDateTasksReportExcel(reportData);
            return File(excelFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "NoDueDateTasksReport.xlsx");
        }


        [HttpGet("tasks-closed-after-noon")]
        public ActionResult<List<UserTaskClosedAfterNoonDTO>> GetTasksClosedAfterNoonReport()
        {
            var reportData = _reportRepository.GetTasksClosedAfterNoon();
            return Ok(reportData);
        }


        [HttpGet("tasks-closed-after-noon/excel")]
        public IActionResult GetTasksClosedAfterNoonReportExcel()
        {
            var reportData = _reportRepository.GetTasksClosedAfterNoon();
            var excelFile = _excelReportService.GenerateTasksClosedAfterNoonReportExcel(reportData);
            return File(excelFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "TasksClosedAfterNoonReport.xlsx");
        }






    }
}
