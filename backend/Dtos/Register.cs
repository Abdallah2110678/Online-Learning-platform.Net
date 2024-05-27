using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using backend.Services;
using backend.Models;


namespace backend.Dtos
{
    public class Register
    {
        [StringLength(50)]
        public string? FName { get; set; }

        [StringLength(50)]
        public string? LName { get; set; }

        public DateTime? DOB { get; set; }

        public string? Gender { get; set; }

        public long? Phone { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        public string? Role { get; set; }
    }
}