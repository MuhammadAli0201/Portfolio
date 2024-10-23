using Portfolio.Models.Helpers;
using Portfolio.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models.DTOs
{
    public class AppUserDTO : AppUser
    {
        [Required]
        [DataType(DataType.Password)]
        [RegularExpression(RegexPasswordPattern.RegexPattern, ErrorMessage = RegexPasswordPattern.ErrorMessage)]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 50 characters")]
        public string Password { get; set; }
    }
}
