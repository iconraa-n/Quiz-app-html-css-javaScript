// Select Elements

let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");


// Set Options
let currentIndex = 0;
let rightAnswers = 0; // count correct answer i choose

function getQuestions() {
  let questionsArray = []; // Array to store the fetched questions

  // Fetch questions from the API
  fetch("https://opentdb.com/api.php?amount=9&category=9&difficulty=easy&type=multiple")
    .then(response => response.json())
    .then(data => {
      const results = data.results; // Array containing the fetched results/questions
      
      // Iterate over each result/question
      results.forEach(result => {
        // Create a question object with the necessary properties
        let questionObject = {
          title: result.question, // The question text
          answer_1: result.incorrect_answers[0], // Incorrect answer option 1
          answer_2: result.incorrect_answers[1], // Incorrect answer option 2
          answer_3: result.incorrect_answers[2], // Incorrect answer option 3
          answer_4: result.correct_answer, // Correct answer option
          right_answer: result.correct_answer, // The correct answer
        };
        
        // Add the question object to the questionsArray
        questionsArray.push(questionObject);
      });

      let qCount = questionsArray.length; // Total number of fetched questions

      addQuestionData(questionsArray[currentIndex], qCount); // Add question data to the quiz area

      submitButton.onclick = () => {
        let theRightAnswer = questionsArray[currentIndex].right_answer; // Get the correct answer for the current question

        currentIndex++; // Move to the next question

        checkAnswer(theRightAnswer, qCount); // Check if the chosen answer is correct

        quizArea.innerHTML = ""; // Clear the quiz area
        answersArea.innerHTML = ""; // Clear the answers area

        addQuestionData(questionsArray[currentIndex], qCount); // Add data for the next question

        showResults(qCount); // Show the results if all questions have been answered
      };
    })
    .catch(error => {
      console.log("Error:", error); // Handle any errors that occur during the fetch request
    });
}

getQuestions();

// function addQuestionData(obj, count) { //question obj and count for the array length
//   if (currentIndex < count) { // count is counter of number of questions to make sure visit each index without index out of bounddry error
    
//     // Create H2 Question Title
//     let questionTitle = document.createElement("h2");

//     // Create Question Text
//     let questionText = document.createTextNode(obj["title"]);

//     // Append Text To H2
//     questionTitle.appendChild(questionText);

//     // Append The H2 To The Quiz Area
//     quizArea.appendChild(questionTitle);

//     // Create The Answers
//     for (let i = 1; i <= 4; i++) {
//       //  1- Create Main Answer Div here in js
//       let mainDiv = document.createElement("div");

//       // 2- Add Class To Main Div 
//       mainDiv.className = "answer";

//       // Create Radio html Input element 
//       let radioInput = document.createElement("input");

//       // Add Type + Name + Id + Data-Attribute  >> for the 4 choices
//       radioInput.name = "question";
//       radioInput.type = "radio";
//       radioInput.id = `answer_${i}`;
//       radioInput.dataset.answer = obj[`answer_${i}`];

//       // Make First Option Selected // by default first one cheaked
//       if (i === 1) {
//         radioInput.checked = true;
//       }

//       // Create Label (html element) contains the choices text
//       let theLabel = document.createElement("label");

//       // Add For Attribute for is like id in radio button but in label we use  "htmlFor"
//       //This allows users to click on the label to select the associated radio button
//       //The duplication of the unique value (answer_${i}) in both the id and for attributes ensures that the label is correctly associated with the corresponding radio button.
//       theLabel.htmlFor = `answer_${i}`;

//       // Create Label Text >> 1- create text node
//       let theLabelText = document.createTextNode(obj[`answer_${i}`]);

//       // Add The Text To Label >> 2- append to <label>
//       theLabel.appendChild(theLabelText);

//       //---------------------------------------

//       // Add Input + Label To Main Div
//       mainDiv.appendChild(radioInput); // check circles
//       mainDiv.appendChild(theLabel); // label or text of the choice

//       // Append All Divs To Answers Area
//       answersArea.appendChild(mainDiv);
//     }
//   }
// }

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    let answers = [
      obj["answer_1"],
      obj["answer_2"],
      obj["answer_3"],
      obj["answer_4"]
    ];

    // Shuffle the answers array using Fisher-Yates algorithm
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = answers[i - 1];

      if (i === 1) {
        radioInput.checked = true;
      }

      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(answers[i - 1]);
      theLabel.appendChild(theLabelText);

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  
  let answers = document.getElementsByName("question"); //select all how name in html question // radioInput.name = "question"; radio inputs
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) { //loop through all the choices
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}


function showResults(count) {
  let theResults;
  if (currentIndex === count ) {
    console.log("question is finished");
  
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    

    
    theResults = `${rightAnswers} From ${count}`;
    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}






















