using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

using Microsoft.AspNetCore.Identity;
namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Cart> Cart { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<VideoCourse> VideoCourses { get; set; }
        public DbSet<Enrollment> Enrollment { get; set; }
        public DbSet<User> user { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN", },
                new IdentityRole { Name = "Student", NormalizedName = "STUDENT", },
                new IdentityRole { Name = "Instructor", NormalizedName = "INSTRUCTOR", }
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            // Configure the relationship between Course and Category
            modelBuilder
                .Entity<Course>()
                .HasOne(c => c.Category)
                .WithMany(c => c.Courses)
                .HasForeignKey(c => c.CategoryId);

            modelBuilder
                .Entity<Course>()
                .HasMany(c => c.VideoCourses)
                .WithOne(vc => vc.Course)
                .HasForeignKey(vc => vc.CourseId);

            // Seed the database with initial categories
            modelBuilder
                .Entity<Category>()
                .HasData(
                    new Category { Id = 1, Name = "Quantum Computing" },
                    new Category { Id = 2, Name = "Health & Fitness" },
                    new Category { Id = 3, Name = "Marketing" },
                    new Category { Id = 4, Name = "Graphic Design" },
                    new Category { Id = 5, Name = "Blockchain" }
                );
        }
    }
}
