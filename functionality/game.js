const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [
    {
        question: 'What country has the highest life expectancy?',
        choice1:'Greece',
        choice2:'Nigeria',
        choice3:'Russia',
        choice4:'Hong Kong',
        answer: 4,
    },
    {
        question:"Where would you be if you were standing on the Spanish Steps?",
        choice1:"Barcelona",
        choice2:"California",
        choice3:"Rome",
        choice4:"Seville",
        answer:3,
    },
    {
        question:"Which language has the more native speakers?",
        choice1:"English",
        choice2:"Spanish",
        choice3:"Chinese",
        choice4:"Greek",
        answer:2,
    },
    {
        question:"What is the most common surname in the United States?",
        choice1:"Doe",
        choice2:"Brown",
        choice3:"House",
        choice4:"Smith",
        answer:4,
    },
    {
        question:"Who was the Ancient Greek God of the Sun?",
        choice1:"Apollo",
        choice2:"Poseidon",
        choice3:"Artemis",
        choice4:"Helios",
        answer:1,
    },
    {
        question:"What country has won the most World Cups?",
        choice1:"Argentina",
        choice2:"Brazil",
        choice3:"Spain",
        choice4:"Germany",
        answer:2,
    },
    {
        question:"Who discovered that the earth revolves around the sun?",
        choice1:"Aristotle",
        choice2:"Plato",
        choice3:"Copernicus",
        choice4:"Plank",
        answer:3,
    },
    {
        question:"How many bones do we have in an ear?",
        choice1:"1",
        choice2:"5",
        choice3:"3",
        choice4:"0",
        answer:3,
    },
    {
        question:"How many stars are on the Chinese flag?",
        choice1:"10",
        choice2:"6",
        choice3:"5",
        choice4:"3",
        answer:3,
    },
    {
        question:"Where did sushi originate?",
        choice1:"Japan",
        choice2:"Thailand",
        choice3:"China",
        choice4:"Italy",
        answer:3,
    },
    {
        question:"What country drinks the most coffee?",
        choice1:"Greece",
        choice2:"Germany",
        choice3:"Spain",
        choice4:"Finland",
        answer:4,
    },
    {
        question:"What sporting event has a strict dress code of all white?",
        choice1:"Euroleague",
        choice2:"World Cup",
        choice3:"Wimbleton",
        choice4:"US Open",
        answer:3,
    },
    {
        question:"Who is the world's highest-paid athlete in 2021? ",
        choice1:"Michael Jordan",
        choice2:"Conor McGregor",
        choice3:"Tiger Woods",
        choice4:"Cristiano Ronaldo",
        answer:2,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator to get all the questions
    getNewQuestion();
}

getNewQuestion = () => {
    questionCounter++;
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }
    

    progressText.innerHTML = `Easy question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1);

    acceptingAnswers = true; 
}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers)return
  
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect';
        
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
       }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})
   
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame();
