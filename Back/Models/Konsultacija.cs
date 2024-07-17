namespace Models;
public class Konsultacija {
    
    public int Id {get;set;}

    public required  DateTime Termin {get;set;}
    public int? IdProfesora {get;set;}
    public Profesor? Profesor{get;set;}
    public int? IdUcenika {get;set;}
  
    public Ucenik? Ucenik{get;set;}
    public int? IdRoditelja {get;set;}
      public Roditelj? Roditelj{get;set;}
}