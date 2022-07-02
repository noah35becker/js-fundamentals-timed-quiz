
//CLASSES
var User = function(username, pw){
    this.username = '' + username;
    this.password = pw;
    this.highScore = 0;
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
var currentUserIndex;



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
var pageContent = document.querySelector('main');

const justLoggedOutEl = document.createElement('h4');  
    justLoggedOutEl.className = 'just-logged-out';
    justLoggedOutEl.textContent = 'You have been logged out';

const welcomeText = document.createElement('h3');
    welcomeText.className = 'welcome-text';
    welcomeText.textContent = 'Welcome';

const newUserBtn = document.createElement('button');
    newUserBtn.textContent = 'New user';
    newUserBtn.classList.add('btn', 'login-btn');

const returningUserBtn = document.createElement('button');
    returningUserBtn.textContent = 'Returning user';
    returningUserBtn.classList.add('btn', 'login-btn');

const userTypeBtnsWrapper = document.createElement('div');
    userTypeBtnsWrapper.className = 'user-type-btns-wrapper';
    userTypeBtnsWrapper.appendChild(newUserBtn);
    userTypeBtnsWrapper.appendChild(returningUserBtn);

const newUserForm = document.createElement('form');
    newUserForm.id = 'new-user-form';
    newUserForm.className = 'login-form';
    newUserForm.innerHTML = '<h4 class="form-intro-text">Enter new user info</h4>';

const returningUserForm = document.createElement('form');
    returningUserForm.id = 'returning-user-form';
    returningUserForm.className = 'login-form';
    returningUserForm.innerHTML = '<h4 class="form-intro-text">Enter login info</h4>';

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
    showPasswordCheckbox.className = 'show-password-checkbox';
    showPasswordCheckbox.setAttribute('type', 'checkbox');
    showPasswordCheckbox.setAttribute('id', 'show-password');

const showPasswordLabel = document.createElement('label');
    showPasswordLabel.className = 'show-password-label';
    showPasswordLabel.setAttribute('for', 'show-password');
    showPasswordLabel.textContent = 'Show/hide password';

const showPasswordCheckboxWrapper = document.createElement('div');
    showPasswordCheckboxWrapper.classList.add('checkbox-wrapper', 'show-password-checkbox-wrapper');
    showPasswordCheckboxWrapper.appendChild(showPasswordCheckbox);
    showPasswordCheckboxWrapper.appendChild(showPasswordLabel);

const confirmTermsCheckbox = document.createElement('input');
    confirmTermsCheckbox.className = 'confirm-terms-checkbox'; 
    confirmTermsCheckbox.setAttribute('type', 'checkbox');
    confirmTermsCheckbox.setAttribute('id', 'confirm-terms')

const confirmTermsLabel = document.createElement('label');
    confirmTermsLabel.className = 'confirm-terms-label';
    confirmTermsLabel.setAttribute('for', 'confirm-terms');
    confirmTermsLabel.innerHTML =
        '<p><span>Security disclaimer:</span> I understand that this site will NOT store my username and password <em>securely</em></p>';

const confirmTermsCheckboxWrapper = document.createElement('div');
    confirmTermsCheckboxWrapper.classList.add('checkbox-wrapper', 'confirm-terms-checkbox-wrapper');
    confirmTermsCheckboxWrapper.appendChild(confirmTermsCheckbox);
    confirmTermsCheckboxWrapper.appendChild(confirmTermsLabel);

var loginSubmitBtn = document.createElement('button');
    loginSubmitBtn.classList.add('btn', 'login-submit-btn');
    loginSubmitBtn.setAttribute('type', 'submit');
    // Later, set the 'form' attribute to match the given form's id
    // Later, set the textContent to either 'Register' or 'Login'

var errorMessagesEl = document.createElement('p');
    errorMessagesEl.className = 'errors';
    var invalidFields = [];

var usernameEl = document.createElement('h3');
    usernameEl.className = 'username-info';

var userHighScoreEl = document.createElement('h3');
    userHighScoreEl.className = 'high-score-info';

const viewHighScoresEl = document.createElement('a');
    viewHighScoresEl.className = 'view-high-scores';
    viewHighScoresEl.textContent = 'View global high scores';    

const logOutEl = document.createElement('a');
    logOutEl.className = 'log-out';
    logOutEl.textContent = 'Log out';

const returnToQuizEl = document.createElement('a');
    returnToQuizEl.className = 'return-to-quiz';
    returnToQuizEl.textContent = 'Return to quiz'; 

var subheaderLeftWrapper = document.createElement('div');
    subheaderLeftWrapper.className = 'subheader-left-wrapper';

var timerEl = document.createElement('h3');
    const TIME_ALLOWED = 120;
    const TIME_PENALTY = 10;
    var timeLeft;
    timerEl.className = 'timer';

var timerPenaltyMsg = document.createElement('h3');
    timerPenaltyMsg.className = 'timer-penalty';

const subheaderRightWrapper = document.createElement('div');
    subheaderRightWrapper.className = 'subheader-right-wrapper';
    subheaderRightWrapper.appendChild(timerEl);
    subheaderRightWrapper.appendChild(timerPenaltyMsg);

var subheaderAllWrapper = document.createElement('div');
    subheaderAllWrapper.className = 'subheader-all-wrapper';

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
    startQuizBtn.textContent = 'Start quiz';

const preQuizWrapper = document.createElement('div');
    preQuizWrapper.className = 'pre-quiz-wrapper';
    preQuizWrapper.appendChild(preQuizInfoEl);
    preQuizWrapper.appendChild(startQuizBtn);

var globalHighScoresWrapper = document.createElement('div');
    globalHighScoresWrapper.className = 'global-high-scores-wrapper';

var questionCounterEl = document.createElement('h5');
    questionCounterEl.className = 'question-counter';

var questionTextEl = document.createElement('h4');
    questionTextEl.className = 'question-text';

var choicesWrapper = document.createElement('div');
    choicesWrapper.className = 'choices-wrapper';

var choiceElTemplate = document.createElement('button'); //to be cloned later
    choiceElTemplate.classList.add('btn', 'choice-btn');

var questionCorrectEl = document.createElement('h4');
    questionCorrectEl.className = 'question-correct';
    
const quizWrapper = document.createElement('div');
    quizWrapper.className = 'quiz-wrapper';
    quizWrapper.appendChild(questionCounterEl);
    quizWrapper.appendChild(questionTextEl);
    quizWrapper.appendChild(choicesWrapper);
    quizWrapper.appendChild(questionCorrectEl);
    
var quizOverText = document.createElement('h4');
    quizOverText.className = 'quiz-end-text';

const tryAgainBtn = document.createElement('button');
    tryAgainBtn.classList.add('btn', 'try-again-btn');
    tryAgainBtn.textContent = 'Try again';

const quitBtn = document.createElement('button');
    quitBtn.classList.add('btn', 'quit-btn');
    quitBtn.textContent = 'Quit + log out';

const quizOverBtnsWrapper = document.createElement('div');
    quizOverBtnsWrapper.className = 'quiz-over-btns-wrapper';
    quizOverBtnsWrapper.appendChild(tryAgainBtn);
    quizOverBtnsWrapper.appendChild(quitBtn);

const quizOverWrapper = document.createElement('div');
    quizOverWrapper.className = 'quiz-over-wrapper';
    quizOverWrapper.appendChild(quizOverText);
    quizOverWrapper.appendChild(quizOverBtnsWrapper);



//FUNCTIONS

    //SCREENS
        function showUserTypeScreen(justLoggedOut){
            pageClear();

            if (justLoggedOut)
                pageContent.appendChild(justLoggedOutEl);

            pageContent.appendChild(welcomeText);
            pageContent.appendChild(userTypeBtnsWrapper);
        }


        function showNewUserScreen(){
            pageClear();
            resetForms();
            invalidFieldsReset();

            pageContent.appendChild(switchToReturningUserBtn);

            newUserForm.appendChild(usernameInput);
            newUserForm.appendChild(passwordInput1);
            newUserForm.appendChild(passwordInput2);
            newUserForm.appendChild(showPasswordCheckboxWrapper);
            newUserForm.appendChild(confirmTermsCheckboxWrapper);

            loginSubmitBtn.setAttribute('form', newUserForm.id);
            loginSubmitBtn.textContent = 'Register';
            newUserForm.appendChild(loginSubmitBtn);

            pageContent.appendChild(newUserForm);
        }


        function showReturningUserScreen(){
            pageClear();
            resetForms();
            invalidFieldsReset();

            pageContent.appendChild(switchToNewUserBtn);

            returningUserForm.appendChild(usernameInput);
            returningUserForm.appendChild(passwordInput1);
            returningUserForm.appendChild(showPasswordCheckboxWrapper);

            loginSubmitBtn.setAttribute('form', returningUserForm.id);
            loginSubmitBtn.textContent = 'Login';
            returningUserForm.appendChild(loginSubmitBtn);

            pageContent.appendChild(returningUserForm);
        }


        function showPreQuizScreen(){
            pageClear();
            resetTimer();

            refreshTimeLeft();

            subheaderLeftWrapper.appendChild(usernameEl);
            subheaderLeftWrapper.appendChild(userHighScoreEl);
            subheaderLeftWrapper.appendChild(viewHighScoresEl);
            subheaderLeftWrapper.appendChild(logOutEl);
            
            subheaderAllWrapper.appendChild(subheaderLeftWrapper);
            subheaderAllWrapper.appendChild(subheaderRightWrapper);

            pageContent.appendChild(subheaderAllWrapper);
            pageContent.appendChild(preQuizWrapper);
        }


        function showHighScoresScreen(){
            function rankedHighScoresHTML(){      
                const MAX_NUM_HIGH_SCORES = 10;
                var output = ["<h3 class='global-high-scores-title'>", 'Global high scores', '</h3>', "<ul class='global-high-scores-list'>"];
                const OUTPUT_NUM_INITIAL_ELEMS = output.length;
                const OUTPUT_TITLE_INDEX = 1;
                const MAX_USERS_PER_HIGH_SCORE = 3;
                var highestScoreSoFar = TIME_ALLOWED;

                const lowestHighScore = users.reduce(function(prevUser, currentUser){
                    return currentUser.highScore < prevUser.highScore ? currentUser : prevUser;
                }).highScore;

                while (!(highestScoreSoFar === lowestHighScore)){
                    if (output.length === (OUTPUT_NUM_INITIAL_ELEMS + MAX_NUM_HIGH_SCORES)){
                        output[OUTPUT_TITLE_INDEX] = "Top 10 global high scores";
                        break;
                    }
                    
                    var thisHighScore = 0;
                    var thisHighScoreUsernames = [];

                    for (i = 0; i < users.length; i++){
                        if (users[i].highScore < highestScoreSoFar){
                            if (users[i].highScore > thisHighScore){
                                if (i === currentUserIndex)
                                    thisHighScoreUsernames = ['<span class="this-user">' + users[i].username + '</span>'];
                                else
                                    thisHighScoreUsernames = [users[i].username];
                                thisHighScore = users[i].highScore;
                            }
                            else if (users[i].highScore === thisHighScore){
                                if (typeof thisHighScoreUsernames === 'object'){
                                    if (thisHighScoreUsernames.length < MAX_USERS_PER_HIGH_SCORE){
                                        if (i === currentUserIndex)
                                            thisHighScoreUsernames.push('<span class="this-user">' + users[i].username + '</span>');
                                        else
                                            thisHighScoreUsernames.push(users[i].username);
                                    }
                                    else
                                        thisHighScoreUsernames = thisHighScoreUsernames.join(', ') + '…';
                                }
                            }
                        }
                    }

                    if (thisHighScore === 0 && output.length === OUTPUT_NUM_INITIAL_ELEMS){ //this handles if ALL USERS have a high score of 0
                        output[OUTPUT_NUM_INITIAL_ELEMS - 1] = "<p class='global-high-scores-list-empty'>There are no high scores to show at this time.<br/>Check back here soon for updates!</p>";
                        return output;
                    }

                    if (thisHighScore === 0)
                        break;

                    if (typeof thisHighScoreUsernames === 'object')
                        thisHighScoreUsernames = thisHighScoreUsernames.join(', ');
                    
                    highestScoreSoFar = thisHighScore;

                    output.push('<li class=><span>' + thisHighScore + '</span> — ' + thisHighScoreUsernames + '</li>');
                }

                output.push('</ul>');
                return output;
            }

            //IMHERE

            pageClear();

            globalHighScoresWrapper.innerHTML = rankedHighScoresHTML().join('');

            subheaderLeftWrapper.appendChild(usernameEl);
            subheaderLeftWrapper.appendChild(userHighScoreEl);
            subheaderLeftWrapper.appendChild(userHighScoreEl);
            subheaderLeftWrapper.appendChild(returnToQuizEl);
            subheaderLeftWrapper.appendChild(logOutEl);

            subheaderAllWrapper.appendChild(subheaderLeftWrapper);

            pageContent.appendChild(subheaderAllWrapper);
            pageContent.appendChild(globalHighScoresWrapper);
        }


        function showQuizScreen(){
            pageClear();

            subheaderLeftWrapper.appendChild(usernameEl);
            subheaderLeftWrapper.appendChild(userHighScoreEl);
            subheaderLeftWrapper.appendChild(logOutEl);

            subheaderAllWrapper.appendChild(subheaderLeftWrapper);
            subheaderAllWrapper.appendChild(subheaderRightWrapper);

            pageContent.appendChild(subheaderAllWrapper);
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


        function showQuizOverScreen(){
            pageClear();

            subheaderLeftWrapper.appendChild(usernameEl);
            subheaderLeftWrapper.appendChild(userHighScoreEl);
            subheaderLeftWrapper.appendChild(viewHighScoresEl);
            subheaderLeftWrapper.appendChild(logOutEl);

            subheaderAllWrapper.appendChild(subheaderLeftWrapper);

            pageContent.appendChild(subheaderAllWrapper);

            if (timeLeft === 0)
                quizOverText.innerHTML = '<span>You did not finish the quiz in time</span><br/>Better luck next time!';
            else{
                quizOverText.innerHTML = '<span>You finished the quiz!<span><br/>'
                if (setHighScore(timeLeft)){
                    quizOverText.innerHTML += 'You set a personal high score of <span>' + timeLeft + '</span>!'
                    setCurrentUserIndex(currentUserIndex); //updates high score as part of userHighScoreEl
                }
                else
                    quizOverText.innerHTML += 'Your final score is <span>' + timeLeft + '</span>';
            }

            pageContent.appendChild(quizOverWrapper);
        }


    //ADD'L FUNCTIONS

        function pageClear(){
            pageContent.innerHTML = '';
            subheaderAllWrapper.innerHTML = '';
            subheaderLeftWrapper.innerHTML = '';

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
                thisChar = text.substring(i, i + 1).toLowerCase();
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
                    return i;
            
            return false;
        }


        function loginErrors(formID){
            usernameInput.value = usernameInput.value.toLowerCase().trim(); //this also updates the username to lowercase/trimmed on screen
            if (passwordInput1.value === '' && !(passwordInput2.value === '')){ //this also updates passwords 1 and 2 on screen
                passwordInput1.value = passwordInput2.value;
                passwordInput2.value = '';
            }

            var errs = [];
            invalidFields = [];
            var usernameVal = usernameInput.value;
            var password1Val = passwordInput1.value;

            if(usernameVal === ''){
                errs.push('Please enter a username');
                invalidFields.push(usernameInput);
            }
            else{
                if (usernameVal.length < 8){
                    errs.push('Username must be at least 8 characters long');
                    invalidFields.push(usernameInput);
                }
                else if (usernameVal.length > 30){
                    errs.push('Username must be no longer than 30 characters');
                    invalidFields.push(usernameInput);
                }
                
                var badChars = ineligibleCharsString(usernameVal, 'alpha', 'numeric');
                if (badChars){
                    errs.push('Username contains invalid characters: ' + badChars);
                    invalidFields.push(usernameInput);
                }
            }

            if(password1Val === ''){
                errs.push('Please enter a password');
                invalidFields.push(passwordInput1, passwordInput2);
            }
            else{
                if (password1Val.length < 8){
                    errs.push('Password must be at least 8 characters long');
                    invalidFields.push(passwordInput1, passwordInput2);
                }
                else if (password1Val.length > 30){
                    errs.push('Password must be no longer than 30 characters');
                    invalidFields.push(passwordInput1, passwordInput2);
                }
                
                var badChars = ineligibleCharsString(password1Val, 'alpha', 'numeric', 'special');
                    if (badChars){
                        errs.push('Password contains invalid characters: ' + badChars);
                        invalidFields.push(passwordInput1, passwordInput2);
                    }
            }

            if (formID === newUserForm.id){
                var password2Val = passwordInput2.value;

                if(password2Val === ''){
                    errs.push('You must re-enter the password');
                    invalidFields.push(passwordInput2);
                }
                else if (!(password2Val === password1Val)){
                    errs.push('The passwords do not match');
                    invalidFields.push(passwordInput1, passwordInput2);
                }
                
                if (!confirmTermsCheckbox.checked){
                    errs.push('You must confirm that you understand the security disclaimer');
                    invalidFields.push(confirmTermsCheckboxWrapper);
                }
            }

            if (errs.length > 0)
                return errs;
            return false;
        }


        function invalidFieldsMakeRed(){
            invalidFields.forEach(elem => {
                elem.style.outline = '3px solid ' + window.getComputedStyle(errorMessagesEl).getPropertyValue('color');
            });
        }


        function invalidFieldsReset(){
            invalidFields.forEach(elem => {
                elem.style.outline = 'none';
            });
        }


        function setCurrentUserIndex(index){
            currentUserIndex = index;
            usernameEl.innerHTML = 'Welcome, <em>' + users[currentUserIndex].username + '</em>';
            userHighScoreEl.textContent = 'Your high score: ' + users[currentUserIndex].highScore;
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
                showQuizOverScreen();
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

        function setHighScore(newScore){
            if (newScore > users[currentUserIndex].highScore){
                users[currentUserIndex].highScore = newScore;
                saveUsers();
                return true;
            }
    
            return false;
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
    invalidFieldsReset();

    var formID = this.getAttribute('form');
    var userErrors = loginErrors(formID);
    
    if (userErrors){
        errorMessagesEl.innerHTML = userErrors.join('<br/>');
        pageContent.appendChild(errorMessagesEl);
        invalidFieldsMakeRed();
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
                setCurrentUserIndex(users.length - 1);
                showPreQuizScreen();
            }
        }else if (formID === returningUserForm.id){
            submittedUserStoredIndex = doesUserAlreadyExist(submittedUser, formID);
            
            if(submittedUserStoredIndex === false){
                errorMessagesEl.textContent = 'Invalid username/password combination'; //Animate this so it fades away?
                pageContent.appendChild(errorMessagesEl);
                
            }
            else{
                setCurrentUserIndex(submittedUserStoredIndex);
                showPreQuizScreen();
            }
        }
    }
});


