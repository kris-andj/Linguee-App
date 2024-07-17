namespace Models;
public class Ocena {
    public int Id {get;set;}
    public int IdUcenika {get;set;}
    public Ucenik? Ucenik {get;set;} 
    public int IdProfesora {get;set;}
    public Profesor? Profesor {get;set;}
    public required string Vrednost {get;set;}


}



