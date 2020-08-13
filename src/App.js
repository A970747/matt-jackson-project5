import React, { Component } from 'react';
// import axios from 'axios';
// import dictionary from './dictionary';
// import Form from './Form'
import DisplayDefs from './DisplayDefs'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definitionList: [],
      testingWordList: [],
      testingDefinitionList: [],
      queryWord: '',
    }
  }


  // handleChange = (event) => {
  //   this.setState({
  //     userInput: event.target.value
  //     }, () => {
  //       always one input behind.
  //       console.log(this.state.userInput);
  //       })
  // }

  // handleClick = (event) => {
  //   event.preventDefault();
  //   const dbRef = firebase.database().ref();
  //   dbRef.push(this.state.userInput);
  //   this.setState({
  //     userInput: ''
  //   })
  // }

  render() {
    return (
      <div className="App">
        <DisplayDefs />
        <form action="submit">
          <label htmlFor="answer">Add a book to your bookshelf</label>
          <input onChange={this.handleChange} value={this.state.userInput} type="text" id="answer"/>
          {/* <button onClick={this.handleClick} > Give up</button> */}
        </form>
      </div>
    );
  }
}



export default App;