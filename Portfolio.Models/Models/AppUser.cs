using Microsoft.AspNetCore.Identity;

namespace Portfolio.Models.Models
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string DisplayText { get; set; }
        public string DisplayDescription { get; set; }
        public Image DisplayPicture { get; set; }
        public string RefreshToken { get; set; }
        public List<Project> Projects { get; set; }
    }
}
