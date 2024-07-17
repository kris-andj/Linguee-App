namespace Models;
public class UpisaniNivo {
    public int Id {get;set;}
    public int UcenikId{get;set;}
    public Ucenik? Ucenik {get;set;}
    public int NivoId{get;set;}
    public Nivo? Nivo {get;set;}


}