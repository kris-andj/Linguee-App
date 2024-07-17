namespace Models
{
    public class MilionerQuestions
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public List<MilionerAnswers>? Answers { get; set; }
        public int CorrectAnswerId { get; set; }
    }
}