
class Choice{
    constructor(choiceText, rightAns){
        this.text = choiceText;

        if (rightAns === undefined)
            this.rightAnswer = false;
        else
            this.rightAnswer = rightAns;
    }

    isRight(){
        return this.rightAnswer;
    }
}


class Question{
    constructor(questionText, ...choiceObjects){
        this.text = questionText;
        this.choices = choiceObjects;
    }
}


class User{
    constructor(username, pw){
        username += '';
        this.username = username.toLowerCase();
        this.password = pw;
        this.highScore = 0;
    }

    setHighScore(newScore){
        if (newScore > this.highScore)
            this.highScore = newScore;

        return this.highScore;
    }
}