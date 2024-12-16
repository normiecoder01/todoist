using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using ToDoList.Models;

namespace ToDoList.Data
{

    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSets for custom entities
        public DbSet<User> Users { get; set; }

        public DbSet<TodoTask> TodoTasks { get; set; }

        // DbSet for Buckets
        public DbSet<Bucket> Buckets { get; set; }

        // DbSet for Reminders
        public DbSet<Reminder> Reminders { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity configurations are applied

            // User and TodoTask: Ensure optional assignment and prevent cascade delete
            modelBuilder.Entity<TodoTask>()
                .HasOne(t => t.User)
                .WithMany(u => u.TodoTasks)
                .HasForeignKey(t => t.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // User and Feedback
            modelBuilder.Entity<Feedback>()
             .HasOne(t => t.CreatedBy)
             .WithMany(u => u.Feedbacks)
             .HasForeignKey(t => t.CreatedByUserId)
             .OnDelete(DeleteBehavior.Restrict);


            //// Bucket and TodoTask: Prevent cascade delete
            //modelBuilder.Entity<TodoTask>()
            //    .HasOne(t => t.Bucket)
            //    .WithMany(b => b.TodoTasks)
            //    .HasForeignKey(t => t.BucketId)
            //    .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete


            // TodoTask and Reminder: Prevent cascade delete
            modelBuilder.Entity<Reminder>()
                .HasOne(r => r.TodoTask)
                .WithMany(t => t.Reminders)
                .HasForeignKey(r => r.TodoTaskId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // User and Bucket: Prevent cascade delete
            modelBuilder.Entity<Bucket>()
                .HasOne(b => b.User)
                .WithMany(u => u.Buckets)
                .HasForeignKey(b => b.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            modelBuilder.Entity<Reminder>()
               .HasOne(r => r.User)
               .WithMany(u => u.Reminders)
               .HasForeignKey(r => r.SetBy)
               .OnDelete(DeleteBehavior.Restrict); // Ensure that deleting a user doesn't cascade delete reminders

            List<IdentityRole> Roles = new List<IdentityRole>
            {
                new IdentityRole(){
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole(){
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            modelBuilder.Entity<IdentityRole>().HasData(Roles);  //adding admin and user role in roles table

        }
    }
}


