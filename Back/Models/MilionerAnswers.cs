namespace Models;

    public class MilionerAnswers{
     public int Id { get; set; }
    public string? AnswerText { get; set; }
    public int QuestionId {get;set;}
     public MilionerQuestions? Question { get; set; }
    public bool IsCorrect {get;set;}
    }