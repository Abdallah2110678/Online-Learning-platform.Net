using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [ForeignKey("UserId")]
      //  public User User { get; set; }
        public long UserId { get; set; }

        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        public long CourseId { get; set; }
    }
}
