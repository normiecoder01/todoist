using DocumentFormat.OpenXml;
using ToDoList.Data;
using ToDoList.DTOs.ReportDTOs;
using ToDoList.Models;
using ToDoList.Repository.IRepository;

namespace ToDoList.Repository
{
    public class ReportRepository : IReportRepository
    {
        private readonly AppDbContext _context;

        public ReportRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<UserOverdueTaskDTO> GetOverdueTasksPerUser()
        {
            var currentDate = DateTime.Now;

            var overdueTasksPerUser = (from user in _context.Users
                                       join task in _context.TodoTasks on user.UserId equals task.AssignedTo
                                       join creator in _context.Users on task.CreatedBy equals creator.UserId
                                       where task.DueDate.HasValue && task.DueDate.Value < currentDate && !task.IsComplete
                                       select new
                                       {
                                           user.FirstName,
                                           user.LastName,
                                           user.Email,
                                           user.MobileNo,
                                           TaskTitle = task.TaskTitle,
                                           TaskDescription = task.TaskDescription,
                                           TaskAssignedBy = creator.UserName, // Task created by this user
                                           TaskDueDate = task.DueDate,
                                           TimeElapsed = currentDate.Subtract(task.DueDate.Value).Days + " days overdue",
                                           TaskPriority = task.TaskPriority,
                                           PercentageComplete = task.PercentageComplete
                                       }).ToList();

            var groupedResult = overdueTasksPerUser
                .GroupBy(u => new { u.FirstName, u.LastName, u.Email, u.MobileNo })
                .Select(group => new UserOverdueTaskDTO
                {
                    FirstName = group.Key.FirstName,
                    LastName = group.Key.LastName,
                    Email = group.Key.Email,
                    PhoneNumber = group.Key.MobileNo,
                    OverdueTasks = group.Select(task => new OverdueTaskDTO
                    {
                        TaskTitle = task.TaskTitle,
                        TaskDescription = task.TaskDescription,
                        TaskAssignedBy = task.TaskAssignedBy,
                        TaskDueDate = task.TaskDueDate ?? DateTime.MinValue,
                        TimeElapsed = task.TimeElapsed,
                        TaskPriority = task.TaskPriority,
                        PercentageComplete = task.PercentageComplete
                    }).ToList()
                }).ToList();

            return groupedResult;
        }


        public List<DailyTaskCountDTO> GetDailyTaskCounts(DateOnly dateFrom, DateOnly dateTo)
        {
            var dailyTaskCounts = new List<DailyTaskCountDTO>();

            for (var date = dateFrom; date <= dateTo; date = date.AddDays(1))
            {
                var totalTasksCreated = _context.TodoTasks

                   
                    .Where(task =>  DateOnly.FromDateTime(task.CreatedDate) == date)
                    .Count();

                var totalTasksUpdated = _context.TodoTasks
                    .Where(task => task.UpdatedDate.HasValue && DateOnly.FromDateTime(task.UpdatedDate.Value) == date)
                    .Count();

                var totalTasksCompleted = _context.TodoTasks
                    .Where(task => task.CompletedDate.HasValue && DateOnly.FromDateTime(task.CompletedDate.Value) == date)
                    .Count();

                var totalTasksDue = _context.TodoTasks
                    .Where(task => task.DueDate.HasValue && DateOnly.FromDateTime(task.DueDate.Value) == date)
                    .Count();

                dailyTaskCounts.Add(new DailyTaskCountDTO
                {
                    Date = date,
                    TotalTasksCreated = totalTasksCreated,
                    TotalTasksUpdated = totalTasksUpdated,
                    TotalTasksCompleted = totalTasksCompleted,
                    TotalTasksDue = totalTasksDue
                });
            }

            return dailyTaskCounts;
        }

