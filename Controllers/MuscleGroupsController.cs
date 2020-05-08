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

        // PUT: api/MuscleGroups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMuscleGroup(int id, MuscleGroup muscleGroup)
        {
            if (id != muscleGroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(muscleGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MuscleGroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MuscleGroups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<MuscleGroup>> PostMuscleGroup(MuscleGroup muscleGroup)
        {
            _context.MuscleGroup.Add(muscleGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMuscleGroup", new { id = muscleGroup.Id }, muscleGroup);
        }

        // DELETE: api/MuscleGroups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MuscleGroup>> DeleteMuscleGroup(int id)
        {
            var muscleGroup = await _context.MuscleGroup.FindAsync(id);
            if (muscleGroup == null)
            {
                return NotFound();
            }

            _context.MuscleGroup.Remove(muscleGroup);
            await _context.SaveChangesAsync();

            return muscleGroup;
        }

        private bool MuscleGroupExists(int id)
        {
            return _context.MuscleGroup.Any(e => e.Id == id);
        }
    }
}
