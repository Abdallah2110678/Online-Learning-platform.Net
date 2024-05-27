using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string FName { get; set; }
        public string LName { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        public long Phone { get; set; }

        [Required]
        public override string Email { get; set; }

        [Required]
        public override string PasswordHash { get; set; }  // Use PasswordHash from IdentityUser

        public Role Role { get; set; }

        public Dictionary<string, object> ToDictionary()
        {
            var dict = new Dictionary<string, object>
            {
                { "id", this.Id },
                { "first name", this.FName },
                { "last name", this.LName },
                { "email", this.Email },
                { "role", this.Role }
            };
            return dict;
        }
    }
}
