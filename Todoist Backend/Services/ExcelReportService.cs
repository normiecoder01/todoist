using ClosedXML.Excel;
using ToDoList.DTOs.ReportDTOs;
using ToDoList.Services.Interface;

namespace ToDoList.Services
{
    public class ExcelReportService : IExcelReportService
    {
        public byte[] GenerateOverdueTasksReportExcel(List<UserOverdueTaskDTO> reportData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Overdue Tasks Report");

                int row = 1;

                foreach (var user in reportData)
                {
                    // Add user details
                    worksheet.Cell(row, 1).Value = "First Name";
                    worksheet.Cell(row, 2).Value = user.FirstName;
                    worksheet.Cell(row, 3).Value = "Last Name";
                    worksheet.Cell(row, 4).Value = user.LastName;
                    worksheet.Cell(row, 5).Value = "Email";
                    worksheet.Cell(row, 6).Value = user.Email;
                    worksheet.Cell(row, 7).Value = "Phone Number";
                    worksheet.Cell(row, 8).Value = user.PhoneNumber;

                    row++;

                    // Add header for tasks
                    worksheet.Cell(row, 1).Value = "Task Title";
                    worksheet.Cell(row, 2).Value = "Task Description";
                    worksheet.Cell(row, 3).Value = "Task Assigned By";
                    worksheet.Cell(row, 4).Value = "Task Due Date";
                    worksheet.Cell(row, 5).Value = "Time Elapsed";
                    worksheet.Cell(row, 6).Value = "Task Priority";
                    worksheet.Cell(row, 7).Value = "Percentage Complete";

                    row++;

                    // Add overdue tasks for each user
                    foreach (var task in user.OverdueTasks)
                    {
                        worksheet.Cell(row, 1).Value = task.TaskTitle;
                        worksheet.Cell(row, 2).Value = task.TaskDescription;
                        worksheet.Cell(row, 3).Value = task.TaskAssignedBy;
                        worksheet.Cell(row, 4).Value = task.TaskDueDate.ToString("yyyy-MM-dd");
                        worksheet.Cell(row, 5).Value = task.TimeElapsed;
                        worksheet.Cell(row, 6).Value = task.TaskPriority;
                        worksheet.Cell(row, 7).Value = task.PercentageComplete;

                        row++;
                    }

                    row++;
                    row++;// Add an empty row between users
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public byte[] GenerateDailyTaskCountReportExcel(List<DailyTaskCountDTO> reportData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Daily Task Count Report");

                int row = 1;

                foreach (var dailyReport in reportData)
                {
                    // Add date
                    worksheet.Cell(row, 1).Value = "Date";
                    worksheet.Cell(row, 2).Value = dailyReport.Date.ToString("dd/MM/yyyy");

                    row++;

                    // Add task counts for the day
                    worksheet.Cell(row, 1).Value = "Total Tasks Created";
                    worksheet.Cell(row, 2).Value = dailyReport.TotalTasksCreated;
                    row++;

                    worksheet.Cell(row, 1).Value = "Total Tasks Updated";
                    worksheet.Cell(row, 2).Value = dailyReport.TotalTasksUpdated;
                    row++;

                    worksheet.Cell(row, 1).Value = "Total Tasks Completed";
                    worksheet.Cell(row, 2).Value = dailyReport.TotalTasksCompleted;
                    row++;

                    worksheet.Cell(row, 1).Value = "Total Tasks Due";
                    worksheet.Cell(row, 2).Value = dailyReport.TotalTasksDue;
                    row++;

                    row++; // Add an empty row between dates
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public byte[] GenerateReminderReportExcel(List<DailyReminderReportDTO> reportData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Reminder Report");

                int row = 1;

                foreach (var dailyReport in reportData)
                {
                    // Add date
                    worksheet.Cell(row, 1).Value = "Date";
                    worksheet.Cell(row, 2).Value = dailyReport.Date.ToString("dd/MM/yyyy");

                    row++;

                    // Add headers
                    worksheet.Cell(row, 1).Value = "Username";
                    worksheet.Cell(row, 2).Value = "FirstName";
                    worksheet.Cell(row, 3).Value = "LastName";
                    worksheet.Cell(row, 4).Value = "TaskTitle";
                    worksheet.Cell(row, 5).Value = "DueDate";

                    row++;

                    // Add reminder data
                    foreach (var reminder in dailyReport.Reminders)
                    {
                        worksheet.Cell(row, 1).Value = reminder.UserName;
                        worksheet.Cell(row, 2).Value = reminder.FirstName;
                        worksheet.Cell(row, 3).Value = reminder.LastName;
                        worksheet.Cell(row, 4).Value = reminder.TaskTitle;
                        worksheet.Cell(row, 5).Value = reminder.DueDate?.ToString("yyyy-MM-dd");

                        row++;
                    }

                    row++; // Add an empty row between dates
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public byte[] GenerateCompletedTasksReportExcel(List<UserCompletedTasksDTO> reportData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Completed Tasks Report");

                int row = 1;

                foreach (var userReport in reportData)
                {
                    // Add user details
                    worksheet.Cell(row, 1).Value = "Username";
                    worksheet.Cell(row, 2).Value = userReport.UserName;
                    worksheet.Cell(row, 3).Value = "First Name";
                    worksheet.Cell(row, 4).Value = userReport.FirstName;
                    worksheet.Cell(row, 5).Value = "Last Name";
                    worksheet.Cell(row, 6).Value = userReport.LastName;
                    worksheet.Cell(row, 7).Value = "DateFrom";
                    worksheet.Cell(row, 8).Value = userReport.DateFrom.ToString("yyyy-MM-dd");
                    worksheet.Cell(row, 9).Value = "DateTo";
                    worksheet.Cell(row, 10).Value = userReport.DateTo.ToString("yyyy-MM-dd");

                    row++;

                    // Add header for tasks
                    worksheet.Cell(row, 1).Value = "TaskTitle";
                    worksheet.Cell(row, 2).Value = "Description";
                    worksheet.Cell(row, 3).Value = "DateCreated";
                    worksheet.Cell(row, 4).Value = "DueDate";
                    worksheet.Cell(row, 5).Value = "Complete";
                    worksheet.Cell(row, 6).Value = "CreatedBy";

                    row++;

                    // Add completed tasks for the user
                    foreach (var task in userReport.CompletedTasks)
                    {
                        worksheet.Cell(row, 1).Value = task.TaskTitle;
                        worksheet.Cell(row, 2).Value = task.Description;
                        worksheet.Cell(row, 3).Value = task.DateCreated.ToString("yyyy-MM-dd");
                        worksheet.Cell(row, 4).Value = task.DueDate?.ToString("yyyy-MM-dd");
                        worksheet.Cell(row, 5).Value = task.Complete?.ToString("yyyy-MM-dd");
                        worksheet.Cell(row, 6).Value = task.CreatedBy;

                        row++;
                    }

                    row++; // Add an empty row between users
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public byte[] GenerateNoDueDateTasksReportExcel(List<NoDueDateTasksDTO> reportData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("No Due Date Tasks Report");

                // Add headers
                worksheet.Cell(1, 1).Value = "Username";
                worksheet.Cell(1, 2).Value = "FirstName";
                worksheet.Cell(1, 3).Value = "LastName";
                worksheet.Cell(1, 4).Value = "TaskTitle";
                worksheet.Cell(1, 5).Value = "TaskDescription";
                worksheet.Cell(1, 6).Value = "AssignedTo";

                int row = 2;

                // Add task data
                foreach (var task in reportData)
                {
                    worksheet.Cell(row, 1).Value = task.UserName;
                    worksheet.Cell(row, 2).Value = task.FirstName;
                    worksheet.Cell(row, 3).Value = task.LastName;
                    worksheet.Cell(row, 4).Value = task.TaskTitle;
                    worksheet.Cell(row, 5).Value = task.TaskDescription;
                    worksheet.Cell(row, 6).Value = task.AssignedTo;

                    row++;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public byte[] GenerateTasksClosedAfterNoonReportExcel(List<UserTaskClosedAfterNoonDTO> reportData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Tasks Closed After Noon Report");

                int row = 1;

                foreach (var userReport in reportData)
                {
                    // Add user details
                    worksheet.Cell(row, 1).Value = "First Name";
                    worksheet.Cell(row, 2).Value = userReport.FirstName;
                    worksheet.Cell(row, 3).Value = "Last Name";
                    worksheet.Cell(row, 4).Value = userReport.LastName;
                    worksheet.Cell(row, 5).Value = "Username";
                    worksheet.Cell(row, 6).Value = userReport.UserName;

                    row++;

                    // Add header for task details
                    worksheet.Cell(row, 1).Value = "Task Title";
                    worksheet.Cell(row, 2).Value = "Task Description";
                    worksheet.Cell(row, 3).Value = "Created Date";
                    worksheet.Cell(row, 4).Value = "Completed Time";
                    worksheet.Cell(row, 5).Value = "Due Date";

                    row++;

                    // Add task details
                    worksheet.Cell(row, 1).Value = userReport.TaskDetails.TaskTitle;
                    worksheet.Cell(row, 2).Value = userReport.TaskDetails.TaskDescription;
                    worksheet.Cell(row, 3).Value = userReport.TaskDetails.CreatedDate.ToString("yyyy-MM-dd");
                    worksheet.Cell(row, 4).Value = userReport.TaskDetails.CompletedTime.ToString(@"hh\:mm");
                    worksheet.Cell(row, 5).Value = userReport.TaskDetails.DueDate?.ToString("yyyy-MM-dd");

                    row++;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }



    }

}
