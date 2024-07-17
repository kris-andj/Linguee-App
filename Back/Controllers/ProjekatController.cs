using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http ;
using System.Security.Claims;
using System.Security.Cryptography;
namespace WebTemplate.Controllers;



[ApiController]
[Route("[controller]")]
public class ProjekatController : ControllerBase
{
    public ProjekatContext Context { get; set; }
   


    public ProjekatController(ProjekatContext context)
    {
        Context = context;
        
    }

    [HttpGet("pronadjiKorisnika")]
public IActionResult PronadjiKorisnika([FromQuery] string korisnickoIme)
{
    var korisnik = Context.Korisnici.FirstOrDefault(k => k.KorisnickoIme == korisnickoIme);
    
    if (korisnik == null)
    {
        return NotFound("Korisnik nije pronađen.");
    }

    return Ok(korisnik);
}

[HttpGet("CurrentUser")]
[Authorize(Roles = "Admin, Roditelj, Profesor, Ucenik")]
public async Task<IActionResult> CurrentUser()
{
    var userName = User.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
    var korisnik = await Context.Korisnici.FirstOrDefaultAsync(u => u.KorisnickoIme == userName);
 
    if (korisnik == null)
    {
        return NotFound("Korisnik nije pronađen.");
    }
 
    return Ok(new { korisnik.Id, korisnik.KorisnickoIme, korisnik.Uloga , korisnik.Ime , korisnik.Prezime , korisnik .Email});
}
[HttpGet("CheckUserRole")]
public async Task<IActionResult> CheckUserRole()
{
    try
    {
        var userName = User.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
        var korisnik = await Context.Korisnici.FirstOrDefaultAsync(u => u.KorisnickoIme == userName);

        if (korisnik == null)
        {
            return NotFound("Korisnik nije pronađen.");
        }

        return Ok(new { korisnik.Uloga });
    }
    catch (Exception ex)
    {
        return BadRequest($"Greška prilikom proveravanja uloge korisnika: {ex.Message}");
    }
} 


[HttpDelete("ObrisiKorisnika/{id}"), Authorize(Roles = "Admin")] 
public async Task<IActionResult> ObrisiKorisnika(int id)
{
    if (id == 0)
    {
        return BadRequest("Ne postoji");
    }

    try
    {
        var korisnikZaBrisanje = await Context.Korisnici.FindAsync(id);
        if (korisnikZaBrisanje != null)
        {
            Context.Korisnici.Remove(korisnikZaBrisanje);
            await Context.SaveChangesAsync();
            return Ok($"Obrisan je korisnik čiji je id: {id}");
        }

        return NotFound();
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}
[HttpPut("AzuriranjeLozinke")]
public async Task<IActionResult> AzuriranjeLozinke(AzuriranjeLozinkeDto model)
{
    
    if (model.NovaLozinka != model.PotvrdaNoveLozinke)
    {
        return BadRequest("Nova lozinka i potvrda nove lozinke se ne poklapaju.");
    }

    
    var korisnik = await Context.Korisnici.FirstOrDefaultAsync(x => x.KorisnickoIme == model.KorisnickoIme);

   
    if (korisnik == null)
    {
        return NotFound("Korisnik nije pronađen.");
    }

    
    CreatePasswordHash(model.NovaLozinka, out byte[] lozinkaHash, out byte[] lozinkaSalt);

    
    korisnik.LozinkaHash = lozinkaHash;
    korisnik.LozinkaSalt = lozinkaSalt;

    
    await Context.SaveChangesAsync();

    return Ok("Lozinka uspešno ažurirana.");
}


  private void CreatePasswordHash(string Lozinka, out byte[] LozinkaHash, out byte[] LozinkaSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                LozinkaSalt = hmac.Key;
                LozinkaHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Lozinka));
            }
        }

 

