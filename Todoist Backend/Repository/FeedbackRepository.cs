using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Repository.IRepository;
using ToDoList.Repository.Repository;

namespace ToDoList.Repository
{


    public class FeedbackRepository : Repository<Feedback>, IFeedbackRepository
    {
        public FeedbackRepository(AppDbContext context) : base(context)
        {
        }
    }


}
