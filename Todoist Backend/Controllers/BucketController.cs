using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.Bucket;
using ToDoList.Models;
using ToDoList.Repository.IRepository;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BucketController : ControllerBase
    {

        private readonly IBucketRepository _bucketRepository;
        private readonly IMapper _mapper;

        public BucketController(IBucketRepository bucketRepository, IMapper mapper)
        {
            _bucketRepository = bucketRepository;
            _mapper = mapper;
        }

        // Create a new bucket
        [HttpPost("create")]
        public async Task<IActionResult> CreateBucket([FromBody] CreateBucketDTO createBucketDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bucket = new Bucket
            {
                BucketName = createBucketDto.BucketName,
                CreatedBy = createBucketDto.CreatedBy
            };

            var createdBucket = await _bucketRepository.AddAsync(bucket);
            var bucketDTO = _mapper.Map<BucketDTO>(createdBucket);
            return Ok(bucketDTO);
        }

        // Get all buckets
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllBuckets()
        {
            var buckets = await _bucketRepository.GetAllAsync();
            
            // Map entities to DTOs
            var bucketDTOs = _mapper.Map<List<BucketDTO>>(buckets);

            return Ok(bucketDTOs);
        }

        // Get a bucket by ID
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetBucketById(int id)
        {
            var bucket = await _bucketRepository.GetByIdAsync(id);
            if (bucket == null)
            {
                return NotFound("Bucket not found.");
            }

            var bucketDTO = _mapper.Map<BucketDTO>(bucket);

            return Ok(bucketDTO);
        }

        // Update a bucket
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateBucket(int id, [FromBody] CreateBucketDTO updateBucketDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bucket = await _bucketRepository.GetByIdAsync(id);
            if (bucket == null)
            {
                return NotFound("Bucket not found.");
            }

            bucket.BucketName = updateBucketDto.BucketName;

            await _bucketRepository.UpdateAsync(bucket);

            var bucketDTO = _mapper.Map<BucketDTO>(bucket);
            return Ok(bucketDTO);
        }

        // Delete a bucket
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBucket(int id)
        {
            var bucket = await _bucketRepository.GetByIdAsync(id);
            if (bucket == null)
            {
                return NotFound("Bucket not found.");
            }

            await _bucketRepository.DeleteAsync(bucket);
            return Ok("Bucket deleted successfully.");
        }

        [HttpGet("getByUser/{userId}")]
        public async Task<IActionResult> GetBucketsByUserId(int userId)
        {
            var buckets = await _bucketRepository.GetBucketsByUserIdAsync(userId);
            if (buckets == null || !buckets.Any())
            {
                // Return an empty list instead of NotFound
                return Ok(new List<BucketDTO>());
            }

            // Map entities to DTOs
            var bucketDTOs = _mapper.Map<List<BucketDTO>>(buckets);

            return Ok(bucketDTOs);
        }
    }
}
