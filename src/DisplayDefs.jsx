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
    
    componentDidUpdate(prevProps) {
        if (prevProps.queryProp !== this.props.queryProp) {
            this.setState({
                queryWord: this.props.queryProp,
            })
            this.setDefinitions();
        }
    }

    setDefinitions = () => {
        axios({
            url: `https://www.dictionaryapi.com/api/v3/references/sd3/json/${this.props.queryProp}`,
            method: 'GET',
            dataType: 'json',
            params: {
                key: '2d1e7e13-d6a9-4925-80d7-eb9a0228d59f',
            }
        }).then( (response) => {
            let filteredArray = response.data.filter((each) => {
                if(each.hwi.hw.replace(/\*/g,'') === this.state.queryWord) {
                    return each
                }
            })
            this.setState({
                definitionArray: filteredArray
            })
            
            if(filteredArray.length === 0) {
                filteredArray = response.data.filter((each) => {
                    if (each.meta.stems.includes(this.state.queryWord) === true && each.hwi.hw.replace(/\*/g,'') !== this.state.queryWord) {
                        return each
                    }
                })
                this.props.rebaseWord(filteredArray[0].hwi.hw.replace(/\*/g,''));
                this.setState({                    
                    queryWord: filteredArray[0].hwi.hw.replace(/\*/g,''),
                    definitionArray: filteredArray
                })
            }
        }).catch(() => this.props.catchFunction);
    }

    render() {
        return(
            <div>
                {
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