  public class WordScramble
    {
        public int Id { get; set; }
        public List<WordScrambleQuestions>? Question { get; set; }
        public WordScrambleResult? Result { get; set; }
        public int idPodnivoa {get;set;}
          [ForeignKey("idPodnivoa")]
         public Podnivo? podnivo {get;set;}
    }
