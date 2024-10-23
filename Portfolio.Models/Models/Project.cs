namespace Portfolio.Models.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<Image> ProjectImages { get; set; }
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
    }
}
