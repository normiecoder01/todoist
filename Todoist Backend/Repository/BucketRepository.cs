using Microsoft.EntityFrameworkCore;
using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Repository.IRepository;
using ToDoList.Repository.Repository;

namespace ToDoList.Repository
{
    public class BucketRepository : Repository<Bucket>, IBucketRepository
    {
        private readonly AppDbContext _context;
        public BucketRepository(AppDbContext context) : base(context)
        {
            _context = context; 
        }

        // Implementation of the GetBucketsByUserIdAsync method
        public async Task<IEnumerable<Bucket>> GetBucketsByUserIdAsync(int userId)
        {
            return await _context.Buckets
                .Where(b => b.CreatedBy == userId) // Filtering by CreatedBy (UserId)
                .ToListAsync();
        }
    }
}
