using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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