namespace Models;
public class Ucenik : Korisnik {
     [Key]
    public new int Id {get;set;}
   
    public List<Konsultacija>?Konsultacije { get;set;}
    public Roditelj? roditelj {get;set;}
    public List<Ocena>? Ocene {get;set;}

    public List<UpisaniNivo> upisaniNivoi {get;set;}
    public List<MilionerResult>? MilionerResults {get;set;}
    public List<WordScrambleResult>? WordScrambleResults {get;set;}

}