console.log("Starting tinyTourneys Registration...")

// Questions Array
const questions = [
  //{question: 'Enter Email Address', pattern: /\S+@\S+\.\S+/},
  {question: 'Enter Director Name'},
  {question: 'How Many Teams?', type: 'number', min: '1', max: '10'},
  //{question: 'Enter Head Coach Name'},
  //{question: 'Enter Team Name'},
  //{question: 'Create Password', type: 'password'},
];

// Transition Times
const shakeTime = 100; // Shake transition time (ms)
const switchTime = 200; //Transition between questions (ms)

// Init Position at First Question
let position = 0;

// Init DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');
const summaryBox = document.querySelector('#summary-box');
const summaryBody = document.querySelector('#summary-body');

// Events
// Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next button click
nextBtn.addEventListener('click', validate);
// Prev button click
prevBtn.addEventListener('click', prevQuestion)

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13) {
    validate();
  }
})

// Functions
// Get question from arrary and add to markup
function getQuestion() {
  console.log("get questions..")
  // Get Current question
  inputLabel.innerHTML = questions[position].question;
  // Get Current type
  inputField.type = questions[position].type || 'text';

  // Identify if field is requesting a number
  if(inputField.type == 'number'){
    inputField.setAttribute('min', questions[position].min);
    inputField.setAttribute('max', questions[position].max);
  }

  // Get Current Answer
  inputField.value =  questions[position].answer || '';
  // Focus on Current Element
  inputField.focus();

  // Set Progress Bar Width - Variable to questions length array
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR back arrow depending on question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Display question to user
function showQuestion(){
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question from User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none'
  inputGroup.style.border = null;
}

// Transform to Create Shake Motion
function transform(x, y){
  formBox.style.transform = `translate(${x}px, ${y}px)`
}

// Validate Field
function validate() {
  // Make sure pattern matches, if available
  if(!inputField.value.match(questions[position].pattern || /.+/)){
    inputFail();

  } else {
    inputPass();
  }
}

// Go back one question
function prevQuestion() {
  // Go back one question
  position--;
  // Get prev question
  getQuestion()
}

// Field Input Failed
function inputFail() {
  formBox.className = 'error';
  // Repeat shake motion, set i to number of shakes
  for(let i = 0; i < 6; i++){
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1)* 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }

}

// Field Input Passed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer in Arrary
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If new question, hide current and get next
  if(questions[position]){
    hideQuestion();
    getQuestion();
  } else {
    // Remove If no More questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
}

function createSummary() {

  const p = document.createElement('p');
    
  for (let i = 0; i < position; i++) {
    p.appendChild(document.createTextNode(`${questions[i].question}: ${questions[i].answer}.`));
    summaryBody.parentElement.appendChild(p);
  }
  summaryBox.style.opacity = 1;
}

// All fields complete - show h1 end
function formComplete() {

  console.log(questions);
  
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}. You are now registered for our tournament`));

  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    createSummary();
    setTimeout(() => h1.style.opacity = 1, 50)
  }, 1000)

}
