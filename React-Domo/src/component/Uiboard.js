import React from 'react';
import $ from 'jquery';

export class Uiboard extends React.Component{
    constructor() {
        super();
        // this.state = {
        //     switchA: "",
        //     switchB: ""
        // }

        // function SwitchSatus() {
        //     var checkboxA;
        //     var checkboxB;

            (function() {
                $(document).ready(function() {
                    $('.switch input').on('change', function() {
                        var isChecked = $(this).is(':checked');
                        var selectedData;
                        var $switchLabel = $('.slider.round');
                        console.log('isChecked:' + isChecked);

                        if(isChecked){
                            selectedData = $switchLabel.attr('data-on')
                        }
                        else{
                            selectedData = $switchLabel.attr('data-off');
                        }

                        console.log('Selected data:' + selectedData);
                    });
                    //params ($selector, boolean)
                    function setSwitchState(el, flag){
                        el.attr('checked', flag);
                    }
                    //Usage
                    setSwitchState($('.switch input'), true);
                })
            })();


        //     this.setState({
        //         switchA: checkboxA,
        //         switchB: checkboxB  
        //     })
        // }
    }
    
    render(){
        return(
        <div>
            <h2>Switch!!</h2>
             {/* <ul className="tg-list"> 
                <li className="tg-list-item">
                    <h4>Switch A</h4>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"> </span>
                    </label>
                </li >
                <li className="tg-list-item">
                    <h4>Switch B</h4>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>           
                </li>
            </ul>     */}
            <table className="table table-striped">
                <thead>
                        <tr>
                            <th><h4>Name</h4></th>
                            <th><h4>Status</h4></th>
                        </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>
                                Switch A
                            </td>
                            <td>
                                <label className="switch">
                                    <input className="switch-input" type="checkbox" value="on"/>
                                    <span className="slider round" data-on="Active" data-off="Inactive"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Switch B
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                            </td>
                        </tr>

                </tbody>
            </table>
        </div>
        
        );
    }
}