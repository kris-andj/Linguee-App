
    public class Podnivo
    {
        public int Id { get; set; }
        public string? NazivPodnivoa { get; set; }
        public string? Opis { get; set; }
        public int NivoId { get; set; }
        public Nivo? Nivo { get; set; }
     public Milioner? milioner {get;set;}
        public WordScramble? wordScramble {get;set;}
        public List<Lekcija> lekcije {get;set;}
    }