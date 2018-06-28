console.log("Starting tinyTourneys Registration...")

// Questions Array
const questions = [
  {question: 'Enter Email Address', pattern: /\S+@\S+\.\S+/},
  {question: 'Enter Team Name'},
  {question: 'Enter Head Coach Name'},
  {question: 'Enter Director Name'},
  {question: 'Create Password', type: 'password'},
];

// Transition Times
const shakeTime = 100; // Shake transition time (ms)
const switchTime = 200; //Transition between questions (ms)

// Init Position at First Question
let position = 0;

// Init DOM elements


