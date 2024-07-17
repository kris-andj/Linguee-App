

class MilionerQuestion {
    constructor(id, text, answers, correctAnswerId) {
      this.id = id;
      this.text = text;
      this.answers = answers; 
      this.correctAnswerId = correctAnswerId;
    }
  }
  
  class MilionerAnswer {
    constructor(id, answerText, isCorrect) {
      this.id = id;
      this.answerText = answerText;
      this.isCorrect = isCorrect;
    }
  }
  
  class MilionerResult {
    constructor(id, ucenikId, score) {
      this.id = id;
      this.ucenikId = ucenikId;
      this.score = score;
    }
  }
  
  export { MilionerQuestion, MilionerAnswer, MilionerResult };
  