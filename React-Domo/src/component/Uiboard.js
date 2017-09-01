import React from 'react';
import axios from 'axios';
import annyang from 'annyang';
`s`
const SERVER_URL = 'http://192.168.137.1:5000';
// const SERVER_URL = 'http://192.168.10.20:5000';

//state sent 
function changeSwitch(id, state) {
    return axios.patch(SERVER_URL + '/api/switches/' + id, {
        // axios.patch(`${SERVER_URL}switches`, {
        'state': state
    }).then((response) => {
        response.data;
        console.log(response.data);
    });
}


export class Uiboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switches: [],
            date: new Date(),
            color: "black"
        };

        this.getRep = this.getRep.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this .activateAnnyang = this.activateAnnyang.bind(this);
        // this.changeSwitch = this.changeSwitch.bind(this);
    }
    
    //fetching switches from the server
    getRep() {
    axios.get(SERVER_URL +'/api/switches')
        .then((response) => {
            console.log(response.data);
            this.setState({
                switches: response.data
            })
        })
    }

    
    //on change function    
    handleChange(id) {
        console.log(id);
        let index = id - 1;
        let newSwitches = this.state.switches.slice();
        newSwitches[index].state = !newSwitches[index].state;
        changeSwitch(newSwitches[index].id, newSwitches[index].state);
        this.setState({
            switches: newSwitches
        });

    }

    // Main function for annyang speech recognition .
    activateAnnyang() {
        annyang.debug();
        annyang.addCallback('soundstart', function() {
            console.log('listening');
        });
        var color = this.state.color;
        var availableSwitches = this.state.switches.slice();
        var command = {
            '(switch) :switchName :state' : function(switchName, state) {
                 if(state === 'on'){
                    state = true;
                }
                if(state === 'off' | state === 'of'){
                    state = false;
                }
                // if (name === 'be'){
                //     name = 'b';
                // }

                if (switchName === 'two' | switchName === 'to'){
                    switchName = 'be';
                }

                if (switchName === 'one'){
                    switchName = 'a';
                }

                if(state === true | state === false) {
                    console.log(switchName + " to " + state);
                   
                    availableSwitches.map((data, index) => {
                        // console.log(index);
                        if(data.name === switchName && data.state !== state) {
                            console.log(data.state);
                            
                            changeSwitch(data.id, state).then((data) => {
                                // console.log(data);
                                this.setState({
                                    switches: availableSwitches
                                })
                                
                                window.location.reload()
                                console.log(this.state.switches)
                                return data;
                            });
                        } else {
                            console.log("switch name not matched or position matched!");
                            color = "black";
                            this.setState({
                                color
                            })
                        }
                });
                } else {
                    console.log("state not matched!");
                }
                
                // console.log(state);
            }.bind(this)
        }
        this.setState({
            switches: availableSwitches
        });
        annyang.addCommands(command);
        annyang.start({ autoRestart: false, continuous: false });

        annyang.addCallback('result', function() {
            color = "black";
            this.setState({
                color
            })
        }.bind(this));
        
        color = "red";
        this.setState({
            color
        })
    }



    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillMount(){
        this.getRep();
    }

//    setting timer for rendering
    tick() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        console.log(this.state.switches);
        var mapped = this.state.switches.map((data) => {
                                // {console.log(data.state)}
            return (
                <tr key={data.id}>
                    <td>{data.label}</td>
                    <td>
                        <label className="switch">
                            <input
                                className="switch-input" type="checkbox"
                                checked={data.state}
                                onChange={this.handleChange.bind(this, data.id)}
                            /> 
                            {/* () => and bind creates a new function */}
                            {/* onChange = {() => this.handleChange(data.id)} */}
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>
                        {data.state === true ? 'Active' : 'Inactive'}
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div className="container" style={{ marginTop: '85px' }}>
                    {/* card */}
                    <div className="row">
                        <div className="col-sm-8">
                            <h2>Switch</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th><h4>Name</h4></th>
                                        <th><h4>Status</h4></th>
                                        <th><h4>State</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mapped}
                                </tbody>
                            </table>
                            
                        </div>
                        <div className="sol-sm-3">
                            <div>
                                <div>
                                    {console.log(this.state.color)}
                                    <a href="#" className={(this.state.color === "black")? "blackMic" : "redMic"} onClick = {this.activateAnnyang.bind(this)}> <i className="fa fa-microphone fa-5x" aria-hidden="true"></i></a>
                                </div>
                            </div> 
                        </div>
                        {/*<div className="sol-sm-1">
                            <h4 className="h4st"> {this.state.date.toLocaleTimeString()} </h4>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    }
}