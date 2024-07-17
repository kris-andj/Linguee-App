public class KvizRezultat
{
    [Key]
    public int Id { get; set; }
    public int IdKorisnika { get; set; } 
    public int IdKviza { get; set; }
    [ForeignKey("IdKviza")]
    public Kviz? Kviz { get; set; }
    public int OsvojeniPoeni { get; set; }
    
}