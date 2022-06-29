
const pageContent = document.querySelector('main');

const newUserBtn = document.createElement('button');
    newUserBtn.textContent = 'New user';
    newUserBtn.classList.add('btn', 'login-btn');

const returningUserBtn = document.createElement('button');
    returningUserBtn.textContent = 'Returning user';
    returningUserBtn.classList.add('btn', 'login-btn');

const newUserForm = document.createElement('form');
    newUserForm.id = 'new-user-form';
    newUserForm.className = 'login-form';
    newUserForm.textContent = 'Enter new user info'

const returningUserForm = document.createElement('form');
    returningUserForm.id = 'returning-user-form';
    returningUserForm.className = 'login-form';
    returningUserForm.textContent = 'Enter login info'

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

const passwordInput2 = document.createElement('input');
    passwordInput2.setAttribute('type', 'password');
    passwordInput2.setAttribute('name', 'password-input-1');
    passwordInput2.setAttribute('placeholder', 're-enter password');

var loginSubmitBtn = document.createElement('button');
// Later, set the 'form' attribute to match the given form's id
// Later, set the textContent to 'Register' or 'Login'



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

    newUserForm.appendChild(usernameLabel);
    newUserForm.appendChild(usernameInput);
    newUserForm.appendChild(passwordLabel1);
    newUserForm.appendChild(passwordInput1);

    loginSubmitBtn.setAttribute('form', newUserForm.id);
    loginSubmitBtn.textContent = 'Register';
    newUserForm.appendChild(loginSubmitBtn);

    pageContent.appendChild(newUserForm);
}


showNewUserScreen();