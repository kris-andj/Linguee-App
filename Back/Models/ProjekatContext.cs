namespace Models;
using Microsoft.EntityFrameworkCore;

public class ProjekatContext : DbContext
{
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Konsultacija>()
        .HasOne(k => k.Profesor)
        .WithMany()
        .HasForeignKey(k => k.IdProfesora)
        .OnDelete(DeleteBehavior.Restrict); 

    modelBuilder.Entity<Konsultacija>()
        .HasOne(k => k.Ucenik)
        .WithMany()
        .HasForeignKey(k => k.IdUcenika)
        .OnDelete(DeleteBehavior.Restrict); 

    modelBuilder.Entity<Konsultacija>()
        .HasOne(k => k.Roditelj)
        .WithMany()
        .HasForeignKey(k => k.IdRoditelja)
        .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<MilionerQuestions>()
            .HasMany(q => q.Answers)
            .WithOne(a => a.Question)
            .HasForeignKey(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MilionerAnswers>()
            .HasOne(a => a.Question)
            .WithMany(q => q.Answers)
            .HasForeignKey(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
               
          modelBuilder.Entity<Podnivo>()
                .HasOne(p => p.Nivo)
                .WithMany(n => n.Podnivoi)
                .HasForeignKey(p => p.NivoId)
                .OnDelete(DeleteBehavior.Cascade);   
           

            modelBuilder.Entity<Korisnik>().ToTable("Korisnici");
            modelBuilder.Entity<Admin>().ToTable("Admini");
            modelBuilder.Entity<Profesor>().ToTable("Profesori");
            modelBuilder.Entity<Ucenik>().ToTable("Ucenici");
            modelBuilder.Entity<Roditelj>().ToTable("Roditelji");

            modelBuilder.Entity<Gramatika>().ToTable("Gramatike");
}



    
    public required DbSet<Ucenik> Ucenici {get;set;}
    public required DbSet<Profesor> Profesori {get;set;}
    public required DbSet<Roditelj> Roditelji {get;set;}
    public required DbSet<Admin> Admini {get;set;}
    public required DbSet<Korisnik> Korisnici {get;set;}
   public required DbSet<Gramatika> Gramatike {get;set;}
    public required DbSet<Vokabular> Vokabulari { get; set; }
    public required DbSet<Kviz> Kvizovi {get;set;}
    public required DbSet<Lekcija> Lekcije {get;set;}
    public required DbSet<Nivo> Nivoi {get;set;}
    public required DbSet<Konsultacija>Konsultacije {get;set;}
    public required DbSet<UpisaniNivo> UpisaniNivoi {get;set;}
    public required DbSet<Ocena> Ocene {get;set;}
    public required DbSet<KvizRezultat> KvizRezultati {get;set;}
    public required DbSet<WordScrambleQuestions> WordScrambleQuestions {get;set;}
    public required DbSet<WordScrambleResult> WordScrambleResults {get;set;}


    public required DbSet<MilionerQuestions> MilionerQuestions { get; set; }
    public required DbSet<MilionerAnswers> MilionerAnswers { get; set; }
    public required DbSet<MilionerResult> MilionerResults { get; set; }
    public required DbSet<Podnivo> Podnivoi { get; set; }
    public required DbSet<Milioner> Milioners { get; set; }

    
    

    public ProjekatContext(DbContextOptions options) : base(options)
 {}
    }
