'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {

  //splitting the guess and solution answers into arrays
  let guessarray = guess.split('')
  let solutionarray = solution.split('')

  //creating variables to count correct answers
  let correctletterlocations = 0
  let correctletter = 0

  //for loop to determine if guessarry has any letters in the correct postion
  for(let i = 0 ; i<solutionarray.length; i++){
    if(guessarray[i] === solutionarray[i]){
      correctletterlocations ++
      solutionarray[i] = null
    }
  }

  //for loop to determine if guessarray has any correct letters only
  for(let i = 0; i <solutionarray.length; i++){
    let indextarget = solutionarray.indexOf(guessarray[i])
  


    

    if(indextarget != -1){
      correctletter++
      solutionarray[indextarget] = null
    }
  }



  return `${correctletterlocations}-${correctletter}`

}



const mastermind = (guess) => {
  
  //Define a test solution: Helpful suggestion: while developing you can set a default solution for you to test against. At the top of mastermind(), simply set const solution = 'abcd'; as a global variable.
  


  //if the guess you passed in equals the solution, return 'You guessed it!'
  //else call generate hint and pass it the guess
  if(guess === solution){

    return "You guessed it!"
    
  }
  else if(board.length === 10){
    return "You lost!"
  }
  else{
    let hint = generateHint(guess)
    board.push(guess + " " + hint)
  }



}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    if(guess === solution){
      console.log(`You won!: ${guess} = ${solution}`)
    }else if(board.length === 10){
      console.log(`You lost!: ${solution}`)
    }else{
      getPrompt();
    }
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}