console.log("Starting tinyTourneys Registration...")

// List of Tournaments
const tournaments = [
  {name: '#girlsgotgame Spring Kick-off'},
  {name: 'February Classic'},
  {name: 'LaCrosse Memorial Classic'},
]

// Basic Questions Array
const basic_questions = [
  {label: 'Email', question: 'Enter Email Address', pattern: /\S+@\S+\.\S+/},
  {label: 'Director', question: 'Enter Director Name'},
  //{label: 'Phone', question: 'Enter Director Phone #', type: 'tel', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}'},
  {label: '# Teams', question: 'How Many Teams', type: 'number', min: '1', max: '10'},
  // {label: 'Password', question: 'Create Password', type: 'password'},
];

// Team Questions Array
const team_questions = [
  {label: 'Email', question: 'Enter Email Address', pattern: /\S+@\S+\.\S+/},
  {label: 'Head Coach', question: 'Enter Head Coach Name'},
  //{label: 'Phone', question: 'Enter Coach Phone #'},
  {label: 'Team', question: 'Enter Team Name'},
  {label: 'Requests', question: 'Enter Special Request'},
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
const tournamenSelected = document.querySelector('#tournament-selected');

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

// Input Field Number Range verification
inputField.addEventListener('keydown', e => {
  // Determin if this is an input number element
  if(inputField.type == 'number') {
    // Allow only backspace and delete
    if ( event.keyCode == 46 || event.keyCode == 8) {
      // let it happen, don't do anything

    } else if((inputField.value + String.fromCharCode(e.keyCode)) > 9) {
      console.log("Value to high: " + inputField.value);
      // Cancel this key event
      e.preventDefault();
    
    } else if(e.keyCode < 49 || e.keyCode > 57) {
      console.log("Not a valid digit: KeyCode " + e.keyCode);
      // Cancel this key event
      e.preventDefault();
    }
  }
})

// Functions
// Get tournaments from list
function getTournament() {

}

// Get question from arrary and add to markup
function getQuestion() {
  console.log("get questions..")
  // Get Current question
  inputLabel.innerHTML = basic_questions[position].question;
  // Get Current type
  inputField.type = basic_questions[position].type || 'text';

  // Identify if field is requesting a number
  if(inputField.type == 'number'){
    inputField.setAttribute('min', basic_questions[position].min);
    inputField.setAttribute('max', basic_questions[position].max);
  }

  // Get Current Answer
  inputField.value =  basic_questions[position].answer || '';
  // Focus on Current Element
  inputField.focus();

  // Set Progress Bar Width - Variable to questions length array
  progress.style.width = (position * 100) / basic_questions.length + '%';

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
  if(!inputField.value.match(basic_questions[position].pattern || /.+/)){
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
  basic_questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If new question, hide current and get next
  if(basic_questions[position]){
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

  // Display selected tournament for registration
  tournamenSelected.innerHTML = tournaments[2].name;
   
  for (let i = 0; i < position; i++) {
    const p = document.createElement('p');
    const hr = document.createElement('hr');
    p.classList.add('summary');

    switch(basic_questions[i].label) {

      case 'Password':
        // skip password answer
        break;

      default:
        p.appendChild(document.createTextNode(`${basic_questions[i].label}: ${basic_questions[i].answer}`));
        p.appendChild(hr);
        summaryBody.appendChild(p);
    }
  }
  summaryBox.style.opacity = 1;
}

// All fields complete - show h1 end
function formComplete() {

  console.log(basic_questions);
  
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${basic_questions[0].answer}. You are now registered for our tournament!`));

  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    createSummary();
    setTimeout(() => h1.style.opacity = 1, 50)
  }, 1000)

}