viewHighScoresEl.addEventListener('click', showHighScoresScreen);


logOutEl.addEventListener('click', function(){
    stopQuizTimer();
    showUserTypeScreen(true);
});


returnToQuizEl.addEventListener('click', showPreQuizScreen);


startQuizBtn.addEventListener('click', function(){
    randomizeQsCsOrder();
    showQuizScreen();
});


function choiceBtnListener(){
    if (qsRandOrder[currentQIndex].choices[this.getAttribute('choice-id')].isRight()){
        currentQIndex++;
        if (currentQIndex > (qsRandOrder.length - 1)){
            stopQuizTimer();
            showQuizOverScreen();
        }
        else{
            questionCorrectEl.textContent = 'Correct!'
            questionCorrectEl.style.opacity = 1;
            setTimeout(function(){
                questionCorrectEl.style.opacity = 0;
            }, 1300);

            showCurrentQuestion();
        }
    }
    else{
        timeLeft -= TIME_PENALTY;
        
        refreshTimeLeft();
        this.append(' ❌');
        this.setAttribute('disabled', '');
        
        timerPenaltyMsg.textContent = "—10";
        timerPenaltyMsg.style.opacity = 1;
            setTimeout(function(){
                timerPenaltyMsg.style.opacity = 0;
            }, 1300);
        //add other css restylings, e.g. making the button pink-red, giving it a thicker border
    }
}


tryAgainBtn.addEventListener('click', showPreQuizScreen);


quitBtn.addEventListener('click', function(){
    currentUser = null;
    showUserTypeScreen(true);
});



//INITIALIZE PAGE
//TESTER CONDIITIONS FOR NOW
    setCurrentUserIndex(0);
    showPreQuizScreen();
    // showUserTypeScreen();
