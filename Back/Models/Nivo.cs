namespace Models;
public class Nivo {
    public int Id {get;set;}
    public string? NazivNivoa { get;set;}
    public string? Opis { get;set;}
     public List<Podnivo>? Podnivoi { get; set; }
}