[HttpGet("PronadjiProfesoraPoKorisnickomImenu/{korisnickoIme}")]
public IActionResult PronadjiProfesoraPoKorisnickomImenu(string korisnickoIme)
{
    var profesor = Context.Profesori
        .Where(p => p.KorisnickoIme == korisnickoIme)
        .Select(p => new 
        {
            p.Ime,
            p.Prezime,
            p.Biografija,
            p.KorisnickoIme,
            p.Email,
            
        })
        .FirstOrDefault();

    if (profesor == null)
    {
        return NotFound();
    }

    return Ok(profesor);
}
[HttpGet("PronadjiProfesora/{ime}/{prezime}")]
public IActionResult PronadjiProfesora(string ime, string prezime)
{
    var profesor = Context.Profesori.Where(p => p.Ime== ime&& p.Prezime == prezime)
        .Select(p => new 
        {
            p.Ime,
            p.Prezime,
            p.Biografija,
            p.KorisnickoIme,
            p.Email,
            
        })
        .FirstOrDefault();

    if (profesor == null)
    {
        return NotFound();
    }

    return Ok(profesor);
}

[HttpPut("UbaciBiografiju/{id}")]
public IActionResult UbaciBiografiju(int id, [FromBody] string biografija)
{
    var profesor = Context.Profesori.FirstOrDefault(p => p.Id == id);
    
    if (profesor == null)
    {
        return NotFound();
    }
    profesor.Biografija = biografija;
    Context.SaveChanges();

    return Ok(profesor);
}

[HttpGet("PrikaziProfesore")]
public async Task<IActionResult> PrikaziProfesore()
{
    var profesori = await Context.Korisnici
        .Where(x => x.Uloga == Uloga.Profesor)
        .Select(x => new 
        {
            x.Id,
            x.KorisnickoIme,
            x.Ime,
            x.Prezime,
            x.Email,
            Biografija = ((Profesor)x).Biografija 
        })
        .ToListAsync();

    return Ok(profesori);
}

[HttpPost("DodajNoviNivo")]
   public async Task DodajNoviNivo(string nazivNivoa, string opis)
    {
        var noviNivo = new Nivo
        {
            NazivNivoa = nazivNivoa,
            Opis = opis,
            
        };
        await Context.Nivoi.AddAsync(noviNivo);
        await Context.SaveChangesAsync();
    }


[HttpGet("UceniciNaNivouAdmin")] //vraca listu ucenika kod admina

