
public class Kviz  {
    [Key]
    public int Id {get;set;}
    public int IdLekcije {get;set;}
    [ForeignKey("IdLekcije")]
    public Lekcija? Lekcija {get;set;}
   
    public string? TipKviza {get;set;}
    public int BrojPitanja {get;set;}
    
}