using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymForMuscles.Models
{
    public class WorkoutExercise
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
        public int WorkoutId { get; set; }
        public Workout Workout { get; set; }
    }
}
