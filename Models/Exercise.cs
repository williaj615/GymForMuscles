using GymForMuscles.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymForMuscles.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MuscleGroupId { get; set; }
        public MuscleGroup MuscleGroup { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