public async Task<IActionResult> UceniciNaNivouAdmin()
{
       var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Neuspešna autorizacija.");
            }

            var userRoleClaim = HttpContext.User.FindFirst(ClaimTypes.Role);
            var userRole = userRoleClaim?.Value;

            if (userRole == null)
            {
                return Unauthorized("Neuspešna autorizacija.");
            }

        
            if (userRole != "Admin" )
            {
                return Forbid("Nemate dozvolu za ovu akciju.");
            }
    var ucenici = await Context.UpisaniNivoi
        .Include(un => un.Ucenik)
        .ThenInclude(u => u.WordScrambleResults)
        .Include(un => un.Ucenik)
        .ThenInclude(u => u.MilionerResults)
        .Include(un => un.Nivo) 
        .ToListAsync();

    var uceniciInfo = ucenici.Select<UpisaniNivo, object>(un =>
    {
        if (un.Nivo.NazivNivoa == "A")
        {
            var wordScrambleScores = un.Ucenik.WordScrambleResults.Select(r => r.Score).ToList();
            return new
            {
                un.Ucenik.Ime,
                un.Ucenik.Prezime,
                un.Ucenik.KorisnickoIme,
                WordScrambleScores = wordScrambleScores,
                Nivo = "A"
            };
        }
        else if (un.Nivo.NazivNivoa == "B")
        {
            var milionerScores = un.Ucenik.MilionerResults.Select(r => r.Score).ToList();
            return new
            {
                un.Ucenik.Ime,
                un.Ucenik.Prezime,
                un.Ucenik.KorisnickoIme,
                MilionerScores = milionerScores,
                Nivo = "B"
            };
        }
       else
        {
            return new
            {
                un.Ucenik.Ime,
                un.Ucenik.Prezime,
                un.Ucenik.KorisnickoIme,
                un.Nivo.NazivNivoa
            };
        }
    }).ToList();

    var adminMessages = new List<string>();

    if (ucenici.Any(un => un.Nivo.NazivNivoa == "A" && un.Ucenik.WordScrambleResults.Any(r => r.Score > 6) && un.Ucenik.MilionerResults.Any()))
    {
        adminMessages.Add("Ukoliko ucenik ima vise od 6 poena i upisao je nivo B mozete ga obrisati");
    }
    
    if (ucenici.Any(un => un.Nivo.NazivNivoa == "B" && un.Ucenik.MilionerResults.Any(r => r.Score > 1000)))
    {
        adminMessages.Add("Ukoliko ucenik ima vise od 1000 poena mozete ga obrisati");
    }

    var response = new
    {
        Ucenici = uceniciInfo,
        Poruke = adminMessages
    };

    return Ok(response);
}
[HttpDelete("UkloniUcenika/{korisnickoIme}")]
        public async Task<IActionResult> UkloniUcenika(string korisnickoIme)
        {
            try
            {
                
                var ucenik = await Context.Ucenici
                    .Include(u => u.upisaniNivoi) 
                    .FirstOrDefaultAsync(u => u.KorisnickoIme == korisnickoIme);

                if (ucenik == null)
                {
                    return NotFound($"Učenik sa korisničkim imenom '{korisnickoIme}' nije pronađen.");
                }

                
                Context.UpisaniNivoi.RemoveRange(ucenik.upisaniNivoi);
                await Context.SaveChangesAsync();

                return Ok($"Svi upisani nivoi učenika '{korisnickoIme}' su uspešno obrisani.");
            }
            catch (Exception ex)
            {
                
                return BadRequest($"Greška prilikom brisanja upisanih nivoa učenika: {ex.Message}");
            }
        }

    [HttpPost("ZakaziKonsultacijeKorisnika/{KorisnickoIme}/{Termin}")]
[Authorize(Roles = "Ucenik, Roditelj")]
public async Task<IActionResult> ZakaziKonsultacijeKorisnika(string KorisnickoIme, DateTime Termin)
{
    
    var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
    var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

    if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole))
    {
        return Unauthorized("Korisnik nije prijavljen ili uloga nije određena.");
    }

    
    if (!int.TryParse(userId, out int korisnikId))
    {
        return Unauthorized("Nevažeći ID korisnika.");
    }

    // Provera da li je korisnik učenik ili roditelj
    bool isUcenik = Enum.TryParse(userRole, out Uloga korisnikUloga) && korisnikUloga == Uloga.Ucenik;
    bool isRoditelj = Enum.TryParse(userRole, out korisnikUloga) && korisnikUloga == Uloga.Roditelj;

    if (!isUcenik && !isRoditelj)
    {
        return Unauthorized("Samo učenici i roditelji mogu zakazivati konsultacije.");
    }

    var KorisnikProfesor = await Context.Korisnici.Where(x => x.Uloga == Uloga.Profesor && x.KorisnickoIme == KorisnickoIme).FirstOrDefaultAsync();
    if (KorisnikProfesor == null)
    {
        return BadRequest("Profesor nije pronađen.");
    }

    if (Termin.Date < DateTime.Now.Date)
    {
        return BadRequest("Ne možete zakazati termin u prošlosti.");
    }

    
    if (Termin.Hour < 8 || Termin.Hour >= 17)
    {
        return BadRequest("Termin mora biti između 8:00 i 17:00.");
    }
    int ProfesorId = KorisnikProfesor.Id;
    
    var daLiJeZauzet = await Context.Konsultacije.AnyAsync(k => k.IdProfesora == ProfesorId && k.Termin == Termin);
    if (daLiJeZauzet)
    {
        return Conflict("Termin je već zauzet.");
    }

    
    var konsultacija = new Konsultacija
    {
        Termin = Termin,
        IdProfesora = ProfesorId
    };

    if (isUcenik)
    {
        konsultacija.IdUcenika = korisnikId;
    }
    else if (isRoditelj)
    {
        konsultacija.IdRoditelja = korisnikId;
    }

    Context.Konsultacije.Add(konsultacija);
    await Context.SaveChangesAsync();

    return Ok("Konsultacija je uspešno zakazana.");
}

