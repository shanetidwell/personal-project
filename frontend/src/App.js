import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Navbar from './components/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
         {this.props.location.pathname !== "/" && <Navbar/>}  
       {routes}
      </div>
    );
  }
}

export default App;
