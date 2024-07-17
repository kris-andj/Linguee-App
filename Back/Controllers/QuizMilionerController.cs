[ApiController]
[Route("[controller]")]
public class QuizMilionerController : ControllerBase
{
    public ProjekatContext Context { get; set; }
   


    public QuizMilionerController(ProjekatContext context)
    {
        Context = context;
        
    }

    [HttpPost("AddQuestion")]
    public async Task<ActionResult<MilionerQuestions>> AddQuestion(MilionerQuestions question)
    {
        if (ModelState.IsValid)
        {
            // Proverite da li pitanje ima tačno 4 odgovora
            if (question.Answers == null || question.Answers.Count != 4)
            {
                return BadRequest("Pitanje mora imati tačno 4 odgovora.");
            }

            Context.MilionerQuestions.Add(question);
            await Context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuestions), new { id = question.Id }, question);
        }
        else
        {
            return BadRequest(ModelState);
        }
    }


        [HttpPost("AddAnswer")]
        public async Task<ActionResult<MilionerAnswers>> AddAnswer(MilionerAnswers answer)
        {
            if (ModelState.IsValid)
            {
                var question = await Context.MilionerQuestions
                                            .Include(q => q.Answers)
                                            .FirstOrDefaultAsync(q => q.Id == answer.QuestionId);
                if (question == null)
                {
                    return NotFound("Pitanje nije pronađeno.");
                }

  
                if (question.Answers.Count >= 4)
                {
                    return BadRequest("Pitanje već ima 4 odgovora.");
                }

                Context.MilionerAnswers.Add(answer);
                await Context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAnswer), new { id = answer.Id }, answer);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpGet("GetAnswer/{id}")]
        public async Task<ActionResult<MilionerAnswers>> GetAnswer(int id)
        {
            var answer = await Context.MilionerAnswers.FirstOrDefaultAsync(a => a.Id == id);
            if (answer == null)
            {
                return NotFound();
            }
            return answer;
        }


        [HttpGet("GetQuestions")]
        public async Task<IEnumerable<MilionerQuestions>> GetQuestions()
        {
            return await Context.MilionerQuestions.Include(q => q.Answers).ToListAsync();
        }

        [HttpGet("GetQuestion/{id}")]
        public async Task<ActionResult<MilionerQuestions>> GetQuestion(int id)
        {
            var question = await Context.MilionerQuestions.Include(q => q.Answers).FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
            {
                return NotFound();
            }
            return question;
        }


        [HttpGet("GetQuestionAnswers/{questionId}")]
        public async Task<IActionResult> GetQuestionAnswers(int questionId, [FromQuery] int selectedAnswerId)
        {
            // Pronalazimo pitanje po ID-u
            var question = await Context.MilionerQuestions
                                        .Include(q => q.Answers)
                                        .FirstOrDefaultAsync(q => q.Id == questionId);

            if (question == null)
            {
                return NotFound(); 
            }

            // Pripremamo odgovor za vraćanje
            var answers = question.Answers.Select((a, index) => new
            {
                Id = a.Id,
                AnswerLetter = ((char)('A' + index)).ToString(), // Pretvaranje indeksa u slovo A, B, C, D, ...
                AnswerText = a.AnswerText,
                IsSelected = a.Id == selectedAnswerId, // Označiti da li je ovo odgovor koji je korisnik izabrao
                IsCorrect = a.IsCorrect // Označiti da li je ovo tačan odgovor
            }).ToList();

            // Provera da li je odgovor korisnika tačan
            bool isCorrect = question.CorrectAnswerId == selectedAnswerId;

            
            var response = new
            {
                Question = question.Text,
                Answers = answers,
                IsCorrect = isCorrect
            };

            return Ok(response);
        }


        [HttpPost("CheckAnswer/{id}")]
        public async Task<ActionResult> CheckAnswer(int id, [FromBody] int answerId)
        {
            var question = await Context.MilionerQuestions.Include(q => q.Answers).FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
            {
                return NotFound();
            }
            if (question.CorrectAnswerId == answerId)
            {
                return Ok(new { result = "correct" });
            }
            else
            {
                return Ok(new { result = "incorrect" });
            }
        }
        
    
        
        [HttpPost("SaveResult")]
public async Task<ActionResult> SaveResult(MilionerResult result)
{
    var ucenik = await Context.Korisnici.FirstOrDefaultAsync(p => p.Id == result.UcenikId);

    if (ucenik == null)
    {
        return BadRequest("Korisnik nije pronađen u bazi podataka.");
    }

    result.UcenikId = ucenik.Id;

    Context.MilionerResults.Add(result);
    await Context.SaveChangesAsync();

    return CreatedAtAction(nameof(SaveResult), new { id = result.Id }, result);
}



          [HttpGet("GetResult/{ucenikId}")]
public async Task<ActionResult> GetResult(int ucenikId)
{
    var ucenik = await Context.Korisnici.FirstOrDefaultAsync(p => p.Id == ucenikId);

    if (ucenik == null)
    {
        return NotFound("Korisnik not found in database.");
    }

    var score = await Context.MilionerResults
                            .Where(r => r.UcenikId == ucenikId)
                            .OrderByDescending(r => r.Id)
                            .FirstOrDefaultAsync();

    if (score == null)
    {
        return NotFound("Score not found for the specified user.");
    }

    return Ok( score.Score);
}
    
    [HttpDelete("DeleteQuestion/{id}")]
    public async Task<IActionResult> DeleteQuestion(int id)
    {
        var question = await Context.MilionerQuestions
                                    .Include(q => q.Answers)
                                    .FirstOrDefaultAsync(q => q.Id == id);

        if (question == null)
        {
            return NotFound(); 
        }

        Context.MilionerAnswers.RemoveRange(question.Answers);
        Context.MilionerQuestions.Remove(question);

        await Context.SaveChangesAsync();

        return NoContent();
    }
}
    
    

    
    
    