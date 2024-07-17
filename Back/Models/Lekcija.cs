
namespace Models;
public class Lekcija {
    [Key]
    public int Id {get;set;}
    public required string NazivLekcije {get;set;}
    
    public required int PodnivoId {get;set;}
    public string? VideoLekcije {get;set;}
    public string? TekstualneLekcije {get;set;}
    [ForeignKey("PodnivoId")]
    public Podnivo? podnivo {get;set;}
    public List<Kviz>? Kvizovi {get;set;}
 
    

    



}

