using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string FName { get; set; } = string.Empty;

        [Required]
        public string LName { get; set; } = string.Empty;

        public DateTime DOB { get; set; }

        [Required]
        public string Gender { get; set; } = string.Empty;

        public long Phone { get; set; }

        [Required]
        public override string Email { get; set; } = string.Empty;

        [Required]
        public override string PasswordHash { get; set; } = string.Empty;

        [Required]
        public Role Role { get; set; }

        public Dictionary<string, object> ToDictionary()
        {
            return new Dictionary<string, object>
            {
                { "id", this.Id },
                { "first name", this.FName },
                { "last name", this.LName },
                { "email", this.Email },
                { "role", this.Role.ToString() }
            };
        }
    }
}
