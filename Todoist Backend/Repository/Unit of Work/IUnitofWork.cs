using ToDoList.Repository.IRepository;

namespace ToDoList.Repository.Unit_of_Work
{
    public interface IUnitofWork : IDisposable
    {
        IFeedbackRepository FeedbackRepository { get; }
        Task<int> SaveAsync();
    }
}
