import React, { Component } from 'react';
import dictionary from './dictionary';
import axios from 'axios';

class DisplayDefs extends Component {
    constructor(){
        super();
        this.state = {
            queryWord: '',
            definitionArray: [],
        }
    }

    setQuery = () => {
        this.setState({
            queryWord: dictionary[Math.floor(Math.random() * dictionary.length)]
        }, () => {
            this.getDefinitions();
        })
    }

    componentDidMount() {
        this.setQuery();
    }

    getDefinitions = () => {
        axios({
            url: `https://www.dictionaryapi.com/api/v3/references/sd3/json/${this.state.queryWord}`,
            method: 'GET',
            dataType: 'json',
            params: {
                key: '2d1e7e13-d6a9-4925-80d7-eb9a0228d59f',
            }
        }).then( (response) => {
            console.log(this.state.queryWord)
            console.log(response.data)
            
            let filteredArray = response.data.filter((each) => {
                console.log(each.hwi.hw.replace('*',''), this.state.queryWord)
                if(each.hwi.hw.replace('*','') === this.state.queryWord) {
                    console.log('true')
                    return each
                }
            })
            console.log(filteredArray);
            this.setState({
                definitionArray: filteredArray
            }, () => {
                console.log(this.definitionArray, this.state.queryWord)
            })

            
            if(filteredArray.length === 0) {
                filteredArray = response.data.filter((each) => {
                    if (each.meta.stems.includes(this.state.queryWord) === true && each.hwi.hw.replace('*','') !== this.state.queryWord) {
                        return each
                    }
                })
                console.log(filteredArray);
                this.setState({                    
                    // queryWord: each.hwi.hw.replace('*',''),
                    definitionArray: filteredArray
                }, () => {
                    console.log(this.state.queryWord)
                })
                // this.state.queryWord = each.hwi.hw.replace('*','');
            }
        })
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}

export default DisplayDefs;