import React, { Component } from 'react';

import { Uiboard } from './component/Uiboard';
import { Header } from './component/Header';
import { Sidebar } from './component/Sidebar';
import { Voice } from './component/Voice';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2">
            <Sidebar />
          </div>
          <div className="col-sm-10">
            <div className="row"> 
              <Header />  
              <div className="col-sm-10">
                <Uiboard />
              </div>  
              <div className="col-sm-2 div-background">
                <Voice />
              </div>
            </div>   
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
