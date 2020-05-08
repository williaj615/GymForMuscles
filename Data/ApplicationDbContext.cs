using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using GymForMuscles.Models.Data;
using GymForMuscles.Models;

namespace GymForMuscles.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<Exercise> Exercise { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<MuscleGroup> MuscleGroup { get; set; }
        public DbSet<UserWorkout> UserWorkout { get; set; }
        public DbSet<Workout> Workout { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercise { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

            //Create Muscle Groups
            MuscleGroup muscleGroup = new MuscleGroup
            {
                Id = 1,
                Name = "Biceps"
            };
            modelbuilder.Entity<MuscleGroup>().HasData(muscleGroup);

            modelbuilder.Entity<MuscleGroup>().HasData(
                new MuscleGroup()
                {
                    Id = 2,
                    Name = "Quadriceps"
                },
                new MuscleGroup()
                {
                    Id = 3,
                    Name = "Triceps"
                },
                new MuscleGroup()
                {
                    Id = 4,
                    Name = "Obliques"
                },
                new MuscleGroup()
                {
                    Id = 5,
                    Name = "Gluteus Maximus"
                },
                new MuscleGroup()
                {
                    Id = 6,
                    Name = "Chest"
                },
                new MuscleGroup()
                {
                    Id = 7,
                    Name = "Hamstrings"
                },
                new MuscleGroup()
                {
                    Id = 8,
                    Name = "Calves"
                },
                new MuscleGroup()
                {
                    Id = 9,
                    Name = "Shoulders"
                });

            //Create Categories
            modelbuilder.Entity<Category>().HasData(
                new Category()
                {
                    Id = 1,
                    Name = "Upper Body"
                },
                new Category()
                {
                    Id = 2,
                    Name = "Lower Body"
                },
                new Category()
                {
                    Id = 3,
                    Name = "Full Body"
                },
                new Category()
                {
                    Id = 4,
                    Name = "Cardio"
                });

            //Create Exercises
            modelbuilder.Entity<Exercise>().HasData(
                new Exercise()
                {
                    Id = 1,
                    Name = "Lunges",
                    MuscleGroupId = 2
                },
                new Exercise()
                {
                    Id = 2,
                    Name = "Squats",
                    MuscleGroupId = 2
                },
                new Exercise()
                {
                    Id = 3,
                    Name = "Bench Press",
                    MuscleGroupId = 6
                },
                new Exercise()
                {
                    Id = 4,
                    Name = "Overhead Press",
                    MuscleGroupId = 9
                },
                new Exercise()
                {
                    Id = 5,
                    Name = "Deadlift",
                    MuscleGroupId = 7
                },
                new Exercise()
                {
                    Id = 6,
                    Name = "Dumbbell Curl",
                    MuscleGroupId = 1
                },
                new Exercise()
                {
                    Id = 7,
                    Name = "Tricep Extension",
                    MuscleGroupId = 3
                },
                new Exercise()
                {
                    Id = 8,
                    Name = "Pull Up",
                    MuscleGroupId = 1
                });

            //Create Workouts
            modelbuilder.Entity<Workout>().HasData(
                new Workout()
                {
                    Id = 1,
                    CategoryId = 2,
                    Name = "Leg Day",
                    UserId = "07b84166-2ebc-4e50-949e-ba84b6eb7b07"
                },
                new Workout()
                {
                    Id = 2,
                    CategoryId = 3,
                    Name = "Bikini Body",
                    UserId = "6fc2c55b-bea6-4d9a-a08a-570b98e5b649"
                },
                new Workout()
                {
                    Id = 3,
                    CategoryId = 4,
                    Name = "Fitness Tester",
                    UserId = "6fc2c55b-bea6-4d9a-a08a-570b98e5b649"
                }
                );

            //Create UserWorkouts
            modelbuilder.Entity<UserWorkout>().HasData(
                new UserWorkout()
                {
                    Id = 1,
                    UserId = "07b84166-2ebc-4e50-949e-ba84b6eb7b07",
                    WorkoutId = 3,
                    DateCompleted = null
                });

            //Create WorkoutExercises
            modelbuilder.Entity<WorkoutExercise>().HasData(
                new WorkoutExercise()
                {
                    Id = 1,
                    ExerciseId = 1,
                    WorkoutId = 1
                },
                new WorkoutExercise()
                {
                    Id = 2,
                    ExerciseId = 2,
                    WorkoutId = 1
                },
                new WorkoutExercise()
                {
                    Id = 3,
                    ExerciseId = 5,
                    WorkoutId = 1
                },
                new WorkoutExercise()
                {
                    Id = 4,
                    ExerciseId = 3,
                    WorkoutId = 2
                },
                new WorkoutExercise()
                {
                    Id = 5,
                    ExerciseId = 6,
                    WorkoutId = 2
                },
                new WorkoutExercise()
                {
                    Id = 6,
                    ExerciseId = 8,
                    WorkoutId = 3
                },
                new WorkoutExercise()
                {
                    Id = 7,
                    ExerciseId = 1,
                    WorkoutId = 3
                });
        }

    }
}
