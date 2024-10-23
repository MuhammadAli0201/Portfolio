using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Models.Helpers
{
    public static class RegexPasswordPattern
    {
        public const string RegexPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,50}$";
        public const string ErrorMessage = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
    }
}
