using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
       public class Course
    {
       public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Tags { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }

    
        public long CategoryId { get; set; }
        // Navigation property
        [JsonIgnore]
        public Category? Category { get; set; }
        [JsonIgnore]
        public List<VideoCourse> VideoCourses { get; set; } = new List<VideoCourse>();
    }
    
}
