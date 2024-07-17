using JwtWebApiDotNet7.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CreateJsonWebToken.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        public required ProjekatContext Context { get; set; }
        private readonly IConfiguration configuration;

        public AuthController(IConfiguration configuration, ProjekatContext context)
        {
            Context = context;
            this.configuration = configuration;
            var key = configuration.GetSection("AppSettings:Token").Value;
            Console.WriteLine($"Loaded Key: {key}");
            Console.WriteLine($"Key Length: {key?.Length}");
        }

        public static Korisnik korisnik = new Korisnik
        {
            Ime = string.Empty,
            Prezime = string.Empty,
            KorisnickoIme = string.Empty,
            LozinkaHash = null,
            Email = string.Empty,
            LozinkaSalt = null
        };

        [HttpPost("Register")]
        public async Task<ActionResult<Korisnik>> Register([FromBody] KorisnikDto request)


        {


            if  (request.Uloga==Uloga.Profesor){
                 korisnik = new Profesor
            {
                KorisnickoIme = request.KorisnickoIme,
                Ime = request.Ime,
                Biografija = null,
                Prezime = request.Prezime,
                Email = request.Email,
                Uloga = request.Uloga,
                LozinkaHash = null,
                LozinkaSalt = null
            };

            }
              if  (request.Uloga==Uloga.Ucenik){
                 korisnik = new Ucenik
            {
                KorisnickoIme = request.KorisnickoIme,
                Ime = request.Ime,
                Prezime = request.Prezime,
                Email = request.Email,
                Uloga = request.Uloga,
                LozinkaHash = null,
                LozinkaSalt = null
            };

            }
                if  (request.Uloga==Uloga.Admin){
                 korisnik = new Admin
            {
                KorisnickoIme = request.KorisnickoIme,
                Ime = request.Ime,
                Prezime = request.Prezime,
                Email = request.Email,
                Uloga = request.Uloga,
                LozinkaHash = null,
                LozinkaSalt = null
            };

            }
                if  (request.Uloga==Uloga.Roditelj){
                 korisnik = new Roditelj
            {
                KorisnickoIme = request.KorisnickoIme,
                Ime = request.Ime,
                Prezime = request.Prezime,
                Email = request.Email,
                Uloga = request.Uloga,
                LozinkaHash = null,
                LozinkaSalt = null
            };

            }

            CreatePasswordHash(request.Lozinka, out byte[] LozinkaHash, out byte[] LozinkaSalt);

            korisnik.LozinkaHash = LozinkaHash;
            korisnik.LozinkaSalt = LozinkaSalt;
            Context.Korisnici.Add(korisnik);
            await Context.SaveChangesAsync();

            return Ok(korisnik);
        }

        private void CreatePasswordHash(string Lozinka, out byte[] LozinkaHash, out byte[] LozinkaSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                LozinkaSalt = hmac.Key;
                LozinkaHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Lozinka));
            }
        }

        [HttpPost("Prijavljivanje")]
        public async Task<ActionResult<string>> Prijavljivanje(PrijavljivanjeDto request)
        {
            var korisnik = await Context.Korisnici.FirstOrDefaultAsync(x => x.KorisnickoIme == request.KorisnickoIme);

            if (korisnik == null)
            {
                return BadRequest("Korisnik not found");
            }

            if (string.IsNullOrEmpty(request.Lozinka))
            {
                return BadRequest("Lozinka nije uneta");
            }

            if (korisnik.LozinkaHash == null || korisnik.LozinkaSalt == null)
            {
                return BadRequest("Korisnik nije ispravno registrovan");
            }

            if (!VerifyPasswordHash(request.Lozinka, korisnik.LozinkaHash, korisnik.LozinkaSalt))
            {
                return BadRequest("Wrong Password");
            }
          string token = GenerateJwt(korisnik);
              Response.Cookies.Append("token", token, new CookieOptions
            {
                HttpOnly = false,
                SameSite = SameSiteMode.None,
                Secure = false,
            });
           

            return Ok(token);
        }

       private string GenerateJwt(Korisnik korisnik)
{
    var key = configuration.GetSection("AppSettings:Token").Value;

    
    var claims = new List<Claim>
    {   new Claim(ClaimTypes.NameIdentifier, korisnik.Id.ToString()),
        new Claim(ClaimTypes.Name, korisnik.KorisnickoIme),
        new Claim(ClaimTypes.Role, korisnik.Uloga.ToString())
    };

    return JwtGenerator.GenerateJwt(key, claims);
}

     
[HttpGet("validate")]
public IActionResult ValidateToken()
{
    if (!Request.Headers.ContainsKey("Authorization"))
    {
        return Unauthorized(new { message = "No token found in Authorization header" });
    }

    var authorizationHeader = Request.Headers["Authorization"].ToString();
    if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
    {
        return Unauthorized(new { message = "Invalid token format" });
    }

    var token = authorizationHeader.Substring("Bearer ".Length).Trim();

    var key = configuration.GetSection("AppSettings:Token").Value; 
    bool isValid = JwtGenerator.ValidateToken(token, key); 

    if (isValid)
    {
        return Ok(new { message = "Token is valid" });
    }
    else
    {
        return Unauthorized(new { message = "Invalid token" });
    }
}






        private bool VerifyPasswordHash(string Lozinka, byte[] LozinkaHash, byte[] LozinkaSalt)
        {
            if (LozinkaHash == null || LozinkaSalt == null)
            {
                return false;
            }

            using (var hmac = new HMACSHA512(LozinkaSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Lozinka));
                return computedHash.SequenceEqual(LozinkaHash);
            }
        }

        private string CreateToken(Korisnik korisnik)
        {
            List<Claim> claims = new List<Claim>
            {   new Claim(ClaimTypes.NameIdentifier , korisnik.Id.ToString()),
                new Claim(ClaimTypes.Name, korisnik.KorisnickoIme),
                new Claim(ClaimTypes.Role, korisnik.Uloga.ToString())
            };

            var key = new SymmetricSecurityKey(Convert.FromBase64String(GetValidKey()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken
            (
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds,
                issuer: "http://localhost:5000",
                audience: "http://localhost:3001"
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private string GetValidKey()
        {
            var key = configuration.GetSection("AppSettings:Token").Value;
            var decodedKey = Convert.FromBase64String(key);
            if (decodedKey.Length < 64)
            {
                throw new ArgumentException("The security key must be at least 64 characters long.");
            }
            return key;
        }
    }
}


