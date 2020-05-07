using Capstone.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymForMuscles.Models
{
    public class Workout
    {
        public int Id { get; set;}
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
