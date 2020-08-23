import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import logo from './logo.svg'
import './App.css'
import Home from './sites/home/Home'
import Party from './sites/party/Party'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <p>
//           Pitchanai
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/party" component={Party} />
      </Switch> 
    )
  }
}

export default App
