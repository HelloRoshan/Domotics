import React from 'react';
import axios from 'axios';


// function changeSwitch(switchId, state) {
//     return axios.put(SERVER_URL + '/switches' + switchId, {
//         state: state
//     });
// }

// function getRep(){
//     axios.get('http://192.168.0.105:5000/api/switches')
//     .then((response)=> {
//         console.log(response.data);
//     })
// }
// getRep();

// function puRep(){
//     axios.put('http://localhost:3000/', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
// })

//     .then(function (response) {
//         console.log(response);
//     })
// }
// puRep();

export class Voice extends React.Component{
    constructor(){
        super();

        this.state = {
            quote: ""
        };

        this.getQuote = this.getQuote.bind(this);

    }
 
    getQuote() {
        var _self = this;

        axios.get('http://api.github.com/zen')
            .then((response) => {
                _self.setState({
                    quote: response.data
                });
            });
    }

    render(){
        console.log(this.state.quote);  
        return(
            
            <div>
                <div className="fa">
                   <a  onClick = {this.getQuote}> <i className="fa fa-microphone fa-5x" aria-hidden="true"></i></a>
                </div>
                {/* <input type="text"/> */}
                {this.state.quote}
                    
            </div>       
        );
    }
}