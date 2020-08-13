import React, { Component } from 'react';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            userSelection: "",
        }
    }
    render() {
        return(
            <form action="">
                <label htmlFor="answer">Pick a group to investigate</label>
                <select onChange={this.userSelection} name="answer" id="answer">
                    <option value="">Select one</option>
                    <option value="ministryOfMagic">Ministry of Magic</option>
                    <option value="dumbledoresArmy">Dumbledore's Army</option>
                    <option value="orderOfThePhoenix">Order of the Phoenix</option>
                </select>

                <button onClick={(event) => this.props.userChoice(event, this.state.userSelection)}>Run</button>
            </form>
        )
    }
}

export default Form;

// <form action="submit">
// <label htmlFor="newBook">Add a book to your bookshelf</label>
// <input onChange={this.handleChange} value={this.state.userInput} type="text" id="newBook"/>
// <button onClick={this.handleClick} >Add Book</button>
// </form>