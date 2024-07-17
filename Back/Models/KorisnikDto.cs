namespace JwtWebApiDotNet7.Models;
using System.ComponentModel.DataAnnotations;
    public class KorisnikDto
    {
        [Required(ErrorMessage = "Lozinka je obavezna.")]
        public string Lozinka { get; set; }

        [Required(ErrorMessage = "Korisničko ime je obavezno.")]
        public string KorisnickoIme { get; set; }

        [Required(ErrorMessage = "Ime je obavezno.")]
        public string Ime { get; set; }

        [Required(ErrorMessage = "Prezime je obavezno.")]
        public string Prezime { get; set; }

        [Required(ErrorMessage = "Email je obavezan.")]
        public string Email { get; set; }

        public Uloga Uloga { get; set; }
    }
