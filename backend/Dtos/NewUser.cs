using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class NewUser
    {
        [StringLength(50)]
        public string? FName { get; set; }
        [StringLength(50)]
        public string? LName { get; set; }
        public DateTime? dob { get; set; }
        [StringLength(10)]
        public string? gender { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }



        [Range(0, 150)]
        public int Phone { get; set; }

        [Required]
        public string? password { get; set; }
        public bool? isAdmin { get; set; }
        public string? Role { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Id { get; set; }
    }
}