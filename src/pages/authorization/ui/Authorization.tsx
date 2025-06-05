import Header from "../../../widgets/header/ui/header"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styles from './Authorization.module.scss'
import { useContext, useEffect, useState } from "react";
import moment from 'moment'
import 'moment/locale/ru';
import classNames from 'classnames'
import { authContext } from "../../../shared/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toLogin } from "../model/thunks";
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {DataApiLogin} from '../../../shared/interfaces' 

import {baseUrl} from '../../../shared/variable'
import { error } from "console";

const Authorization = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('');
    async function toLogin(){
        let data1 = {
            username: login,
            password: password
        }

        const response = await fetch(
            `${baseUrl}/api/Auth/login`,
            {
              method: 'post',
              body: JSON.stringify(data1),
              headers: {
                //'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                'Content-type':'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
              }
            }
          )
          .then(async response => {
            if(!response.ok)
            {
                if (response.status == 401) {
                  
                }

                const errorData = await response.json(); 
                throw new Error(`${errorData.message}`);
            }

              return await response.json(); 

            
          })
          .catch(error => {
            alert(error)
           })
          .then((data: DataApiLogin) => {
            if (data !== undefined){
                if (data.tokenResponse.accessToken !== undefined){
                    window.localStorage.setItem('accessToken', `${data.tokenResponse.accessToken}`)
                    window.localStorage.setItem('userName', `${data.userResponse.userName}`)
                    window.localStorage.setItem('refreshToken', `${data.tokenResponse.refreshToken}`)
                    navigate(`/MainPage`);
                }
            }
             
          })
        
          
          
    }

    async function handleKeyPress(event: any) {
      if(event.key === 'Enter'){
        toLogin()
      }
    }



  return (
    <div className={styles.mainWrapper}>
        <Header 
            supportMsg={''}
            downloadApp={false}
            iconExit={false}
            email=""
        />
        <div className={styles.entryForm}>
            <div style={{width: '600px'}}>
                <div style={{fontSize: '30px', marginBottom: '10px'}}>Вход</div>
                <div style={{fontSize: '18px'}}>Для входа укажите имя пользователя и пароль.</div>
                <hr />
                <div style={{width: '595px', marginBottom: '10px'}}>
                    <span style={{fontWeight: 'bold', marginRight: '30px'}}>Email</span>
                    <input type="text" onChange={(e)=>{setLogin(e.target.value)}} />
                </div>
                <div style={{width: '595px'}}>
                    <span style={{fontWeight: 'bold', marginRight: '11px'}}>Пароль</span>
                    <input onKeyUp ={handleKeyPress} type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                {errorMsg && <div className={styles.errorMsg}>Не верно указан логин или пароль</div>}
                <div style={{marginTop: '15px', marginLeft: '77px'}}>
                    <button onClick={()=>toLogin()}>Войти</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Authorization
