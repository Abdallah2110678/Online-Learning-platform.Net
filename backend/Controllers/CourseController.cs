using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Dtos;

[Route("api/[controller]")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CourseController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCourses()
    {
        var coursesWithVideos = await _context.Courses
        .Include(c => c.Category)
        .Include(c => c.VideoCourses)
        .Select(c => new CourseDTO
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            Tags = c.Tags,
            Price = c.Price,
            Date = c.Date,
            CategoryName = c.Category.Name,
            VideoCourses = c.VideoCourses.Select(vc => new VideoCourseDto
            {
                Id = vc.Id,
                Title = vc.Title,
                PathOfVideo = vc.PathOfVideo
            }).ToList()
        })
        .ToListAsync();

    return Ok(coursesWithVideos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(long id)
    {
        var courseWithVideos = await _context.Courses
        .Include(c => c.Category)
        .Include(c => c.VideoCourses)
        .Where(c => c.Id == id)
        .Select(c => new CourseDTO
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            Tags = c.Tags,
            Price = c.Price,
            Date = c.Date,
            CategoryName = c.Category.Name,
            VideoCourses = c.VideoCourses.Select(vc => new VideoCourseDto
            {
                Id = vc.Id,
                Title = vc.Title,
                PathOfVideo = vc.PathOfVideo
            }).ToList()
        })
        .FirstOrDefaultAsync();

    if (courseWithVideos == null)
        return NotFound();

    return Ok(courseWithVideos);
    }

    [HttpPost]
    public async Task<IActionResult> AddCourse([FromBody] Course course)
    {
        var category = await _context.Categories.FindAsync(course.CategoryId);
        if (category == null)
        {
            return BadRequest("Invalid Category ID");
        }

        course.Category = category;
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        var courseDto = new CourseDTO
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Tags = course.Tags,
            Price = course.Price,
            Date = course.Date,
            CategoryName = category.Name
        };

        return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, courseDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(long id, [FromBody] Course course)
    {
        var existingCourse = await _context.Courses.FindAsync(id);
        if (existingCourse == null)
            return NotFound();

        var category = await _context.Categories.FindAsync(course.CategoryId);
        if (category == null)
        {
            return BadRequest("Invalid Category ID");
        }

        existingCourse.Title = course.Title;
        existingCourse.Description = course.Description;
        existingCourse.Tags = course.Tags;
        existingCourse.Price = course.Price;
        existingCourse.Date = course.Date;
        existingCourse.Category = category;

        _context.Courses.Update(existingCourse);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(long id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
            return NotFound();

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