[HttpGet("ListaZakazanihKonsultacija"), Authorize(Roles = "Profesor")] //lista konsultacija koju vidi profesor
public async Task<IActionResult> ListaZakazanihKonsultacija()
{
    var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

    if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int profesorId))
    {
        return Unauthorized("Nevažeći ID korisnika.");
    }

    var profesor = await Context.Korisnici.OfType<Profesor>().FirstOrDefaultAsync(p => p.Id == profesorId);

    if (profesor == null)
    {
        return Unauthorized("Profesor nije pronađen.");
    }

    var konsultacije = await Context.Konsultacije
        .Where(k => k.IdProfesora == profesorId)
        .Select(k => new 
        {
            Ime = k.Ucenik != null ? k.Ucenik.Ime : k.Roditelj.Ime,
            Prezime = k.Ucenik != null ? k.Ucenik.Prezime : k.Roditelj.Prezime,
            Termin = k.Termin
        })
        .ToListAsync();

    if (konsultacije == null || konsultacije.Count == 0)
    {
        return NotFound("Nema zakazanih konsultacija.");
    }

    return Ok(konsultacije);
}

[HttpGet("PregledOcenaDeteta/{KorisnickoImeUcenika}")] //roditelj
[Authorize(Roles = "Roditelj")]
public async Task<IActionResult> PregledOcenaDeteta(string KorisnickoImeUcenika)
{
    if (string.IsNullOrEmpty(KorisnickoImeUcenika))
    {
        return BadRequest("Korisničko ime učenika je obavezno.");
    }
 
    var ucenik = await Context.Korisnici.FirstOrDefaultAsync(u => u.KorisnickoIme == KorisnickoImeUcenika);
    if (ucenik == null)
    {
        return NotFound("Učenik nije pronađen.");
    }
        var ocene = await Context.Ocene
        .Where(o => o.IdUcenika == ucenik.Id)
        .Select(o => o.Vrednost)
        .ToListAsync();
 
   
 
    return Ok(ocene);
}

[HttpGet("PregledOcena")]  //ucenik
[Authorize(Roles = "Ucenik")]
public async Task<IActionResult> PregledOcena()
{
    var userName = User.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
    var ucenik = await Context.Korisnici.FirstOrDefaultAsync(u => u.KorisnickoIme == userName);

    if (ucenik == null)
    {
        return NotFound("Učenik nije pronađen.");
    }

    var ocene = await Context.Ocene
        .Where(o => o.IdUcenika == ucenik.Id)
        .Select(o => o.Vrednost)
        .ToListAsync();

    return Ok(ocene);
}
[HttpGet("GetUserId/{username}")]
public async Task<ActionResult<int>> GetUserId(string username)
{
    var ucenik = await Context.Korisnici.FirstOrDefaultAsync(u => u.KorisnickoIme == username);

    if (ucenik == null)
    {
        return NotFound("Korisnik nije pronađen u bazi.");
    }

    return Ok(ucenik.Id);
}
[HttpPost("Ocenjivanje")]   //profesor-ocene
[Authorize(Roles ="Profesor")]
        public async Task<IActionResult>Ocenjivanje([FromBody] OceniDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.KorisnickoImeUcenika))
            {
                return BadRequest("Ucenik ne postoji");
            }

            var ucenik = await Context.Korisnici.FirstOrDefaultAsync(u => u.KorisnickoIme == request.KorisnickoImeUcenika);
            if (ucenik == null)
            {
                return NotFound("Ucenik ne postoji");
            }

        
            var ocena= new Ocena
            {
                IdUcenika = ucenik.Id,
                Vrednost = request.OpisnaOcena
            };

            Context.Ocene.Add(ocena);
            await Context.SaveChangesAsync();

            return Ok("Ocena uspešno poslata!");
        }

