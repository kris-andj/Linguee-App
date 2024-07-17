namespace Models
{
    public class MilionerResult
    {
        [Key]
        public int Id { get; set; }
        public int UcenikId { get; set; }
        public int Score { get; set; }
      
    }
}