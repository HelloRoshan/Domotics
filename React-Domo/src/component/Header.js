import React from 'react';

export class Header extends React.Component {
    render(){
        return(
            <div>
                <nav className="nav nav-tabs">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">Dashboard</a>
                        </div>
                        {/* <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="google.com">Log out</a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </nav> 
            </div>
        );
    }    
}