using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymForMuscles.Models.ViewModels
{
    public class RefreshTokenRequestViewModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
