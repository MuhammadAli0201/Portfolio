using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models.DTOs
{
    public class UserLoginDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        [PasswordPropertyText]
        public string Password { get; set; }
    }
}
