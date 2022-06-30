
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



//USER INPUT VALIDATION
const CHARACTERS = {
    alpha: 'abcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    special: ' !"#$%&()*+,-./:;<=>?@[]^_`{|}~' + "'" + '\\'
}



//USERS
const users = JSON.parse(localStorage.getItem('users')) || [];
var currentUser;



//QUIZ
const QUESTIONS = [
    new Question("#1 - What's the right answer?",
        new Choice('right answer', true), new Choice('text text'), new Choice('more text'), new Choice('still more text')
    ),
    new Question("#2 - What's the right answer?",
        new Choice('right answer', true), new Choice('text text'), new Choice('more text'), new Choice('still more text')
    ),
    new Question("#3 - What's the right answer?",
        new Choice('right answer', true), new Choice('text text'), new Choice('more text'), new Choice('still more text')
    ),
    new Question("#4 - What's the right answer?",
        new Choice('right answer', true), new Choice('text text'), new Choice('more text'), new Choice('still more text')
    ),
    new Question("#5 - What's the right answer?",
        new Choice('right answer', true), new Choice('text text'), new Choice('more text'), new Choice('still more text')
    )
];
var qsRandOrder; //contains the same content as QUESTIONS, but w the order of questions and their choices randomized
var currentQIndex;
var quizTimer;



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

const switchToReturningUserBtn = document.createElement('button');
    switchToReturningUserBtn.classList.add('btn', 'switch-btn');    
    switchToReturningUserBtn.textContent = 'Already signed up? Login here';

const switchToNewUserBtn = document.createElement('button');
    switchToNewUserBtn.classList.add('btn', 'switch-btn');
    switchToNewUserBtn.textContent = 'No account yet? Register here';

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
    passwordInput2.setAttribute('name', 'password-input-2');
    passwordInput2.setAttribute('placeholder', 're-enter password');

const showPasswordCheckbox = document.createElement('input');
    showPasswordCheckbox.setAttribute('type', 'checkbox');
    showPasswordCheckbox.setAttribute('id', 'show-password');

const showPasswordLabel = document.createElement('label');
    showPasswordLabel.setAttribute('for', 'show-password');
    showPasswordLabel.textContent = 'Show password';

const confirmTermsCheckbox = document.createElement('input');
    confirmTermsCheckbox.setAttribute('type', 'checkbox');
    confirmTermsCheckbox.setAttribute('id', 'confirm-terms')

const confirmTermsLabel = document.createElement('label');
    confirmTermsLabel.setAttribute('for', 'confirm-terms');
    confirmTermsLabel.innerHTML =
        '<p><span>Security disclaimer:</span> I understand that this site does NOT store my username and password <em>securely</em></p>';

var loginSubmitBtn = document.createElement('button');
    // Later, set the 'form' attribute to match the given form's id
    // Later, set the textContent to either 'Register' or 'Login'

var errorMessagesEl = document.createElement('p');
    errorMessagesEl.className = 'errors';

var userInfoEl = document.createElement('h3');
    var userLoggedIn;
    userInfoEl.className = 'user-info';

var timerEl = document.createElement('h3');
    const TIME_ALLOWED = 120;
    const TIME_PENALTY = 10;
    var timeLeft;
    timerEl.className = 'timer';

const preQuizInfoEl = document.createElement('p');
    preQuizInfoEl.className = 'start-quiz-info';
    preQuizInfoEl.innerHTML =
        'Try to answer the following Javascript-related questions within the '
        + TIME_ALLOWED
        + '-second time limit.<br/>A wrong answer will penalize your time by '
        + TIME_PENALTY
        + ' seconds.<br/>Your final score will be equal to the time remaining at the end of your quiz.'
    ;

const startQuizBtn = document.createElement('button');
    startQuizBtn.classList.add('btn', 'start-btn');
    startQuizBtn.textContent = 'Start Quiz';

const preQuizWrapper = document.createElement('div');
    preQuizWrapper.classname = 'pre-quiz-wrapper';
    preQuizWrapper.appendChild(preQuizInfoEl);
    preQuizWrapper.appendChild(startQuizBtn);

