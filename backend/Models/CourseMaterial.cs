using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class CourseMaterial
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string VideoFileName { get; set; }

        public string Title { get; set; }

        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        public long CourseId { get; set; }
    }
}
