using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.FeedBack;
using ToDoList.Models;
using ToDoList.Repository.Unit_of_Work;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IUnitofWork _unitOfWork;

        public FeedbackController(IUnitofWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // POST: api/feedback/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackDto feedbackDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var userId = feedbackDto.CreatedBy;

            var feedback = new Feedback
            {
                Rating = feedbackDto.Rating,
                FeedbackType = feedbackDto.FeedbackType,
                FeedbackText = feedbackDto.FeedbackText,
                Email = feedbackDto.Email,
                CreatedByUserId = userId,
                CreatedAt = DateTime.UtcNow
            }; 

            await _unitOfWork.FeedbackRepository.AddAsync(feedback);
            await _unitOfWork.SaveAsync();

            return Ok(new { message = "Feedback submitted successfully" });
        }
    }
}
