using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymForMuscles.Data;
using GymForMuscles.Models;
using System.Globalization;

namespace GymForMuscles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserWorkoutsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserWorkoutsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserWorkouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWorkout>>> GetUserWorkouts(string userId)
        {
            var workouts = await _context.UserWorkout
                                .Include(uw => uw.Workout)
                                .Include(uw => uw.Workout.Category)
                                .Where(uw => uw.UserId == userId)
                                .ToListAsync();

            return (workouts);
        }

        // GET: api/UserWorkouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWorkout>> GetUserWorkout(int id)
        {
            var userWorkout = await _context.UserWorkout.FindAsync(id);

            if (userWorkout == null)
            {
                return NotFound();
            }

            return userWorkout;
        }

        // PUT: api/UserWorkouts/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserWorkout(int id, UserWorkout userWorkout)
        {
            if (id != userWorkout.Id)
            {
                return BadRequest();
            }
            _context.Entry(userWorkout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserWorkoutExists(id))
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

        // POST: api/UserWorkouts
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserWorkout>> PostUserWorkout(UserWorkout userWorkout)
        {
            _context.UserWorkout.Add(userWorkout);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserWorkout", new { id = userWorkout.Id }, userWorkout);
        }

        // DELETE: api/UserWorkouts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserWorkout>> DeleteUserWorkout(int id)
        {
            var userWorkout = await _context.UserWorkout.FindAsync(id);
            if (userWorkout == null)
            {
                return NotFound();
            }

            _context.UserWorkout.Remove(userWorkout);
            await _context.SaveChangesAsync();

            return userWorkout;
        }

        private bool UserWorkoutExists(int id)
        {
            return _context.UserWorkout.Any(e => e.Id == id);
        }
    }
}
