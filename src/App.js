import './App.scss';
import Navbar from './component/Navbar/Navbar';
import { Outlet } from "react-router-dom"; // Outlet : nested route. La phan component se thay doi
import _ from 'lodash';
import { TailSpin } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.isLoading ?
        <div classname='loading-container'>
          <TailSpin
            height="80"
            width="80"
            radius="9"
            color='#1877f2'
            ariaLabel='three-dots-loading'
            wrapperStyle
            wrapperClass
          />
          <div>Loading Data...</div>
        </div>

        :
        <div className='app-container'>
          <div className='header-container'>
            <Navbar />
          </div>
          <div className='main-container'>
            {/* <Home /> */}
            <Outlet />
          </div>
        </div>}
    </>
  );
}

export default App;