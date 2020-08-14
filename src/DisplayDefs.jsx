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
            this.setDefinitions();
        })
    }

    componentDidMount() {
        this.setQuery();
    }
    // ${this.state.queryWord}
    setDefinitions = () => {
        axios({
            url: `https://www.dictionaryapi.com/api/v3/references/sd3/json/${this.state.queryWord}`,
            method: 'GET',
            dataType: 'json',
            params: {
                key: '2d1e7e13-d6a9-4925-80d7-eb9a0228d59f',
            }
        }).then( (response) => {
            // console.log(this.state.queryWord)
            // console.log(response.data)
            let filteredArray = response.data.filter((each) => {
                // console.log(each.hwi.hw.replace(/\*/g,''), this.state.queryWord)
                if(each.hwi.hw.replace(/\*/g,'') === this.state.queryWord) {
                    console.log('true')
                    return each
                }
            })
            this.setState({
                definitionArray: filteredArray
            }, () => {
                // console.log(this.state.definitionArray)
            })
            
            if(filteredArray.length === 0) {
                filteredArray = response.data.filter((each) => {
                    if (each.meta.stems.includes(this.state.queryWord) === true && each.hwi.hw.replace(/\*/g,'') !== this.state.queryWord) {
                        console.log('false');
                        return each
                    }
                })
                this.setState({                    
                    queryWord: filteredArray[0].hwi.hw.replace(/\*/g,''),
                    definitionArray: filteredArray
                }, () => {
                    console.log(this.state.queryWord)
                })
            }
            console.log(this.state.queryWord, this.state.definitionArray)
        }).catch(() => this.setQuery)
    }

    render() {
        return(
            <div>
                {
                    this.state.definitionArray.map((each,index) => {
                        return (
                        <>
                        <ul key={index}>{each.fl}</ul>
                        {each.shortdef.map((s)=>{
                            return <li>{s}</li>
                        })}
                        </>
                        )                       
                    })
                }
            </div>
        )
    }
}
//! goes undernear the UL before </>
// {each.shortdef.map((s)=>{
//     return  (
//         <li>{s}</li>
//         )})}
//! ends here

export default DisplayDefs;