namespace  Models;
public  class Korisnik {
    public int Id {get;set;}
[Required]
 public  string Ime {get;set;}
     [Required]
    public  string Prezime {get;set;}
     [Required]
    public  string KorisnickoIme {get;set;}
     [Required]
    public  string Email {get;set;}
     [Required]
    public  byte[] LozinkaHash {get;set;}
     [Required]
    public  byte[] LozinkaSalt {get;set;}
     [Required]
    public Uloga Uloga {get;set;}

    

} 