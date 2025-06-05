import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import PrivateRoute from '../shared/privateRoutes/PrivateRoute';

import MainPage from '../pages/mainPage/MainPage';
import Authorization from '../pages/authorization/ui/Authorization';
import VideoPage from '../pages/videoPage/VideoPage';
import Neuronet from '../pages/neuronet/Neuronet'
import Neuronet1 from '../pages/neuronet/Neuronet1'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/MainPage' element={<PrivateRoute/>}>
          <Route  path='/MainPage' element={<MainPage/>}/>
        </Route>
        <Route  path='/' element={<PrivateRoute/>}>
          <Route  path='/' element={<MainPage/>}/>
        </Route>
        <Route  path='/Neuronet' element={<PrivateRoute/>}>
          <Route  path='/Neuronet' element={<Neuronet/>}/>
        </Route>
        <Route  path='' element={<PrivateRoute/>}>
          <Route  path='' element={<MainPage/>}/>
        </Route>
        <Route  path='/login' element={<Authorization/>}/>

        <Route  path='/' element={<PrivateRoute/>}>
          <Route  path='/video' element={<VideoPage></VideoPage>}/>
        </Route>

        <Route  path='/Neuronet1' element={<PrivateRoute/>}>
          <Route  path='/Neuronet1' element={<Neuronet1/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