[HttpPost("UpisiNivo/{NazivNivoa}"), Authorize(Roles = "Ucenik")]
public async Task<IActionResult> UpisiNivo(string NazivNivoa)
{
    var nivo = await Context.Nivoi.FirstOrDefaultAsync(n => n.NazivNivoa == NazivNivoa);
    var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
    var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

    if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole))
    {
        return Unauthorized("Korisnik nije prijavljen ili uloga nije određena.");
    }

    if (!int.TryParse(userId, out int korisnikId))
    {
        return Unauthorized("Nevažeći ID korisnika.");
    }

    bool isUcenik = Enum.TryParse(userRole, out Uloga korisnikUloga) && korisnikUloga == Uloga.Ucenik;
    var KorisnikUcenik = await Context.Korisnici.FirstOrDefaultAsync(x => x.Uloga == Uloga.Ucenik && x.Id == korisnikId);

    if (isUcenik && nivo != null)
    {
        UpisaniNivo upisaniNivo = new UpisaniNivo
        {
            UcenikId = KorisnikUcenik.Id,
            NivoId = nivo.Id
        };

        await Context.UpisaniNivoi.AddAsync(upisaniNivo);
        await Context.SaveChangesAsync();
        return Ok("Uspešno");
    }
    else
    {
        return BadRequest("Nije uspešno");
    }
}
[HttpGet("UceniciNaNivou/{nazivNivoa}")]
[Authorize(Roles = "Administrator, Profesor")]
public async Task<IActionResult> UceniciNaNivou(string nazivNivoa)
{
    var nivo = await Context.Nivoi.FirstOrDefaultAsync(n => n.NazivNivoa == nazivNivoa);

    if (nivo == null)
    {
        return NotFound("Nivo nije pronađen.");
    }

    var ucenici = await Context.UpisaniNivoi
        .Where(un => un.NivoId == nivo.Id)
        .Include(un => un.Ucenik)
        .Select(un => new { un.Ucenik.Ime, un.Ucenik.Prezime })
        .ToListAsync();

    // Kreiramo listu stringova koja sadrži samo imena i prezimena učenika
    var uceniciImena = ucenici.Select(u => $"{u.Ime} {u.Prezime}").ToList();

    return Ok(uceniciImena);
}


[HttpGet("UceniciNaNivou")]

public async Task<IActionResult> UceniciNaNivou()
{
    var ucenici = await Context.UpisaniNivoi
        .Include(un => un.Ucenik)
        .Include(un => un.Nivo) 
        .ToListAsync();

    var uceniciInfo = ucenici.Select(un => new 
    { 
        un.Ucenik.Ime, 
        un.Ucenik.Prezime, 
        un.Nivo.NazivNivoa 
    });

    return Ok(uceniciInfo);
}
          
[HttpPost("UploadGramatikaFile")]
        public async Task<IActionResult> UploadGramatikaFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            

            // cuvanje fajla u bazu
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);

                
                var gramatika = new Gramatika
                {
                    FileName = file.FileName,
                    ContentType = file.ContentType,
                    Data = memoryStream.ToArray() // fajl se cuva kao bajt
                };

                Context.Gramatike.Add(gramatika);
                await Context.SaveChangesAsync();
            }

            return Ok(new { message = "File uploaded successfully." });
        }
        [HttpGet("DownloadGramatikaFile/{id}")]
        public async Task<IActionResult> DownloadGramatikaFile(int id)
        {
            var gramatika = await Context.Gramatike.FindAsync(id);

            if (gramatika == null)
            {
                return NotFound();
            }

            // Konvertujemo byte[] u MemoryStream
            var memoryStream = new MemoryStream(gramatika.Data);

            return File(memoryStream, gramatika.ContentType, gramatika.FileName);
        }

        [HttpDelete("UkloniUcenikaSaNivoa/{korisnickoIme}/{nazivNivoa}")]
