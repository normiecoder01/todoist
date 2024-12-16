using ToDoList.Data;
using ToDoList.Repository.IRepository;

namespace ToDoList.Repository.Unit_of_Work
{


    public class UnitOfWork : IUnitofWork
    {
        private readonly AppDbContext _context;
        public IFeedbackRepository FeedbackRepository { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            FeedbackRepository = new FeedbackRepository(_context);
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }


}
