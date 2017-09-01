import React from 'react';

export class Header extends React.Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                    <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Domotics</a>

                    <div className="navbar-collapse collapse" id="navbarsExampleDefault" aria-expanded="false">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                        </ul>
                    </div>          
                </nav>
            </div>
    
             
        );
    }    
};

