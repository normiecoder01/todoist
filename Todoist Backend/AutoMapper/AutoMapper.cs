using AutoMapper;
using ToDoList.DTOs.Bucket;
using ToDoList.DTOs.Reminder;
using ToDoList.DTOs.TodoTask;
using ToDoList.DTOs.User;
using ToDoList.Models;

namespace ToDoList.AutoMapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper() {

            CreateMap<Bucket, BucketDTO>();

            // Mapping from CreateTodoTaskDTO to TodoTask
            CreateMap<CreateTodoTaskDTO, TodoTask>()
                // Automatically map the fields that match in both DTO and Entity
                .ForMember(dest => dest.TodoTaskId, opt => opt.Ignore()) // Explicit ignore for TodoTaskId
                .ForMember(dest => dest.CompletedDate, opt => opt.Ignore()); // Explicit ignore for TodoTaskId

            CreateMap<UpdateTodoTaskDTO, TodoTask>();

            CreateMap<User, UserDTO>();

            CreateMap<AddReminderDTO, Reminder>();

            CreateMap<UpdateReminderDTO, Reminder>();  // For the update functionality

        }
    }
}
