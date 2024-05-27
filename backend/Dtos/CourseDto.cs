
using backend.Models;


namespace backend.Dtos
{
    public class CourseDTO
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Tags { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public string? CategoryName { get; set; }
        public List<VideoCourseDto>? VideoCourses { get; set; }
    }
}