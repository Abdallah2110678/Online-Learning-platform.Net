using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string Tags { get; set; }

        public double Price { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("UserId")]
       // public User User { get; set; }
        public long UserId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        public long CategoryId { get; set; }

        public List<CourseMaterial> CourseMaterials { get; set; } = new List<CourseMaterial>();
    }
}
