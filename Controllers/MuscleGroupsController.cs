using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymForMuscles.Data;
using GymForMuscles.Models;

namespace GymForMuscles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuscleGroupsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MuscleGroupsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MuscleGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MuscleGroup>>> GetMuscleGroup()
        {
            return await _context.MuscleGroup.ToListAsync();
        }

        // GET: api/MuscleGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MuscleGroup>> GetMuscleGroup(int id)
        {
            var muscleGroup = await _context.MuscleGroup.FindAsync(id);

            if (muscleGroup == null)
            {
                return NotFound();
            }

            return muscleGroup;
        }

        private bool MuscleGroupExists(int id)
        {
            return _context.MuscleGroup.Any(e => e.Id == id);
        }
    }
}
