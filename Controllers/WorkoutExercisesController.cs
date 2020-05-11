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
    public class WorkoutExercisesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkoutExercisesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/WorkoutExercises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutExercise>>> GetWorkoutExercises( int workoutId)
        {
            var exercises = await _context.WorkoutExercise
                            .Include(we => we.Exercise)
                            .Where(we => we.WorkoutId == workoutId)
                            .ToListAsync();

            return (exercises);
        }

        private void ToListAsync()
        {
            throw new NotImplementedException();
        }

        // GET: api/WorkoutExercises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutExercise>> GetWorkoutExercise(int id)
        {
            var workoutExercise = await _context.WorkoutExercise.FindAsync(id);

            if (workoutExercise == null)
            {
                return NotFound();
            }

            return workoutExercise;
        }

        // PUT: api/WorkoutExercises/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkoutExercise(int id, WorkoutExercise workoutExercise)
        {
            if (id != workoutExercise.Id)
            {
                return BadRequest();
            }

            _context.Entry(workoutExercise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutExerciseExists(id))
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

        // POST: api/WorkoutExercises
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<WorkoutExercise>> PostWorkoutExercise(WorkoutExercise workoutExercise)
        {
            _context.WorkoutExercise.Add(workoutExercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkoutExercise", new { id = workoutExercise.Id }, workoutExercise);
        }

        // DELETE: api/WorkoutExercises/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkoutExercise>> DeleteWorkoutExercise(int id)
        {
            var workoutExercise = await _context.WorkoutExercise.FindAsync(id);
            if (workoutExercise == null)
            {
                return NotFound();
            }

            _context.WorkoutExercise.Remove(workoutExercise);
            await _context.SaveChangesAsync();

            return workoutExercise;
        }

        private bool WorkoutExerciseExists(int id)
        {
            return _context.WorkoutExercise.Any(e => e.Id == id);
        }
    }
}
