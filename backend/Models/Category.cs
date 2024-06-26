using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
   public class Category
    {
        public long Id { get; set; }
        public string? Name { get; set; }

        // Navigation property
         [JsonIgnore]
        public ICollection<Course>? Courses { get; set; }
    }
}
