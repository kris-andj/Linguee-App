namespace Models;
public class Roditelj : Korisnik {
     [Key]
    public new int Id {get;set;}
     
    public List <Ucenik>? Ucenici {get;set;}
    public List<Konsultacija>? Konsultacije {get;set;}

}