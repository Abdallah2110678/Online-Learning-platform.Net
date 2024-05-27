using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class VideoCourse
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? PathOfVideo { get; set; }
        public long CourseId { get; set; }
         [JsonIgnore]
        public Course? Course { get; set; }
    }
}
