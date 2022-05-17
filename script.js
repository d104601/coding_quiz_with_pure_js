var startButton = document.querySelector("#startButton");
var scoreButton = document.querySelector("#toScoreboard");
var upperBody = document.querySelector("#upperBody");
var lowerBody = document.querySelector("#lowerBody");
var timer = document.querySelector("#timer");

var timeLeft;
var timeInterval;
var currentScore;
var currentQuestion;
var questions = [
    {
        "question" : "Commonly used data types DO Not Include:",
        "selection" : ["strings", "booleans", "elerts", "numbers"],
        "answer" : 2 // selections are 0, 1, 2, 3
    },
    {
        "question" : "The condition in an if / else statement is enclosed with:",
        "selection" : ["quotes", "curly brackets", "parenthesis", "square brackets"],
        "answer" : 2
    },
    {
        "question" : "Arrays in JavaScript can be used to store ______:",
        "selection" : ["numbers and strings", "other arrays", "booleans", "all of above"],
        "answer" : 3
    },
    {
        "question" : "String values must be enclosed within _______ when being assigned to variables.:",
        "selection" : ["commas", "curly brackets", "quotes", "parenthesis"],
        "answer" : 2
    },
    {
        "question" : "A very useful tool used during development and debugging for printing content to the debugger is.:",
        "selection" : ["JavaScript", "terminal/bash", "for loops", "console.log"],
        "answer" : 3
    }
]

// function to start the game after clicking start button
function gameStart() {
    questionCount = 0;
    currentScore = 0;
    setTimer();
    showQuestion();
}

// function to set timer
function setTimer() {
    timeLeft = 100;
    timer.textContent = "Time: " + timeLeft;

    timeInterval = setInterval(function () {
        console.log(timeLeft);
        timeLeft--;

        timer.textContent = "Time: " + timeLeft;
    
        if(timeLeft === 0)
        {
          clearInterval(timeInterval);

          window.alert("Times Up!");
          showResult();
        }

    }, 1000);
}


// function to show the questions
function showQuestion() {
    upperBody.textContent = "";
    lowerBody.textContent = "";
    
    // get current question from questions above
    var currentQuestion = questions[questionCount];
    
    var question = document.createElement("h1");
    question.textContent = currentQuestion.question;
    upperBody.appendChild(question);

    var selections = document.createElement("ul");

    currentSelection = currentQuestion.selection;
    
    var select;
    for(let i = 0; i < currentSelection.length; i++)
    {
        select = document.createElement("button");
        select.textContent = (i + 1) + ". " + currentSelection[i];
        select.setAttribute("id", i);
        select.setAttribute("class", "selection");

        select.addEventListener("click", function(event) {
            if(i === currentQuestion.answer)
            {  
                window.alert("Correct!");
                currentScore++;
            }
            else
            {
                window.alert("Wrong!");
                timeLeft -= 10;
            }
            nextQuestion();
        });

        var li = document.createElement("li");
        li.appendChild(select);
        selections.appendChild(li);
    }
    lowerBody.appendChild(selections);    
}

// function to show next question after clicking current question's selection
function nextQuestion() {
    if(questionCount === questions.length - 1)
    {
        showResult();
    }
    else
    {
        questionCount++;
        showQuestion();
    }
}

// function to show result page after quiz
function showResult(){
    upperBody.textContent = "";
    lowerBody.textContent = "";

    timeLeft = 0;

    var title = document.createElement("h1");
    title.textContent = "All done!";
    upperBody.appendChild(title);

    var score = document.createElement("p");
    score.textContent = "Your final score is " + currentScore;
    upperBody.appendChild(score);

    var label = document.createElement("label");
    label.textContent = "Enter initials: ";
    lowerBody.appendChild(label);

    var form = document.createElement("input");
    form.setAttribute("type", "text");
    form.setAttribute("id", "initial");
    lowerBody.appendChild(form);

    var submit = document.createElement("button");
    submit.textContent = "submit";
    lowerBody.appendChild(submit);

    submit.addEventListener("click", function(event) {
        localStorage.setItem(form.value, currentScore);
        scoreboard();
    });

}

// function to show scoreboard page
function scoreboard() {
    clearInterval(timeInterval);

    var title = document.createElement("h1");
    title.textContent = "Scoreboard";
    
    upperBody.textContent = "";
    upperBody.appendChild(title);

    var board = getScoreBoard();
    lowerBody.textContent = "";
    lowerBody.appendChild(board);
    
    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    lowerBody.appendChild(goBack);

    var clearBoard = document.createElement("button");
    clearBoard.textContent = "Clear Scoreboard";
    lowerBody.appendChild(clearBoard);

    // "Go Back" button in scoreboard page
    goBack.addEventListener("click", function(event) {
        window.location.reload();
    });

    // "Clear Board" button
    clearBoard.addEventListener("click", function(event) {
        localStorage.clear();
        scoreboard();
    })
}

// function to create scoreboard table with data from local storage
function getScoreBoard() {
    var board = document.createElement("ul");
    var element = document.createElement("li");
    var name;
    var score;

    for(let i = 0; i < localStorage.length; i++)
    {
        name = localStorage.key(i);       
        score = localStorage.getItem(name);
        element.textContent = name + " - " + score;
        
        board.appendChild(element.cloneNode(true));
    }

    return board;
}

// scoreboard button in front page
scoreButton.addEventListener("click", function(event) {
    event.preventDefault();
    scoreboard();
});

// start button in front page
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    gameStart();
    setTimer();
});


