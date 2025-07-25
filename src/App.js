import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import {Route,Routes} from 'react-router-dom'
import StudyPlanner from './components/studyPlanner';
import EmotionSupport from './components/EmotionSupport';
import Welcome from './components/Welcome';
import DashBoard from './components/DashBoard';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/studyplanner' element={<StudyPlanner/>}/>
        <Route path='/emotionsupport' element={<EmotionSupport/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