var questionCounterEl = document.createElement('h5');
    questionCounterEl.className = 'question-counter';

var questionTextEl = document.createElement('h4');
    questionTextEl.className = 'question-text';

var choicesWrapper = document.createElement('div');
    choicesWrapper.className = 'choices-wrapper';

var choiceElTemplate = document.createElement('button'); //to be cloned later
    choiceElTemplate.classList.add('btn', 'choice-btn');
    
const quizWrapper = document.createElement('div');
    quizWrapper.className = 'quiz-wrapper';
    quizWrapper.appendChild(questionCounterEl);
    quizWrapper.appendChild(questionTextEl);
    quizWrapper.appendChild(choicesWrapper);
    


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
    resetForms();

    pageContent.appendChild(switchToReturningUserBtn);

    newUserForm.appendChild(usernameInput);
    newUserForm.appendChild(passwordInput1);
    newUserForm.appendChild(passwordInput2);
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
    resetForms();

    pageContent.appendChild(switchToNewUserBtn);

    returningUserForm.appendChild(usernameInput);
    returningUserForm.appendChild(passwordInput1);
    returningUserForm.appendChild(showPasswordCheckbox);
    returningUserForm.appendChild(showPasswordLabel);

    loginSubmitBtn.setAttribute('form', returningUserForm.id);
    loginSubmitBtn.textContent = 'Login';
    returningUserForm.appendChild(loginSubmitBtn);

    pageContent.appendChild(returningUserForm);
}


function showPreQuizScreen(){
    pageClear();
    resetTimer();

    refreshTimeLeft();
    
    pageContent.appendChild(userInfoEl);
    pageContent.appendChild(timerEl);
    pageContent.appendChild(preQuizWrapper);
}


function showQuizScreen(){
    pageContent.removeChild(preQuizWrapper);

    pageContent.appendChild(quizWrapper);

    currentQIndex = 0;
    showCurrentQuestion();

    startQuizTimer();
}



function showCurrentQuestion(){
    var currentQ = qsRandOrder[currentQIndex];
    
    questionCounterEl.textContent = 'Question ' + (currentQIndex + 1) + ' of ' + qsRandOrder.length;
    
    questionTextEl.textContent = currentQ.text;
    
    choicesWrapper.innerHTML = '';
    for (i = 0; i < currentQ.choices.length; i++){
        var choiceEl = choiceElTemplate.cloneNode();
            choiceEl.textContent = currentQ.choices[i].text;
            choiceEl.setAttribute('choice-id', i);
            choiceEl.addEventListener('click', choiceBtnListener);

        choicesWrapper.appendChild(choiceEl);
    }
}


function resetForms(){
    newUserForm.reset();
    returningUserForm.reset();
    passwordInput1.setAttribute('type', 'password');
    passwordInput2.setAttribute('type', 'password');
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


function doesUserAlreadyExist(user, formID){
    for (i = 0; i < users.length; i++)
        if (
            formID === newUserForm.id
            && user.username === users[i].username
        )
            return true;
        else if (
            formID === returningUserForm.id
            && user.username === users[i].username
            && user.password === users[i].password
        )
            return users[i]; //this ensures that the user's high score gets properly loaded upon login
    
    return false;
}


function loginErrors(formID){
    usernameInput.value = usernameInput.value.toLowerCase().trim(); //this also updates the username to lowercase/trimmed on screen
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
    
        var password2Val = passwordInput2.value;
        if(password2Val === '')
            errs.push('You must re-enter your password');
        else if (!(password2Val === password1Val))
            errs.push('The passwords do not match');
    }

    if (errs.length > 0)
        return errs;
    return false;
}


function setCurrentUser(user){
    currentUser = user;
    userInfoEl.innerHTML = currentUser.username + '<br/>' + 'Current high score: ' + currentUser.highScore;
}


function saveUsers(newUser){
    if (newUser)
        users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
}


