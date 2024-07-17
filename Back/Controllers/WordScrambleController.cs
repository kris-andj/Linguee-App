using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("[controller]")]
public class WordScrambleController : ControllerBase
{
    public ProjekatContext Context { get; set; }
   


    public WordScrambleController(ProjekatContext context)
    {
        Context = context;
        
    }
        [HttpPost("AddScrambledWord")]
        public async Task<ActionResult<WordScrambleQuestions>> AddScrambledWord(WordScrambleQuestions scrambledWord)
        {
            if (ModelState.IsValid)
            {
                Context.WordScrambleQuestions.Add(scrambledWord);
                await Context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetRandomScrambledWord), new { id = scrambledWord.Id }, scrambledWord);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpGet("GetRandomScrambledWord")]
        public async Task<ActionResult<WordScrambleQuestions>> GetRandomScrambledWord()
        {
            var randomScrambledWord = await Context.WordScrambleQuestions
                .OrderBy(q => Guid.NewGuid())
                .FirstOrDefaultAsync();

            if (randomScrambledWord == null)
            {
                return NotFound();
            }

            return Ok(randomScrambledWord);
        }
       
        [HttpPost("SubmitScore")]
        public async Task<ActionResult> SubmitScore(WordScrambleResult result)
        {
            var ucenik = await Context.Korisnici.FirstOrDefaultAsync(p => p.Id == result.UcenikId);

            if (ucenik == null)
            {
                return BadRequest("Korisnik not found in database.");
            }

            result.UcenikId = ucenik.Id;

            Context.WordScrambleResults.Add(result);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(SubmitScore), new { id = result.Id }, result);
        }

   

    [HttpGet("GetAllScrumbledWords")]
    public async Task<ActionResult> GetAll()
    {
        var allScrbledWords =  await Context.WordScrambleQuestions.ToListAsync();

        return Ok(allScrbledWords);
                
    }

    [HttpGet("GetScore/{ucenikId}")]
public async Task<ActionResult> GetScore(int ucenikId)
{
    var ucenik = await Context.Korisnici.FirstOrDefaultAsync(p => p.Id == ucenikId);

    if (ucenik == null)
    {
        return NotFound("Korisnik not found in database.");
    }

    var score = await Context.WordScrambleResults
                            .Where(r => r.UcenikId == ucenikId)
                            .OrderByDescending(r => r.Id)
                            .FirstOrDefaultAsync();

    if (score == null)
    {
        return NotFound("Score not found for the specified user.");
    }

    return Ok( score.Score);
}



}