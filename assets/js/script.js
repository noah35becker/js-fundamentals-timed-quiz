
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
    newUserForm.textContent = 'Enter new user info';

const returningUserForm = document.createElement('form');
    returningUserForm.id = 'returning-user-form';
    returningUserForm.className = 'login-form';
    returningUserForm.textContent = 'Enter login info';

const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('name', 'username-input');
    usernameInput.setAttribute('placeholder', 'username');
    usernameInput.setAttribute('required','');

const passwordInput1 = document.createElement('input');
    passwordInput1.setAttribute('type', 'password');
    passwordInput1.setAttribute('name', 'password-input-1');
    passwordInput1.setAttribute('placeholder', 'password');
    passwordInput1.setAttribute('required','');

const passwordInput2 = document.createElement('input');
    passwordInput2.setAttribute('type', 'password');
    passwordInput2.setAttribute('name', 'password-input-1');
    passwordInput2.setAttribute('placeholder', 're-enter password');
    passwordInput2.setAttribute('required','');

const showPasswordCheckbox = document.createElement('input');
    showPasswordCheckbox.setAttribute('type', 'checkbox');
    showPasswordCheckbox.setAttribute('name', 'show-password');

const showPasswordLabel = document.createElement('label');
    showPasswordLabel.setAttribute('for', 'show-password');
    showPasswordLabel.textContent = 'Show password';

const confirmTermsCheckbox = document.createElement('input');
    confirmTermsCheckbox.setAttribute('type', 'checkbox');
    confirmTermsCheckbox.setAttribute('name', 'confirm-terms');
    confirmTermsCheckbox.setAttribute('required', '');

const confirmTermsLabel = document.createElement('label');
    confirmTermsLabel.setAttribute('for', 'confirm-terms');
    confirmTermsLabel.textContent = 'I confirm that this username/pw are not stored securely'; //UPDATE THIS TEXT

var loginSubmitBtn = document.createElement('button');
// Later, set the 'form' attribute to match the given form's id
// Later, set the textContent to either 'Register' or 'Login'



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

    newUserForm.appendChild(usernameInput);
    newUserForm.appendChild(passwordInput1);
    newUserForm.appendChild(showPasswordCheckbox);
    newUserForm.appendChild(showPasswordLabel);
    newUserForm.appendChild(confirmTermsCheckbox);
    newUserForm.appendChild(confirmTermsLabel);

    loginSubmitBtn.setAttribute('form', newUserForm.id);
    loginSubmitBtn.textContent = 'Register';
    newUserForm.appendChild(loginSubmitBtn);

    pageContent.appendChild(newUserForm);
}


function showReturningUserScreen(){
    pageClear();

    returningUserForm.appendChild(usernameInput);
    returningUserForm.appendChild(passwordInput1);
    returningUserForm.appendChild(passwordInput2);
    returningUserForm.appendChild(showPasswordCheckbox);
    returningUserForm.appendChild(showPasswordLabel);

    loginSubmitBtn.setAttribute('form', returningUserForm.id);
    loginSubmitBtn.textContent = 'Login';
    returningUserForm.appendChild(loginSubmitBtn);

    pageContent.appendChild(returningUserForm);
}


showNewUserScreen();