        public List<DailyReminderReportDTO> GetRemindersPerDay(DateOnly dateFrom, DateOnly dateTo)
        {
            var reminderReport = new List<DailyReminderReportDTO>();

            for (var date = dateFrom; date <= dateTo; date = date.AddDays(1))
            {
                var reminders = _context.Reminders
                    .Where(reminder => DateOnly.FromDateTime(reminder.SetForDate) == date)
                    
                    .Select(reminder => new ReminderDTO
                    {
                        UserName = reminder.User.UserName,
                        FirstName = reminder.User.FirstName,
                        LastName = reminder.User.LastName,
                        TaskTitle = reminder.TodoTask.TaskTitle,
                        DueDate = reminder.TodoTask.DueDate
                    })
                    .ToList();

                reminderReport.Add(new DailyReminderReportDTO
                {
                    Date = date,
                    Reminders = reminders
                });
            }

            return reminderReport;
        }

        public List<UserCompletedTasksDTO> GetTasksCompletedInLast7Days(DateOnly dateFrom, DateOnly dateTo)
        {
            var completedTasksReport = (from user in _context.Users
                                        join task in _context.TodoTasks on user.UserId equals task.AssignedTo
                                        join creator in _context.Users on task.CreatedBy equals creator.UserId
                                        where task.CompletedDate.HasValue
                                              && DateOnly.FromDateTime(task.CompletedDate.Value) >= dateFrom
                                              && DateOnly.FromDateTime(task.CompletedDate.Value) <= dateTo
                                              && task.IsComplete
                                              
                                        select new UserCompletedTasksDTO
                                        {
                                            UserName = user.UserName,
                                            FirstName = user.FirstName,
                                            LastName = user.LastName,
                                            DateFrom = dateFrom,
                                            DateTo = dateTo,
                                            CompletedTasks = new List<CompletedTaskDTO>
                                    {
                                        new CompletedTaskDTO
                                        {
                                            TaskTitle = task.TaskTitle,
                                            Description = task.TaskDescription,
                                            DateCreated = task.CreatedDate,
                                            DueDate = task.DueDate,
                                            Complete = task.CompletedDate,
                                            CreatedBy = creator.UserName // Joined to get the CreatedBy user
                                        }
                                    }
                                        })
                                        .ToList();

            return completedTasksReport;
        }

        public List<NoDueDateTasksDTO> GetTasksWithNoDueDate()
        {
            var noDueDateTasks = (from task in _context.TodoTasks
                                  join user in _context.Users on task.AssignedTo equals user.UserId
                                  where task.DueDate == null
                                  select new NoDueDateTasksDTO
                                  {
                                      UserName = user.UserName,
                                      FirstName = user.FirstName,
                                      LastName = user.LastName,
                                      TaskTitle = task.TaskTitle,
                                      TaskDescription = task.TaskDescription,
                                      AssignedTo = user.UserName
                                  })
                                  .ToList();

            return noDueDateTasks;
        }


        public List<UserTaskClosedAfterNoonDTO> GetTasksClosedAfterNoon()            
        {
            var today = DateTime.Now;
            var noonTime = new DateTime(today.Year, today.Month, today.Day, 12, 0, 0);

            var tasksClosedAfterNoon = (from user in _context.Users
                                        join task in _context.TodoTasks on user.UserId equals task.AssignedTo
                                        where task.CompletedDate.HasValue
                                              && task.CompletedDate.Value.Date == today.Date
                                              && task.CompletedDate.Value.TimeOfDay > noonTime.TimeOfDay
                                              && task.IsComplete
                                        select new UserTaskClosedAfterNoonDTO
                                        {
                                            FirstName = user.FirstName,
                                            LastName = user.LastName,
                                            UserName = user.UserName,
                                            TaskDetails = new TaskClosedAfterNoonDTO
                                            {
                                                TaskTitle = task.TaskTitle,
                                                TaskDescription = task.TaskDescription,
                                                CreatedDate = task.CreatedDate,
                                                CompletedTime = task.CompletedDate.Value.TimeOfDay,
                                                DueDate = task.DueDate
                                            }
                                        }).ToList();

            return tasksClosedAfterNoon;
        }



    }
}
