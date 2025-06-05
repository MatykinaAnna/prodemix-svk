import Header from "../../widgets/header/ui/header"
import styles from './MainPage.module.scss'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { useState, useContext, useEffect } from "react";
import Dropdawn from "../../features/dropdawn/ui/dropdawn";
import moment, { Moment } from 'moment'
import 'moment/locale/ru';
import classNames from 'classnames'
import MainTable from "../../widgets/mainTable/ui/mainTable";
import { authContext } from "../../shared/contexts/AuthContext";
import { DataForListReportsVideo, DataApiValidate } from "../../shared/interfaces";
import {loadDepartments, loadTmcType, validate, refreshToken} from "../../shared/functions"

const MainPage = () => {

  function getEndDate(date: string) {
    let d = new Date(date)
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    return datestring
  }

  const [startDate, setStartDate] = useState<Moment |null>(moment().subtract(0, 'years'));
  const [endDate, setEndDate] = useState<Moment |null>(moment());
  const [focusedInput, setFocusedInput] = useState(null);
  const [departments, setDepartments] = useState([])  
  //@ts-ignore
  const {setAuthData, auth} = useContext(authContext);
  const [keyForDropdown, setKeyForDropdown] = useState(false)
  const [keyForDropdown1, setKeyForDropdown1] = useState(false)
  const [keyForTable, setKeyForTable] = useState(0)

  const [arrayTmcTypes, setArrayTmcTypes] = useState<{id: number, name: string, check: boolean, objectId?: number}[]>([])
  const [flagTmcTypes, setFlagTmcTypes] = useState(false)
  const [arrayUserDepartments, setArrayUserDepartments] = useState<{id: number, name: string, parrentId?: number, parrentName?: string, check: boolean}[]>([])
  const [flagUserDepartments, setFlagUserDepartments] = useState(false)

  const [finallyLoadDepartments, setFinallyLoadDepartments] = useState(false)
  const [finallyFinallyTmcType, setFinallyTmcType] = useState(false)
  
  const [dataForListReportsVideo, setDataForListReportsVideo] = useState<DataForListReportsVideo>(
    {
      endDate: null,
      listDepartmentId: [-1],
      listTmcId: [-1],
      startDate: null
    }
  )

  const userName = window.localStorage.getItem('userName')

  
  useEffect(()=>{
    //validate()
    toLoadDepartments()
  }, [])

  function toLoadDepartments(){
    let departments = loadDepartments()
    //@ts-ignore
    departments.then((data) => {
      if (data.error == 401) {
        console.log('восстановить токен')
        toRefreshToken()
      } else if (data.error == 400) {
        console.log('Пользователь не авторизован')
      } else if (data.error == 500)  {
        console.log('Произошла ошибка при обработке запроса')
      }  else {
        console.log('запросить данные дальше')
        setFinallyLoadDepartments(true)
        setArrayUserDepartments(data)
        setKeyForDropdown(true)
      } 
    })
  }

  function toTmcType(){
    let tmcType = loadTmcType()
    tmcType.then((data) => {
      if (data.error === undefined){
        setFinallyTmcType(true)
        let data1 = data
        data1.push({
          objectId: 5,
          name: "Без типа работ",
          check: true
        })
        setArrayTmcTypes(data)
        setKeyForDropdown1(true)  
      } else if (data.error == 401) {
        console.log('востановить токен')
      } else if (data.error == 400) {
        console.log('Пользователь не авторизован')
      } else if (data.error == 500)  {
        console.log('Произошла ошибка при обработке запроса')
      }
    })
  }

  function toRefreshToken(){
    console.log({refreshToken: window.localStorage.getItem('refreshToken')})
    let toRefreshToken = refreshToken()
    //@ts-ignore
    toRefreshToken.then((data) => {
      if (data.error === undefined){
        window.localStorage.setItem('refreshToken', data.refreshToken)
        window.localStorage.setItem('accessToken', data.accessToken)
        setTimeout(()=>{
          toLoadDepartments()
        }, 1000)
        
      } else if (data.error == 401) {
        console.log('Invalid refresh token')
        window.localStorage.setItem('accessToken', 'null') 
        window.location.reload();
      } else if (data.error == 400) {
        console.log('Invalid token')
      } else if (data.error == 500)  {
        console.log('Произошла ошибка при обработке запроса')
      }
        
    })
  }

  useEffect(()=>{
    if (finallyLoadDepartments){
      toTmcType()
    }
  }, [finallyLoadDepartments])
  
  setTimeout(()=>{
    if (document.getElementById('s_id') !== null){
      //@ts-ignore
      document.getElementById('s_id').placeholder = 'дд/мм/гггг'
    }
    if (document.getElementById('e_id') !== null){
      //@ts-ignore
      document.getElementById('e_id').placeholder = 'дд/мм/гггг'
    }
  }, 100)

  const handleChangeDepartment = (value: {
    id: number,
    name: string,
    parrentId?: number,
    parrentName?: string,
    check: boolean
  }[]) => {
    let data = dataForListReportsVideo
    data.listDepartmentId = []
    value.forEach((item)=>{
      if (item.check){
        data.listDepartmentId.push(item.id)
      }
    })
    setDataForListReportsVideo(data)
    setArrayUserDepartments(value)
  }

  const handleChangeTypeWork = (value: {
    id: number,
    name: string,
    parrentId?: number,
    parrentName?: string,
    check: boolean
  }[]) => {
    let data = dataForListReportsVideo
    data.listTmcId = []
    value.forEach((item)=>{
      if (item.check){
        data.listTmcId.push(item.id)
      }
    })
    setDataForListReportsVideo(data)
    setArrayTmcTypes(value)
  }

  let video = {
    id: 1,
    poster: 'https://ik.imagekit.io/ikmedia/example_video.mp4/ik-thumbnail.jpg',
    url: 'https://ik.imagekit.io/ikmedia/example_video.mp4'
  }

  const options = {
      controls: true,
      poster: video.poster,
      sources: [{ src: video.url }]
  }


  function toShowInfoForTable(){
    if (startDate!== null){
      dataForListReportsVideo.startDate = startDate.format(
        "YYYY-MM-DD")
    }
    if (endDate!== null){
      dataForListReportsVideo.endDate = endDate.format(
        "YYYY-MM-DD")
    }
    setKeyForTable(keyForTable+1)
  }

  function getJSessionId(){
    var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
    if(jsId != null) {
        if (jsId instanceof Array)
          //@ts-ignore
            jsId = jsId[0].substring(11);
        else
         //@ts-ignore
            jsId = jsId.substring(11);
    }
    return jsId;
}

  return (
    <>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Header
            supportMsg={'Контакты технической поддержки: help@prodimex-agro.ru +7-473-206-56-03 с 8:00 до 20:00, пн.-вс'}
            downloadApp={true}
            iconExit={true}
            email={String(userName)}
            //email={auth.data}
          />
          <div style={{flexGrow: '1'}} className={styles.wrapperBody}>

            <div className={styles.filters} id="wrapperFilters">
              <div className={styles.datePickerWrapper}>
                  <DateRangePicker
                    isOutsideRange={() => false}
                    startDate={startDate}
                    startDateId="s_id"
                    endDate={endDate}
                    endDateId="e_id"
                    //@ts-ignore
                    onDatesChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate); }}
                    focusedInput={focusedInput}
                    //@ts-ignore
                    onFocusChange={e => setFocusedInput(e)}
                    displayFormat="DD.MM.YYYY"
                  />
                  {/* <div className={styles.iconCalendar}></div> */}
              </div>

              <div className={styles.dropdawn1} >
                {keyForDropdown && <Dropdawn {...{
                    placeholder: "Филиал",
                    //по умолчанию выбраны все доступные пользователю позиции -- нет
                    //autoChosen: arrayUserDepartments.map(item=>item.id),
                    autoChosen: dataForListReportsVideo.listDepartmentId,
                    list: arrayUserDepartments,
                    onChange: handleChangeDepartment, 
                    isChoosingAll: true,
                    isChoosingAllValue: true
                }} />}
              </div>

              <div className={styles.dropdawn2} >
                  {keyForDropdown1 && <Dropdawn  {...{
                    placeholder: "Тип ТМЦ",
                    //по умолчанию выбраны все доступные пользователю позиции -- нет
                    //autoChosen: arrayTmcTypes.map(item=>item.id),
                    autoChosen: dataForListReportsVideo.listTmcId,
                    list: arrayTmcTypes,
                    onChange: handleChangeTypeWork,
                    isChoosingAll: true,
                    isChoosingAllValue: true
                    
                }} />}
              </div>
              
              <div>
                <button className={styles.btn_show} onClick={toShowInfoForTable}>Показать</button>
              </div>
            </div>
            {keyForTable > 0 && <div style={{marginTop: '20px', flexGrow: '1'}} key={keyForTable} >
              { keyForDropdown && keyForDropdown1 && <MainTable {...{
                dataForTable: dataForListReportsVideo,
                listDepartmentId: arrayUserDepartments.map(item=>item.id),
                listTmcId: arrayTmcTypes.filter((item)=>{
                  return (item.id && item.check)
                }).map(item=>item.id),
                withNull: arrayTmcTypes[arrayTmcTypes.length-1].check
                }}/>}
            </div>} 
            { keyForTable == 0 && 
              <div className={styles.manual}>Выберите интервал дат, филиал, тип работ и нажмите «Показать»</div>
            }   
          </div>
        </div>
    </>

    

  )
}

export default MainPage