public async Task<IActionResult> UkloniUcenikaSaNivoa(string korisnickoIme, string nazivNivoa)
{
    try
    {
        
        var ucenik = await Context.Ucenici
            .Include(u => u.upisaniNivoi)
                .ThenInclude(un => un.Nivo)
            .FirstOrDefaultAsync(u => u.KorisnickoIme == korisnickoIme);

        if (ucenik == null)
        {
            return NotFound($"Učenik sa korisničkim imenom '{korisnickoIme}' nije pronađen.");
        }

        
        var upisaniNivoiZaBrisanje = ucenik.upisaniNivoi
            .Where(un => un.Nivo.NazivNivoa == nazivNivoa)
            .ToList();

        if (!upisaniNivoiZaBrisanje.Any())
        {
            return NotFound($"Nivo '{nazivNivoa}' za učenika sa korisničkim imenom '{korisnickoIme}' nije pronađen.");
        }

        
        Context.UpisaniNivoi.RemoveRange(upisaniNivoiZaBrisanje);
        await Context.SaveChangesAsync();

        return Ok($"Učenik '{korisnickoIme}' je uspešno uklonjen sa nivoa '{nazivNivoa}'.");
    }
    catch (Exception ex)
    {
        
        return BadRequest($"Greška prilikom brisanja nivoa učenika: {ex.Message}");
    }
}
[HttpPost("UpisiNivoSaOgranicenjem/{NazivNivoa}"), Authorize(Roles = "Ucenik")]
public async Task<IActionResult> UpisiNivoSaOgranicenjem(string NazivNivoa)
{
    var nivo = await Context.Nivoi.FirstOrDefaultAsync(n => n.NazivNivoa == NazivNivoa);
    var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
    var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
 
    if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole))
    {
        return Unauthorized("Korisnik nije prijavljen ili uloga nije određena.");
    }
 
    if (!int.TryParse(userId, out int korisnikId))
    {
        return Unauthorized("Nevažeći ID korisnika.");
    }
 
    bool isUcenik = Enum.TryParse(userRole, out Uloga korisnikUloga) && korisnikUloga == Uloga.Ucenik;
    if (!isUcenik)
    {
        return Forbid("Samo učenici mogu pristupiti ovoj metodi. Vaša uloga nije učenik.");
    }
 
    var KorisnikUcenik = await Context.Korisnici.FirstOrDefaultAsync(x => x.Uloga == Uloga.Ucenik && x.Id == korisnikId);
 
    if (nivo != null)
    {
        // Provera da li je korisnik već upisan na kurs A
        var upisaniNivoA = await Context.UpisaniNivoi
            .Include(un => un.Nivo)
            .FirstOrDefaultAsync(un => un.UcenikId == KorisnikUcenik.Id && un.Nivo.NazivNivoa == "A");
 
        if (NazivNivoa == "B")
        {
            if (upisaniNivoA == null)
            {
                return Forbid("Ne možete se upisati na nivo B bez prethodnog upisa na nivo A.");
            }
 
            // Provera rezultata kviza za kurs A
            var rezultat = await Context.WordScrambleResults
                .Where(r => r.UcenikId == KorisnikUcenik.Id)
                .OrderByDescending(r => r.Id)
                .FirstOrDefaultAsync();
 
            if (rezultat == null || rezultat.Score < 6)
            {
                return Forbid("Niste prošli kviz sa više od 60% poena (6 od 10 poena), nije moguće upisati kurs B.");
            }
        }
 
        // Provera da li je učenik već upisan na dati nivo
        var existingEntry = await Context.UpisaniNivoi
            .FirstOrDefaultAsync(un => un.UcenikId == korisnikId && un.NivoId == nivo.Id);
 
        if (existingEntry != null)
        {
            return Conflict("Učenik je već upisan na ovaj nivo.");
        }
 
        UpisaniNivo upisaniNivo = new UpisaniNivo
        {
            UcenikId = KorisnikUcenik.Id,
            NivoId = nivo.Id
        };
 
        await Context.UpisaniNivoi.AddAsync(upisaniNivo);
        await Context.SaveChangesAsync();
        return Ok("Uspešno");
    }
    else
    {
        return BadRequest("Nivo nije pronađen.");
    }
}
}