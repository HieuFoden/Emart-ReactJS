import './App.scss';
import Navbar from './component/Navbar/Navbar';
import { Outlet } from "react-router-dom"; // Outlet : nested route. La phan component se thay doi
import _ from 'lodash';

function App() {

  return (
    <div className='app-container'>
      <div className='header-container'>
        <Navbar />
      </div>
      <div className='main-container'>
        {/* <Home /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;