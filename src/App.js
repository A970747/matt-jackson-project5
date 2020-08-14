import React, { Component } from 'react';
// import axios from 'axios';
import dictionary from './dictionary';
// import DisplayDefs from './DisplayDefs'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dictionaryLength: '',
      definitionList: [],
      correctWords: [],
      missedWords: [],
      rightWrong: null,
      queryWord: '',
      userInput: '',
    }
  }

  dictionaryLength = () => {
    this.setState({
      dictionaryLength: dictionary.length,
  }, () => {console.log(this.state.dictionaryLength)})
  }

  setQuery = () => {
    this.setState({
        queryWord: dictionary[Math.floor(Math.random() * dictionary.length)]
    }, () => {console.log(this.state.queryWord)})
}

componentDidMount() {
    this.setQuery();
    this.dictionaryLength();
}

  nextWord = () => {
    this.setState({
      userInput: '',
      rightWrong: true,
    }, () => {console.log(this.state.rightWrong)})
    this.setQuery();
  }

  handleChange = (event) => {
    if (event.currentTarget.value.includes(' ')) {
      event.currentTarget.value = event.currentTarget.value.replace(/\s/g, '');
    }
    this.setState({
      userInput: event.target.value.toLowerCase(),
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.userInput === this.state.queryWord
    ? 
      this.nextWord()
    : 
    this.setState({
      userInput: '',
      rightWrong: false,
    }, () => {console.log(this.state.rightWrong)})
  }

  handleQuit = (event) => {
    event.preventDefault();

  }

  render() {
    return (
      <div className="App">
        {/* <DisplayDefs /> */}
        <form className='flexForm' action="submit">
          <label htmlFor="answer">Guess the word!</label>
          <input onChange={this.handleChange} value={this.state.userInput} type="text" id="answer" placeholder={`${this.state.queryWord} - word is ${this.state.queryWord.length} letters long`}/>
          <button onClick={this.handleSubmit} name="check-answer" value="check-answer" > Check Answer</button>
          <button onClick={this.handleQuit} name="give-up" value="give-up"> Give up</button>
        </form>
        {
          this.state.rightWrong === true ? <h3>correct!</h3> : <h3>incorrect!</h3>
        }
      </div>
    );
  }
}


export default App;