function resetTimer(){
    timeLeft = TIME_ALLOWED;
}


function startQuizTimer(){
    quizTimer = setInterval(
        function(){ 
            if (timeLeft === 0){
                stopQuizTimer();
                return;
            }
            if (timeLeft > 0){
                timeLeft--;
                refreshTimeLeft();
            }
        }, 1000)
        ;
}


function stopQuizTimer(){
    clearInterval(quizTimer);
}


function refreshTimeLeft(){
    if (timeLeft < 0)
        timeLeft = 0;
    
    timerEl.textContent = 'Time remaining: ' + timeLeft;

    if (timeLeft === 0){
        stopQuizTimer();
        console.log('game over'); //go to <game over>
    }

}


function randomizeQsCsOrder(){
    function randomizeOrder(array){
        var currentIndex = array.length;
        var randIndex;
        
        while (currentIndex > 0){
            randIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [array[currentIndex], array[randIndex]] = [array[randIndex], array[currentIndex]];
        }

        return array;
    }
    
    qsRandOrder = QUESTIONS;
    //randomize choice order for each question
        qsRandOrder.forEach(question => {
            question.choices = randomizeOrder(question.choices);
        });
    //randomize question order
        qsRandOrder = randomizeOrder(qsRandOrder);
}




//LISTENERS
newUserBtn.addEventListener('click', showNewUserScreen);
switchToNewUserBtn.addEventListener('click', showNewUserScreen);

returningUserBtn.addEventListener('click', showReturningUserScreen);
switchToReturningUserBtn.addEventListener('click', showReturningUserScreen);


showPasswordCheckbox.addEventListener('change', function(){
    if (this.checked){
        passwordInput1.setAttribute('type', 'text');
        passwordInput2.setAttribute('type', 'text');
    }else{
        passwordInput1.setAttribute('type', 'password');
        passwordInput2.setAttribute('type', 'password');
    }
});


loginSubmitBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    errorMessagesEl.remove();

    var formID = this.getAttribute('form');
    var userErrors = loginErrors(formID);
    
    if (userErrors){
        errorMessagesEl.innerHTML = userErrors.join('<br/>');
        pageContent.appendChild(errorMessagesEl);
    }
    else{
        var submittedUser = new User(usernameInput.value, passwordInput1.value);
        
        if (formID === newUserForm.id){
            if (doesUserAlreadyExist(submittedUser, formID)){
                errorMessagesEl.textContent = 'A user with this username already exists'; //Animate this so it fades away?
                pageContent.appendChild(errorMessagesEl);
            }
            else{
                saveUsers(submittedUser);
                setCurrentUser(submittedUser);
                showPreQuizScreen();
            }
        }else if (formID === returningUserForm.id){
            submittedUser = doesUserAlreadyExist(submittedUser, formID);
            if(submittedUser){
                setCurrentUser(submittedUser);
                showPreQuizScreen();
            }
            else{
                errorMessagesEl.textContent = 'Invalid username/password combination'; //Animate this so it fades away?
                pageContent.appendChild(errorMessagesEl);
            }
        }
    }
});


startQuizBtn.addEventListener('click', function(){
    randomizeQsCsOrder();
    showQuizScreen();
});


function choiceBtnListener(){
    if (qsRandOrder[currentQIndex].choices[this.getAttribute('choice-id')].isRight()){
        currentQIndex++;
        if (currentQIndex > (qsRandOrder.length - 1)){
            stopQuizTimer();
            console.log('you finished the game, with a score of ' + timeLeft); //go to <you finished the game> screen
        }
        else
            showCurrentQuestion();
    }
    else{
        timeLeft -= TIME_PENALTY;
        refreshTimeLeft();
        this.append(' ❌');
        this.setAttribute('disabled', '');
        //add other css restylings, e.g. making the button pink-red, giving it a thicker border
    }
}



//INITIALIZE PAGE
//TESTER CONDIITIONS FOR NOW
setCurrentUser(users[0]);
showPreQuizScreen();