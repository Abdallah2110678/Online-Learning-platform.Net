using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Category> Categorie { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<CourseMaterial> CourseMaterial { get; set; }
        public DbSet<Enrollment> Enrollment { get; set; }
        public DbSet<User> user { get; set; }

    }
}

