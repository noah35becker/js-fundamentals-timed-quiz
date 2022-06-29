
//USER INPUT VALIDATION
const CHARACTERS = {
    alpha: 'abcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    special: ' !"#$%&()*+,-./:;<=>?@[]^_`{|}~' + "'" + '\\'
}



//DATA STORAGE
const users = JSON.parse(localStorage.getItem('users')) || [];
const questions = [];



//PAGE ELEMENTS
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

const passwordInput1 = document.createElement('input');
    passwordInput1.setAttribute('type', 'password');
    passwordInput1.setAttribute('name', 'password-input-1');
    passwordInput1.setAttribute('placeholder', 'password');

const passwordInput2 = document.createElement('input');
    passwordInput2.setAttribute('type', 'password');
    passwordInput2.setAttribute('name', 'password-input-1');
    passwordInput2.setAttribute('placeholder', 're-enter password');

const showPasswordCheckbox = document.createElement('input');
    showPasswordCheckbox.setAttribute('type', 'checkbox');
    showPasswordCheckbox.setAttribute('name', 'show-password');

const showPasswordLabel = document.createElement('label');
    showPasswordLabel.setAttribute('for', 'show-password');
    showPasswordLabel.textContent = 'Show password';

const confirmTermsCheckbox = document.createElement('input');
    confirmTermsCheckbox.setAttribute('type', 'checkbox');
    confirmTermsCheckbox.setAttribute('name', 'confirm-terms');

const confirmTermsLabel = document.createElement('label');
    confirmTermsLabel.setAttribute('for', 'confirm-terms');
    confirmTermsLabel.innerHTML =
        '<p><span>Security disclaimer:</span> I understand that this site does NOT store my username and password <em>securely</em></p>'; //UPDATE THIS TEXT

var loginSubmitBtn = document.createElement('button');
    // Later, set the 'form' attribute to match the given form's id
    // Later, set the textContent to either 'Register' or 'Login'

var errorMessagesEl = document.createElement('p');
    errorMessagesEl.className = 'errors';



//CLASSES
class User{
    constructor(username, pw){
        username += ''; this.username = username.toLowerCase();
        this.password = pw;
        this.highScore = 0;
    }

    setHighScore(newScore){
        if (newScore > this.highScore)
            this.highScore = newScore;

        return this.highScore;
    }
}


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



//FUNCTIONS
function pageClear(){
    pageContent.innerHTML = '';
}


function showUserTypeScreen(){
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


function ineligibleCharsString(text, ...charTypes){
    var eligChars = '';
    charTypes.forEach(type => {
        eligChars += CHARACTERS[type];
    });

    var badChars = [];

    var thisChar = '';
    for (i = 0; i < text.length; i++){
        thisChar = text.substring(i, i + 1);
        if (!eligChars.includes(thisChar) && !badChars.includes(thisChar))
            badChars.push(thisChar);
    }
    
    if (badChars === '')
        return false;
    return badChars.join(' ');
}


function loginInfoErrors(formID){
    usernameInput.value = usernameInput.value.toLowerCase(); //this also updates the username to lowercase on screen
    if (passwordInput1.value === '' && !(passwordInput2.value === '')){ //this also updates passwords 1 and 2 on screen
        passwordInput1.value = passwordInput2.value;
        passwordInput2.value = '';
    }

    var errs = [];
    var usernameVal = usernameInput.value;
    var password1Val = passwordInput1.value;

    if(usernameVal === '')
        errs.push('Please enter a username');
    else{
        if (usernameVal.length < 8)
            errs.push('Username must be at least 8 characters long');
        
        var badChars = ineligibleCharsString(usernameVal, 'alpha', 'numeric');
        if (badChars)
            errs.push('Username contains invalid characters: ' + badChars);
    }

    if(password1Val === '')
        errs.push('Please enter a password');
    else{
        if (password1Val.length < 8)
            errs.push('Password must be at least 8 characters long');
        
        var badChars = ineligibleCharsString(password1Val, 'alpha', 'numeric', 'special');
            if (badChars)
                errs.push('Password contains invalid characters: ' + badChars);
    }

    if (formID === newUserForm.id){
        if (!confirmTermsCheckbox.checked)
            errs.push('You must confirm that you understand the security disclaimer');
    }
    else if (formID === returningUserForm.id) {
        var password2Val = passwordInput2.value;

        if(password2Val === '')
            errs.push('You must re-enter the password');
        else if (!(password2Val === password1Val))
            errs.push('The passwords do not match');
    }

    if (errs.length > 0)
        return errs;
    return false;
}


function resetForms(){
    newUserForm.reset();
    returningUserForm.reset();
}


function saveUsers(newUser){
    if (newUser)
        users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
}


function doesUserAlreadyExist(submittedUser, formID){
    for (i = 0; i < users.length; i++)
        if (
            formID === newUserForm.id
            && submittedUser.username === users[i].username
        )
            return true;
        else if (
            formID === returningUserForm.id
            && submittedUser.username === users[i].username
            && submittedUser.password === users[i].password
        )
            return users[i]; //this ensures that the user's high score gets properly loaded upon login
    
    return false;
}




//LISTENERS
loginSubmitBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    errorMessagesEl.remove();

    var formID = this.getAttribute('form');
    var userErrors = loginInfoErrors(formID);
    
    if (userErrors){
        errorMessagesEl.innerHTML = userErrors.join('<br>');
        pageContent.appendChild(errorMessagesEl);
    }
    else{
        var submittedUser = new User(usernameInput.value, passwordInput1.value);
        
        if (formID === newUserForm.id){
            if (doesUserAlreadyExist(submittedUser, formID)){
                errorMessagesEl.textContent = 'A user with this username already exists!'; //Animate this so it fades away?
                pageContent.appendChild(errorMessagesEl);
            }
            else{
                saveUsers(submittedUser);
                console.log('new user created with the given info!'); //really, this should load submittedUser's info onto the page
                resetForms();
            }
        }else if (formID === returningUserForm.id){
            submittedUser = doesUserAlreadyExist(submittedUser, formID);
            if(submittedUser){
                console.log('username/password validated!'); //really, this should load submittedUser's info onto the page
                resetForms();
            }
            else{
                errorMessagesEl.textContent = 'Invalid username/password combination'; //Animate this so it fades away?
                pageContent.appendChild(errorMessagesEl);
            }
        }
    }
});


showPasswordCheckbox.addEventListener('change', function(){
    if (this.checked){
        passwordInput1.setAttribute('type', 'text');
        passwordInput2.setAttribute('type', 'text');
    }else{
        passwordInput1.setAttribute('type', 'password');
        passwordInput2.setAttribute('type', 'password');
    }
});






//EXECUTION
showReturningUserScreen();