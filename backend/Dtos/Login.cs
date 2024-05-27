using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using backend.Services;
using backend.Models;
namespace backend.Dtos
{
    public class Login
    {
        [Required]
        public String? Email { get; set; }
        [Required]
        public String? Password { get; set; }
    }
}