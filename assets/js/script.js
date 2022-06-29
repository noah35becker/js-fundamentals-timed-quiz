
const pageContent = document.querySelector('main');

const newUserBtn = document.createElement('button');
    newUserBtn.textContent = 'New user';
    newUserBtn.classList.add('btn', 'login-btn');

const returningUserBtn = document.createElement('button');
    returningUserBtn.textContent = 'Returning user';
    returningUserBtn.classList.add('btn', 'login-btn');

const newUserForm = document.createElement('form');
    newUserForm.setAttribute('id', 'new-user-form');
    newUserForm.className = 'login-form';

const returningUserForm = document.createElement('form');
    returningUserForm.setAttribute('id', 'returning-user-form');
    returningUserForm.className = 'login-form';

const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username-input');
    usernameLabel.textContent = 'Username:';

const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('name', 'username-input');
    usernameInput.setAttribute('placeholder', 'username');

const passwordLabel1 = document.createElement('label');
    passwordLabel1.setAttribute('for', 'password-input-1');
    passwordLabel1.textContent = 'Password:';

const passwordInput1 = document.createElement('input');
    passwordInput1.setAttribute('type', 'password');
    passwordInput1.setAttribute('name', 'password-input-1');
    passwordInput1.setAttribute('placeholder', 'password');

const passwordLabel2 = document.createElement('label');
    passwordLabel2.setAttribute('for', 'password-input-2');
    passwordLabel2.textContent = 'Re-enter password:';

const passwordInput2 = passwordInput1.cloneNode();
    passwordInput2.setAttribute('name', 'password-input-2')

var loginSubmitBtn = document.createElement('button');
// Later, set the 'form' attribute to match the given form's id



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


function pageClear(){
    pageContent.innerHTML = '';
}


function showLoginScreen(){
    pageClear();

    pageContent.appendChild(newUserBtn);
    pageContent.appendChild(returningUserBtn);
}


function showNewUserScreen(){
    pageClear();

    
}


showLoginScreen();