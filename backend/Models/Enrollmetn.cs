using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Enrollment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [ForeignKey("UserId")]
       // public User User { get; set; }
        public long UserId { get; set; }

        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        public long CourseId { get; set; }

        public DateTime EnrollmentDate { get; set; }
    }
}
