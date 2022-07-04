# Javascript Fundamentals Timed Quiz
## Noah Becker

### [Github repo](https://github.com/noah35becker/js-fundamentals-timed-quiz/)

### [Live web application](https://noah35becker.github.io/js-fundamentals-timed-quiz/)
<br/>
************************************************************************

<br/>
<br/>

This code completes the weekly challenge for Module #4 in Columbia's Coding Bootcamp.


<br/>

I have created a timed quiz with multiple-choice questions related to Javascript. 


<br/>

The user first selects whether they are a new user or returning user.

- If they selected 'new user', but <em>should</em> have selected 'returning user' (or vice-versa), they are given the option to switch to the other type of login
- If they selected 'new user':
    - They are prompted to enter:
        - A username (8–30 alphanumeric characters)
        - A password (8–30 alphanumeric or special characters), entered twice
    - They must also confirm that they understand the data storage disclaimer
- If they selected 'returning user':
    - They are prompted to enter their username and password
- The user has the option to show or hide their password
- User input is thoroughly validated
    - If there are errors in user input, appropriate error messages appear, and the given invalid fields are outlined in red until re-submitted correctly



<br/>

Upon successful login, the user sees the pre-quiz screen, which contains:
- Their username and current high score
- The option to view global high scores
- The option to log out, which returns them to the initial 'New user / Returning user' screen
    - The message 'You have been logged out' appears (and then fades away)
- The time remaining for the quiz they're about to take (displayed on <em>this</em> page so they know in advance where the timer will appear on screen during the quiz)
- Information about the quiz they're about to take
- A 'Start quiz' button



<br/>

Once the user begins the quiz, the time remaining begins to count down, and the user is presented with a series of Javascript-related multiple-choice questions.

- Question order is randomized
- The order of each question's multiple choices is randomized
- Clicking the correct choice…
    - …causes a green 'Correct!' message to display (and then fade away) below the multiple choices
    - …advances the user to the next question
- Clicking a wrong choice…
    - …causes a red '–10 \[seconds\]' message to display (and then fade away) below the timer
    - …appends a red X symbol (❌) to the text of the wrong choice
    - …grays out and disables the choice
- The quiz ends when the user answers all questions correctly, or when the timer reaches zero


<br/>

At the end of the quiz:

- If the timer reached zero, the user is informed that they did not finish the quiz in time
- If there was time remaining at the end of the quiz, the user is informed that they finished the quiz, and their final score is displayed
    - If their final score is a new personal high score, they are informed
- The user is given the option to:
    - 'Try again', which returns them to the pre-quiz screen
    - 'Quit + log out', with the same log-out behavior as described above


<br/>

The 'global high scores' screen—'global' referring only to users on the current device / browser—displays the following (below the header/subheader):

- A title:
    - 'Global high scores', if there are 10 or fewer unique high scores in the system
    - 'Top 10 global high scores', if there are more than 10 unique high scores in the system
- A list of high scores (capped at 10 maximum unique scores) with corresponding usernames 
    - If the current user's high score is on the list, their username appears bolded and italicized
    - If there are three or fewer usernames with a given high score, all of the usernames will appear; if there are more than three usernames with a given high score, only the first three usernames will appear (<em>always</em> including the current user, if applicable), with an ellipsis following the third username to signify that more users than are currently shown share this same high score


     


<br/>

The web application uses a responsive layout that adapts to different viewports and devices.

<br/>
************************************************************************
<br/>

Below are screenshots of the web application in various states:

<br/>
The welcome screen
<br/>
<br/>
<img src="assets/final-screenshots/1-welcome-screen.png" width="600"/>
<br/>

<br/>
The new user registration screen
<br/>
<br/>
<img src="assets/final-screenshots/2-new-user-registration.png" width="600"/>
<br/>

<br/>
The new user registration screen with various user errors
<br/>
<br/>
<img src="assets/final-screenshots/3-new-user-registration-with-user-errors.png" width="600"/>
<br/>

<br/>
The new user registration screen with a 'username already exists' message
<br/>
<br/>
<img src="assets/final-screenshots/4-new-user-registration-username-already-exists.png" width="600"/>
<br/>

<br/>
The returning user login screen
<br/>
<br/>
<img src="assets/final-screenshots/5-returning-user-login.png" width="600"/>
<br/>

<br/>
The returning user login screen, with an invalid username/password combination
<br/>
<br/>
<img src="assets/final-screenshots/6-returning-user-login-wrong-user-pass-combo.png" width="600"/>
<br/>

<br/>
The pre-quiz screen
<br/>
<br/>
<img src="assets/final-screenshots/7-pre-quiz.png" width="600"/>
<br/>

<br/>
A sample quiz question
<br/>
<br/>
<img src="assets/final-screenshots/8-quiz-question.png" width="600"/>
<br/>

<br/>
A quiz question with some wrong answers having been selected
<br/>
<br/>
<img src="assets/final-screenshots/9-quiz-question-some-wrong-answers-selected.png" width="600"/>
<br/>

<br/>
The end-of-quiz screen
<br/>
<br/>
<img src="assets/final-screenshots/10-end-of-quiz.png" width="600"/>
<br/>

<br/>
The global high scores screen, with fewer than 10 unique high scores in the system
<br/>
<br/>
<img src="assets/final-screenshots/11-global-high-scores.png" width="600"/>
<br/>

<br/>
The global high scores screen, with more than 10 unique high scores in the system
<br/>
<br/>
<img src="assets/final-screenshots/12-global-high-scores-top-10.png" width="600"/>
<br/>


<br/>

– Noah