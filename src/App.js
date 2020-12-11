import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import './Widgets/Widgets.css'
import Widgets from './Widgets/Widgets';
import { connect } from 'react-redux';
import {setUserAuthInfo,setIsAuth} from './redux/authentication'
import { useEffect } from 'react';
import db from './firebase';

function App(props) {
  return (
    <div className="app">
      <Sidebar/>
        <Feed/>
      <Widgets/>
    </div>
  );
}


export default App;
