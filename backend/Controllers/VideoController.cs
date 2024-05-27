using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public VideoController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }



        [HttpPost("upload/{courseId}")]
        public async Task<IActionResult> UploadVideo(long courseId, [FromForm] IFormFile video, [FromForm] string title)
        {
            // Check if the course exists
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
                return NotFound(courseId);

            if (video == null || video.Length == 0)
                return BadRequest("No video uploaded");

            var uploadsFolderPath = Path.Combine(_env.ContentRootPath, "videos");
            Directory.CreateDirectory(uploadsFolderPath);

            var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(video.FileName)}";
            var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await video.CopyToAsync(stream);
            }

            // Create a new VideoCourse
            var videoCourse = new VideoCourse
            {
                Title = title,
                PathOfVideo = filePath,
                CourseId = courseId
            };

            // Add the new VideoCourse to the Course's VideoCourses collection
            course.VideoCourses.Add(videoCourse);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(videoCourse);
        }


        [HttpGet("stream/{videoId}/course/{courseId}")]
        public async Task<IActionResult> StreamVideo(long videoId, long courseId)
        {
            var course = await _context.Courses
                .Include(c => c.VideoCourses)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound("Course not found");

            var video = course.VideoCourses.FirstOrDefault(vc => vc.Id == videoId);
            if (video == null)
                return NotFound("Video not found in the course");

            var videoFileStream = new FileStream(video.PathOfVideo, FileMode.Open, FileAccess.Read);
            return File(videoFileStream, "application/octet-stream", enableRangeProcessing: true);
        }





        [HttpDelete("stream/{videoId}/course/{courseId}")]
        public async Task<IActionResult> DeleteVideo(long videoId, long courseId)
        {
            var course = await _context.Courses
                .Include(c => c.VideoCourses)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound("Course not found");

            var video = course.VideoCourses.FirstOrDefault(vc => vc.Id == videoId);
            if (video == null)
                return NotFound("Video not found in the course");

            // Delete the video file from the file system
            try
            {
                if (System.IO.File.Exists(video.PathOfVideo))
                {
                    System.IO.File.Delete(video.PathOfVideo);
                }
            }
            catch (Exception ex)
            {
                // Handle any errors that may occur while deleting the file
                return StatusCode(500, $"An error occurred while deleting the video file: {ex.Message}");
            }

            // Remove the video from the course's collection
            course.VideoCourses.Remove(video);
            await _context.SaveChangesAsync();

            return Ok("Video deleted successfully");
        }
    }
}
