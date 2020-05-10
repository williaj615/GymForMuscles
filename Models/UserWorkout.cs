using GymForMuscles.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymForMuscles.Models
{
    public class UserWorkout
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int WorkoutId { get; set; }
        public Workout Workout { get; set; }

        public DateTime? DateCompleted { get; set; }
    }
}
