using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class NovaBaza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gramatike",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gramatike", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LozinkaHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    LozinkaSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Uloga = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Nivoi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivNivoa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nivoi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Admini",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admini", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Admini_Korisnici_Id",
                        column: x => x.Id,
                        principalTable: "Korisnici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Profesori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Biografija = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profesori", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profesori_Korisnici_Id",
                        column: x => x.Id,
                        principalTable: "Korisnici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Roditelji",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roditelji", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roditelji_Korisnici_Id",
                        column: x => x.Id,
                        principalTable: "Korisnici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Podnivoi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivPodnivoa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NivoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Podnivoi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Podnivoi_Nivoi_NivoId",
                        column: x => x.NivoId,
                        principalTable: "Nivoi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ucenici",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    roditeljId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ucenici", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ucenici_Korisnici_Id",
                        column: x => x.Id,
                        principalTable: "Korisnici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ucenici_Roditelji_roditeljId",
                        column: x => x.roditeljId,
                        principalTable: "Roditelji",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Lekcije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivLekcije = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PodnivoId = table.Column<int>(type: "int", nullable: false),
                    VideoLekcije = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TekstualneLekcije = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lekcije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lekcije_Podnivoi_PodnivoId",
                        column: x => x.PodnivoId,
                        principalTable: "Podnivoi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Konsultacije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Termin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdProfesora = table.Column<int>(type: "int", nullable: true),
                    IdUcenika = table.Column<int>(type: "int", nullable: true),
                    IdRoditelja = table.Column<int>(type: "int", nullable: true),
                    ProfesorId = table.Column<int>(type: "int", nullable: true),
                    RoditeljId = table.Column<int>(type: "int", nullable: true),
                    UcenikId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Konsultacije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Konsultacije_Profesori_IdProfesora",
                        column: x => x.IdProfesora,
                        principalTable: "Profesori",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Konsultacije_Profesori_ProfesorId",
                        column: x => x.ProfesorId,
                        principalTable: "Profesori",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Konsultacije_Roditelji_IdRoditelja",
                        column: x => x.IdRoditelja,
                        principalTable: "Roditelji",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Konsultacije_Roditelji_RoditeljId",
                        column: x => x.RoditeljId,
                        principalTable: "Roditelji",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Konsultacije_Ucenici_IdUcenika",
                        column: x => x.IdUcenika,
                        principalTable: "Ucenici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Konsultacije_Ucenici_UcenikId",
                        column: x => x.UcenikId,
                        principalTable: "Ucenici",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MilionerResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UcenikId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MilionerResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MilionerResults_Ucenici_UcenikId",
                        column: x => x.UcenikId,
                        principalTable: "Ucenici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ocene",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUcenika = table.Column<int>(type: "int", nullable: false),
                    UcenikId = table.Column<int>(type: "int", nullable: true),
                    IdProfesora = table.Column<int>(type: "int", nullable: false),
                    ProfesorId = table.Column<int>(type: "int", nullable: true),
                    Vrednost = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ocene", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ocene_Profesori_ProfesorId",
                        column: x => x.ProfesorId,
                        principalTable: "Profesori",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ocene_Ucenici_UcenikId",
                        column: x => x.UcenikId,
                        principalTable: "Ucenici",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UpisaniNivoi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UcenikId = table.Column<int>(type: "int", nullable: false),
                    NivoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UpisaniNivoi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UpisaniNivoi_Nivoi_NivoId",
                        column: x => x.NivoId,
                        principalTable: "Nivoi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UpisaniNivoi_Ucenici_UcenikId",
                        column: x => x.UcenikId,
                        principalTable: "Ucenici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WordScrambleResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UcenikId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordScrambleResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordScrambleResults_Ucenici_UcenikId",
                        column: x => x.UcenikId,
                        principalTable: "Ucenici",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Kvizovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdLekcije = table.Column<int>(type: "int", nullable: false),
                    TipKviza = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojPitanja = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kvizovi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kvizovi_Lekcije_IdLekcije",
                        column: x => x.IdLekcije,
                        principalTable: "Lekcije",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Milioners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResultId = table.Column<int>(type: "int", nullable: true),
                    idPodnivoa = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Milioners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Milioners_MilionerResults_ResultId",
                        column: x => x.ResultId,
                        principalTable: "MilionerResults",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Milioners_Podnivoi_idPodnivoa",
                        column: x => x.idPodnivoa,
                        principalTable: "Podnivoi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WordScramble",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResultId = table.Column<int>(type: "int", nullable: true),
                    idPodnivoa = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordScramble", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordScramble_Podnivoi_idPodnivoa",
                        column: x => x.idPodnivoa,
                        principalTable: "Podnivoi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WordScramble_WordScrambleResults_ResultId",
                        column: x => x.ResultId,
                        principalTable: "WordScrambleResults",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KvizRezultati",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdKorisnika = table.Column<int>(type: "int", nullable: false),
                    IdKviza = table.Column<int>(type: "int", nullable: false),
                    OsvojeniPoeni = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KvizRezultati", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KvizRezultati_Kvizovi_IdKviza",
                        column: x => x.IdKviza,
                        principalTable: "Kvizovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MilionerQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CorrectAnswerId = table.Column<int>(type: "int", nullable: false),
                    MilionerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MilionerQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MilionerQuestions_Milioners_MilionerId",
                        column: x => x.MilionerId,
                        principalTable: "Milioners",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WordScrambleQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScrambledWord = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CorrectWord = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WordScrambleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordScrambleQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordScrambleQuestions_WordScramble_WordScrambleId",
                        column: x => x.WordScrambleId,
                        principalTable: "WordScramble",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MilionerAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MilionerAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MilionerAnswers_MilionerQuestions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "MilionerQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Konsultacije_IdProfesora",
                table: "Konsultacije",
                column: "IdProfesora");

            migrationBuilder.CreateIndex(
                name: "IX_Konsultacije_IdRoditelja",
                table: "Konsultacije",
                column: "IdRoditelja");

            migrationBuilder.CreateIndex(
                name: "IX_Konsultacije_IdUcenika",
                table: "Konsultacije",
                column: "IdUcenika");

            migrationBuilder.CreateIndex(
                name: "IX_Konsultacije_ProfesorId",
                table: "Konsultacije",
                column: "ProfesorId");

            migrationBuilder.CreateIndex(
                name: "IX_Konsultacije_RoditeljId",
                table: "Konsultacije",
                column: "RoditeljId");

            migrationBuilder.CreateIndex(
                name: "IX_Konsultacije_UcenikId",
                table: "Konsultacije",
                column: "UcenikId");

            migrationBuilder.CreateIndex(
                name: "IX_Kvizovi_IdLekcije",
                table: "Kvizovi",
                column: "IdLekcije");

            migrationBuilder.CreateIndex(
                name: "IX_KvizRezultati_IdKviza",
                table: "KvizRezultati",
                column: "IdKviza");

            migrationBuilder.CreateIndex(
                name: "IX_Lekcije_PodnivoId",
                table: "Lekcije",
                column: "PodnivoId");

            migrationBuilder.CreateIndex(
                name: "IX_MilionerAnswers_QuestionId",
                table: "MilionerAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_MilionerQuestions_MilionerId",
                table: "MilionerQuestions",
                column: "MilionerId");

            migrationBuilder.CreateIndex(
                name: "IX_MilionerResults_UcenikId",
                table: "MilionerResults",
                column: "UcenikId");

            migrationBuilder.CreateIndex(
                name: "IX_Milioners_idPodnivoa",
                table: "Milioners",
                column: "idPodnivoa",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Milioners_ResultId",
                table: "Milioners",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Ocene_ProfesorId",
                table: "Ocene",
                column: "ProfesorId");

            migrationBuilder.CreateIndex(
                name: "IX_Ocene_UcenikId",
                table: "Ocene",
                column: "UcenikId");

            migrationBuilder.CreateIndex(
                name: "IX_Podnivoi_NivoId",
                table: "Podnivoi",
                column: "NivoId");

            migrationBuilder.CreateIndex(
                name: "IX_Ucenici_roditeljId",
                table: "Ucenici",
                column: "roditeljId");

            migrationBuilder.CreateIndex(
                name: "IX_UpisaniNivoi_NivoId",
                table: "UpisaniNivoi",
                column: "NivoId");

            migrationBuilder.CreateIndex(
                name: "IX_UpisaniNivoi_UcenikId",
                table: "UpisaniNivoi",
                column: "UcenikId");

            migrationBuilder.CreateIndex(
                name: "IX_WordScramble_idPodnivoa",
                table: "WordScramble",
                column: "idPodnivoa",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WordScramble_ResultId",
                table: "WordScramble",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_WordScrambleQuestions_WordScrambleId",
                table: "WordScrambleQuestions",
                column: "WordScrambleId");

            migrationBuilder.CreateIndex(
                name: "IX_WordScrambleResults_UcenikId",
                table: "WordScrambleResults",
                column: "UcenikId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admini");

            migrationBuilder.DropTable(
                name: "Gramatike");

            migrationBuilder.DropTable(
                name: "Konsultacije");

            migrationBuilder.DropTable(
                name: "KvizRezultati");

            migrationBuilder.DropTable(
                name: "MilionerAnswers");

            migrationBuilder.DropTable(
                name: "Ocene");

            migrationBuilder.DropTable(
                name: "UpisaniNivoi");

            migrationBuilder.DropTable(
                name: "WordScrambleQuestions");

            migrationBuilder.DropTable(
                name: "Kvizovi");

            migrationBuilder.DropTable(
                name: "MilionerQuestions");

            migrationBuilder.DropTable(
                name: "Profesori");

            migrationBuilder.DropTable(
                name: "WordScramble");

            migrationBuilder.DropTable(
                name: "Lekcije");

            migrationBuilder.DropTable(
                name: "Milioners");

            migrationBuilder.DropTable(
                name: "WordScrambleResults");

            migrationBuilder.DropTable(
                name: "MilionerResults");

            migrationBuilder.DropTable(
                name: "Podnivoi");

            migrationBuilder.DropTable(
                name: "Ucenici");

            migrationBuilder.DropTable(
                name: "Nivoi");

            migrationBuilder.DropTable(
                name: "Roditelji");

            migrationBuilder.DropTable(
                name: "Korisnici");
        }
    }
}
