import React, { Component } from 'react';
// import axios from 'axios';
import dictionary from './dictionary';
import DisplayDefs from './DisplayDefs'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      definitionList: [],
      correctWords: [],
      missedWords: [],
      rightWrong: null,
      queryWord: '',
      userInput: '',
    }
  }


  setQuery = () => {
    let number = Math.floor(Math.random() * dictionary.length)
    this.setState({
        queryWord: dictionary[number]
    })
  }

  componentDidMount() {
      this.setQuery();
  }

  //handles the user input for state as it's input.
  //includes an if/else statement to deal with people attempting to put in spaces.
  handleChange = (event) => {
    if (event.currentTarget.value.includes(' ')) {
      event.currentTarget.value = event.currentTarget.value.replace(/\s/g, '');
    }
    this.setState({
      userInput: event.target.value.toLowerCase(),
      });
  }

  //used in the handleSubmit function below.
  //push the correctly guessed word into a "correct" array for display further down the page.
  //reset the user input, reset the right/wrong array and get anew word.
  nextWord = () => {
    let correctWords = this.state.correctWords;
    correctWords.push(this.state.queryWord);
    this.setState({
      correctWords: correctWords,
      userInput: '',
      rightWrong: true,
    })
    this.setQuery();
  }

  //handles the check answer button
  // if the answer matches the word we are guessing, awesome! Run the nextWord function to get a new word and push the currect word into a correctly guessed array for display.
  // else, reset the user input and let them know the guess was wrong.
  handleSubmit = (event) => {
    event.preventDefault();
    this.state.userInput === this.state.queryWord
    ? 
      this.nextWord()
    : 
    this.setState({
      userInput: '',
      rightWrong: false,
    })
  }

  //Handles the submit button for "I give up". It takes the word, pushes it into a "missed" array for display on the page,
  //and gets you a new word to guess. Resets the right/wrong array so correct/incorrect doesn't stay on page.
  handleQuit = (event) => {
    event.preventDefault();
    let missedWords = this.state.missedWords;
    missedWords.push(this.state.queryWord);
    this.setState({
      rightWrong: null,
      missedWords: missedWords,
    })
    this.setQuery();
  }

  //occasionally the definitions are such that you need to take the base, or root form of the word as the supplied word is a plural, or doesn't have a useful definition. 
  //In these cases we need to change the word we test against to the base. This takes the child prop and sets it in the apps state.
  rebaseWord = (updatedWord) => {
    this.setState({
      queryWord: updatedWord,
    })
  }

  render() {
    return (
      <div className="App wrapper">
        <h1>Guess the word!</h1>
        <h2>Use the form below to guess the word based on the following definitions:</h2>
        <div className="displayDefBorder">
          <DisplayDefs queryProp={this.state.queryWord} rebaseWord={this.rebaseWord} catchFunction={this.setQuery}/>
        </div>
        <form className='flexForm' action="submit">
          <label htmlFor="answer" className="sr-only">Guessing form</label>
          <input onChange={this.handleChange} value={this.state.userInput} type="text" id="answer" placeholder={`First letter '${this.state.queryWord[0]}' - ${this.state.queryWord.length} letters`}/>
          <button onClick={this.handleSubmit} name="check-answer" value="check-answer" > Check Answer</button>
          <button onClick={this.handleQuit} name="give-up" value="give-up"> Give up</button>
        </form>
        {
          this.state.rightWrong === null ? null : this.state.rightWrong === true ? <h3>Correct!</h3> : <h3>Incorrect, Try again!</h3>
        }
        <div className='listDiv'>
        {
          <div>
            <h4>Correct Answers</h4>
            <ul className='correctList'>
            {this.state.correctWords.map((each)=>{
              return(
                <li><p>{each}</p></li>
              )
            })}
            </ul>
          </div>
        }
        {
          <div>
            <h4>Missed Words</h4>
            <ul className='missedList'>
            {this.state.missedWords.map((each)=>{
              return(
                <li><p>{each}</p></li>
              )
            })}
            </ul>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;