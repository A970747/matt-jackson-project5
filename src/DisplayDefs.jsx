/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import axios from 'axios';

class DisplayDefs extends Component {
    constructor(){
        super();
        this.state = {
            queryWord: '',
            definitionArray: [],
        }
    }
    
    //watch for the props to change, if the queryProp changes then call the set definition function
    //so we get the related definitions for our new word
    componentDidUpdate(prevProps) {
        if (prevProps.queryProp !== this.props.queryProp) {
            this.setState({
                queryWord: this.props.queryProp,
            })
            this.setDefinitions();
        }
    }

    //main axios call to get an array of definitions based on our queryProp word.
    setDefinitions = () => {
        axios({
            url: `https://www.dictionaryapi.com/api/v3/references/sd3/json/${this.props.queryProp}`,
            method: 'GET',
            dataType: 'json',
            params: {
                key: '2d1e7e13-d6a9-4925-80d7-eb9a0228d59f',
            }
        }).then( (response) => {

            //Sometimes the dictionary will return only a root. Here we check to see if the word, as is, has one or more definitions.
            // if it matches, filter our reponse and return only the definitions that match exactly.
            //The hwi.hw keys often have multiple * characters in them, we use regex to remove them
            let filteredArray = response.data.filter((each) => {
                if(each.hwi.hw.replace(/\*/g,'') === this.state.queryWord) {
                    return each
                }
            })
            this.setState({
                definitionArray: filteredArray
            })
            
            //if there are no exact matches in the previous function the array length will remain at 0
            //when that happens we need to check for a "base" definition that we can use
            //we confirm that the base is related to our original word by checking to see if the word is a "stem" of the base word, eg. running is a stem of run (the base word)
            //also, double check that our original word doesn't match any of the original definitions, just in case
            //filter the array to only include those for the new base
            if(filteredArray.length === 0) {
                filteredArray = response.data.filter((each) => {
                    if (each.meta.stems.includes(this.state.queryWord) === true && each.hwi.hw.replace(/\*/g,'') !== this.state.queryWord) {
                        return each
                    }
                })
                //this will set the word we are guessing to the base form.
                //this is necessary because otherwise the given definitions may not match the word well.
                this.props.rebaseWord(filteredArray[0].hwi.hw.replace(/\*/g,''));
                this.setState({                    
                    queryWord: filteredArray[0].hwi.hw.replace(/\*/g,''),
                    definitionArray: filteredArray
                })
            }
        })
        //if the above methods don't work, or we don't find a definition for the initial word
        //go back to the parent and get a new word and start again.
        .catch(() => this.props.catchFunction);
    }

    render() {
        return(
            <div>
                {
                    //here we are returning each of the arrays of definitions we ended up with after filtering, and setting the "type" of the definition as the
                    //header on a list to be displayed on the main page.
                    //this could have been cleaned up, sometimes a word has multiple of the same "type" of definition because it can be defined in multiple ways.
                    //eg, you will see noun twice on occasion.
                    this.state.definitionArray.map((each,index) => {
                        return (
                        <>
                        <h3>{each.fl}</h3>
                        <ul>
                        {each.shortdef.map((s,index)=>{
                            return <li className="listStyle"><p>{s}</p></li>
                        })}
                        </ul>
                        </>
                        )                       
                    })
                }
            </div>
        )
    }
}

export default DisplayDefs;