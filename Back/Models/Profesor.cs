
namespace Models;
public class Profesor : Korisnik {
     [Key]
    public new int Id {get;set;}
    public  string? Biografija {get;set;}
    public List<Konsultacija>? Konsultacije {get;set;}
    public List<Ocena>? Ocene {get;set;}
}