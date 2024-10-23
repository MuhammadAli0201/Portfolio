namespace Portfolio.Models.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte[] ImageData { get; set; }
        public Guid ObjectId { get; set; }
    }
}
