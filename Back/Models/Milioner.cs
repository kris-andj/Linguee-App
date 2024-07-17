 public class Milioner
    {
            public int Id { get; set; }
        public List<MilionerQuestions>? Questions { get; set; }
        public MilionerResult? Result { get; set; }
        public int idPodnivoa {get;set;}
          [ForeignKey("idPodnivoa")]
        public Podnivo? podnivo {get;set;}
    }