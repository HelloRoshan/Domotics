import React from 'react';
// import axios from 'axios';

// const SERVER_URL = 'http://localhost:3000';

export class Uiboard extends React.Component {
    constructor() {
        super();
        this.state = {
            switches: [
                {
                    id: 1,
                    label: "Switch 1",
                    state: true
                },
                {
                    id: 2,
                    label: "Switch 2",
                    state: false
                }
            ]
            
        };
        // for(let i = 0; i < this.state.switches.length; ++i) {
        //     const mSwitch = this.state.switches[i];
        //     changeSwitch(mSwitch.id, mSwitch.state);
        // }
        this.handleChange = this.handleChange.bind(this);
        // this.changeSwitch = this.changeSwitch.bind(this);
    }
    // changeSwitch(){
    //     var _self = this;
    //     axios.put(SERVER_URL + '/switches' + switches.id, {
    //         state: state
    //     })
    // }
    handleChange(id) {
        console.log(id);
        let index = id - 1;
        let newSwitches = this.state.switches.slice();
        newSwitches[index].state = !newSwitches[index].state;
        // changeSwitch(newSwitches[index].id, newSwitches[index].state);
        this.setState({
            switches: newSwitches
        });

    }

    render() {

        var mapped = this.state.switches.map((data) => {
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
                            <span className="slider round" data-on="Active" data-off="Inactive"></span>
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
                <h2>Switch!!</h2>
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
                <p>{this.state.qutoe}</p>
            </div>
        );
    }
}