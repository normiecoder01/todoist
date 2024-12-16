using ToDoList.Models;

namespace ToDoList.Repository.IRepository
{
    public interface IBucketRepository : IRepository<Bucket>
    {
        // Method to get buckets by user ID
        Task<IEnumerable<Bucket>> GetBucketsByUserIdAsync(int userId);
    }
}
