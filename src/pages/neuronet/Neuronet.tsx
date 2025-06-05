import { useEffect, useState } from "react";
import React, {Component} from "react";
import Header from "../../widgets/header/ui/header"
import styles from './Neuronet.module.scss'
import { DateRangePicker } from 'react-dates';
import MaskedInput from 'react-maskedinput';
import { Moment } from "moment";
import { DataForListNeuronet, DataApiValidate } from "../../shared/interfaces";
import moment from "moment";
import Dropdawn from "../../features/dropdawn/ui/dropdawn";
import { loadDepartments, refreshToken, sendToAnaliseListNeuronet } from "../../shared/functions";
import NeuronetTable from "../../widgets/neuronetTable/ui/neuronetTable";
import { start } from "repl";

const Neuronet = () => {

    const userName = window.localStorage.getItem('userName')

    const [startDate, setStartDate] = useState<Moment |null>(moment().subtract(0, 'years'));
    //const [startDate1, updateStartDate] =
    const [endDate, setEndDate] = useState<Moment |null>(moment());
    const [focusedInput, setFocusedInput] = useState(null);
    const [keyForDropdown, setKeyForDropdown] = useState(false)
    const [keyForNeuronetTable, setKeyForNeuronetTable] = useState(-1)
    const [arrayUserDepartments, setArrayUserDepartments] = useState<{id: number, name: string, parrentId?: number, parrentName?: string, check: boolean}[]>([])
    const [finallyLoadDepartments, setFinallyLoadDepartments] = useState(false)
    const [keyForTable, setKeyForTable] = useState(0)

    const [dataForListNeuronet, setdataForListNeuronet] = useState<DataForListNeuronet>(
        {
          endDate: null,
          listDepartmentId: [-1],
          startDate: null
        }
      )

    useEffect(()=>{
        //validate()
        toLoadDepartments()
    }, []) 
    


    const handleChangeDepartment = (value: {
        id: number,
        name: string,
        parrentId?: number,
        parrentName?: string,
        check: boolean
      }[]) => {
        let data = dataForListNeuronet
        data.listDepartmentId = []
        value.forEach((item)=>{
          if (item.check){
            data.listDepartmentId.push(item.id)
          }
        })
        setdataForListNeuronet(data)
        setArrayUserDepartments(value)
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

    function toSendToAnaliseListNeuronet(data: any){
      const toSendToAnaliseListNeuronet = sendToAnaliseListNeuronet(data)
      toSendToAnaliseListNeuronet.then((data) => {
          console.log(data);
          if (data.error === undefined){
            alert('Данные успешно отправлены')
          } else if (data.error == 401) {
            console.log('востановить токен')
            //setIsPreloader(false)
          } else if (data.error == 413) {
            alert('Не удалось отправить данные. Причина: Response status code does not indicate success: 413 (Request Entity Too Large).')
            //setIsPreloader(false)
          } else if (data.error == 400) {
            console.log('Пользователь не авторизован')
            //setIsPreloader(false)
          } else if (data.error == 500)  {
            console.log('Произошла ошибка при обработке запроса')
            //setIsPreloader(false)
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    }


    function toSend(){
        if (startDate!== null){
            dataForListNeuronet.startDate = startDate.format(
              "YYYY-MM-DD")
          }
          if (endDate!== null){
            dataForListNeuronet.endDate = endDate.format(
              "YYYY-MM-DD")
          }
        console.log('toSend')   

        let arrayDepartmentId: number[] = []
        arrayUserDepartments.forEach((item)=>{
          if (item.check){
            arrayDepartmentId.push(item.id)
          }
        })

        dataForListNeuronet.listDepartmentId = arrayDepartmentId
        // console.log(arrayUserDepartments.map(item=>item.id))
        // console.log(dataForListNeuronet.startDate, dataForListNeuronet.endDate, arrayUserDepartments.map(item=>item.id)) 
        
        //setdataForListNeuronet(dataForListNeuronet)
        console.log(arrayUserDepartments)
        toSendToAnaliseListNeuronet(dataForListNeuronet)
    }

    function toReceive(){
        if (startDate!== null){
            dataForListNeuronet.startDate = startDate.format(
              "YYYY-MM-DD")
          }
        if (endDate!== null){
        dataForListNeuronet.endDate = endDate.format(
            "YYYY-MM-DD")
        }
               
        if (dataForListNeuronet.listDepartmentId.length = 1){
          console.log(dataForListNeuronet.startDate, dataForListNeuronet.endDate, arrayUserDepartments.map(item=>item.id))
        } else {
          console.log(dataForListNeuronet.startDate, dataForListNeuronet.endDate, dataForListNeuronet.listDepartmentId)
        }
        setdataForListNeuronet(dataForListNeuronet)
        setKeyForNeuronetTable(keyForNeuronetTable+1)
        setKeyForTable(keyForTable+1)
        
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
                                    startDatePlaceholderText="dd.MM.yyyy"
                                    endDatePlaceholderText="dd.MM.yyyy"
                                    
                                    screenReaderInputMessage="dd.MM.yyyy-dd.MM.yyyy"
                                    startDate={startDate}
                                    
                                    startDateId="s_id"
                                    endDate={endDate}
                                    endDateId="e_id"
                                    
                                    onDatesChange={({ startDate, endDate }) => { 
                                      setStartDate(startDate); setEndDate(endDate); 
                                    }}
                                    focusedInput={focusedInput}
                                    
                                    onFocusChange={
                                      (e)=>{
                                        console.log(e)
                                        //@ts-ignore
                                        setFocusedInput(e)
                                      }
                                    }

                                    displayFormat="DD.MM.YYYY"
                                />
                                {/* <div className={styles.iconCalendar}></div> */}
                            </div>

                            <div className={styles.dropdawn1} >
                                {keyForDropdown && <Dropdawn {...{
                                        placeholder: "Филиал",
                                        //по умолчанию выбраны все доступные пользователю позиции -- нет
                                        //autoChosen: arrayUserDepartments.map(item=>item.id),
                                        autoChosen: dataForListNeuronet.listDepartmentId,
                                        list: arrayUserDepartments,
                                        onChange: handleChangeDepartment, 
                                        isChoosingAll: true,
                                        isChoosingAllValue: true
                                    }} />}
                                </div>

                            <div>
                                <button className={styles.btn_show} onClick={toSend}>Отправить на анализ</button>
                            </div>
                            <div>
                                <button className={styles.btn_show} onClick={toReceive}>Получить</button>
                            </div>
                    </div>
                </div>

                <div style={{marginTop: '20px', flexGrow: '1'}} key={keyForTable} >
                    { keyForDropdown && keyForNeuronetTable > -1 &&
                        <NeuronetTable  {...{
                            dataForTable: dataForListNeuronet,
                            listDepartmentId: arrayUserDepartments.map(item=>item.id),
                        }}/>
                    }
                    {
                      keyForDropdown && keyForNeuronetTable == -1 &&
                      <div className={styles.manual}>
                        Выберите диапазон дат и нажмите кнопку "Получить"
                      </div>
                    }
                </div>
            </div>            
            

        </>
    )
}

export default Neuronet