﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GymForMuscles.Models.ViewModels
{
    public class UserLoginViewModel
    {
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
