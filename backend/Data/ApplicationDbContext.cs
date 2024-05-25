using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        // Define your DbSet properties here
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Category> Categorie { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<CourseMaterial> CourseMaterial { get; set; }
        public DbSet<Enrollment> Enrollment { get; set; }

    }
}
 
