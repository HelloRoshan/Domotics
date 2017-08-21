    import React from 'react';
import axios from 'axios';

// const SERVER_URL = 'http://localhost:5000';
const SERVER_URL = 'http://192.168.0.105:5000';

//state sent 
function changeSwitch(id, state) {
    return axios.patch(SERVER_URL + '/api/switches/' + id, {
        // axios.patch(`${SERVER_URL}switches`, {
        'state': state
    }).then((response) => {
        console.log(response.data);
    });
}


export class Uiboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switches: [],
            date: new Date()
        };
        // for(let i = 0; i < this.state.switches.length; ++i) {
        //     const mSwitch = this.state.switches[i];
        //     changeSwitch(mSwitch.id, mSwitch.state);
        // }

        this.getRep = this.getRep.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillMount(){
        this.getRep();
    }

    //setting timer for rendering
    tick() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        console.log(this.state.switches);
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
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
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
            </div>
        );
    }
}