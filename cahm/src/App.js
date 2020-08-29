import React from 'react';
import logo from './logo.svg';
import './scss/styles.scss';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/join/Join.js";
import Chat from "./components/chat/Chat.js";

function App() {
  return (
    <div className="App">
      
          <Router>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
          </Router>
      
    </div>
  );
}

export default App;


/*
Cards against humanity
multiplayer(online)
chat, cam and audio functionality
standard rules
cards againast humanity api
select expantion (optional)
*/