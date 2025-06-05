import {baseUrl} from './variable'
import {DataApiValidate} from  './interfaces'

export const refreshToken =  async function refreshToken(){
    return fetch(`${baseUrl}/api/Auth/refresh-token`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken: window.localStorage.getItem('refreshToken')}),
        })
        .then(async response => {
          if(!response.ok)
            {
                if (response.status == 401) {
                  return {error: response.status}
                } else if (response.status == 500) {
                  alert('Внутряння ошибка сервера')
                  return {error: response.status}
                }
            }
            return response.json()
        }) 
        .then((data) => {
          if (data.error == undefined){
            return data
          } else {
            return data
          }
        })
        .catch((error) => {
          return error
            //разлогинить пользователя
            window.localStorage.setItem('accessToken', 'null')
        });
}

export const validate =  function validate(){
  const token = window.localStorage.getItem('accessToken')  
  

  fetch(`${baseUrl}/api/Auth/validate`, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(async response => {
    if(!response.ok)
    {
        if (response.status == 401) {
        } else if (response.status == 500) {
          alert('Внутряння ошибка сервера')
        }
    }

    return await response.json(); 

    
  })
    
  .then((data: DataApiValidate) => {
      console.log('Success:', data);
  })
  .catch((error) => {
  });
}

export const loadTmcType = async function loadTmcType(){
    const token = window.localStorage.getItem('accessToken')  

    return fetch(`${baseUrl}/api/GeneralData/tmc_types`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
      }
      })
      .then(async response => {
        if(!response.ok)
          {
            if (response.status == 401) {
              return {error: response.status}
            } else if (response.status == 500) {
              alert('Внутряння ошибка сервера')
              return {error: response.status}
            }
          }
          return response.json()
      })
      .then(data => {

        if (data.error == undefined){
          return data.map((item: {objectId: number, name: string, check: boolean})=>{
            return {id: item.objectId, name: item.name, check: true}
          })
        } else {
          return data
        }
      })
      .catch((error) => {
        return error
    });
}

export const loadDepartments = async function loadDepartments(){
  const token = window.localStorage.getItem('accessToken')  
  console.log('loadDepartments', token)
  return fetch(`${baseUrl}/api/GeneralData/user_departments`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': `application/json; charset=UTF-8`
        }
        })
        .then(async response => {
          if(!response.ok)
            {
                if (response.status == 401) {
                  return {error: response.status}
                } else if (response.status == 500) {
                  alert('Внутряння ошибка сервера')
                  return {error: response.status}
                }
            }
            return response.json()
        })
        .then(data => {

          if (data.error == undefined){
            let d = data.map((item: {id: number, name: string, companyID?: number, companyName?: string, check: boolean})=>{
              return {
                id: item.id,
                name: item.name,
                parrentId: item.companyID,
                parrentName: item.companyName,
                check: true
              }
            })
            return d
          } else {
            return data
          }
        })
        .catch((error) => {
          //console.log('временное решение для переавторизации, статус задан хардкорно')
          //console.log(error)
          return error
            //return {error: 400}
        });
    
}

export const sendToAnaliseListNeuronet = async(data: any)=>{
  const token = window.localStorage.getItem('accessToken')  
  return fetch(`${baseUrl}/api/Neurotest/set_for_analysis`, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(async response => {
    if(!response.ok)
      {
        if (response.status == 401) {
          return {error: response.status}
        } else if (response.status == 500) {
          alert('Внутряння ошибка сервера')
          return {error: response.status}
        } else {
          console.log(response)
          return {error: response.status}
        }
      }
      return response.json()
  })
    .then((data) => {
      if (data.error == undefined){
        return data
      } else {
        return data
      }
      
    }
  )
}

export const loadListNeuronet = async(data: any)=>{
  const token = window.localStorage.getItem('accessToken')  
  return fetch(`${baseUrl}/api/Neurotest/get_analysis_results_for_period`, {
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      startDT: data.startDate,
      endDT: data.endDate,
      reportIDs: data.reportIDs
    }),
  })
  .then(async response => {
    if(!response.ok)
      {
        if (response.status == 401) {
          return {error: response.status}
        } else if (response.status == 500) {
          alert('Внутряння ошибка сервера')
          return {error: response.status}
        }
      }
      return response.json()
  })
    .then((data) => {
      if (data.error == undefined){
        return data
      } else {
        return data
      }
      
    }
  )
}

export const loadListReportsVideo = async(data: any)=>{
  const token = window.localStorage.getItem('accessToken')  
  return fetch(`${baseUrl}/api/GeneralData/list_reports_video`, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(async response => {
    if(!response.ok)
      {
        if (response.status == 401) {
          return {error: response.status}
        } else if (response.status == 500) {
          alert('Внутряння ошибка сервера')
          return {error: response.status}
        }
      }
      return response.json()
  })
    .then((data) => {
      if (data.error == undefined){
        return data
      } else {
        return data
      }
      
    }
  )
}

export const loadingVideo = async(data: any) => {
  const token = window.localStorage.getItem('accessToken') 
  return fetch(`${baseUrl}/api/Video/loading?link=${data.value.replace(/\\/g, '/')}`, {
    method: 'GET', 
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      var testurl = new URL(response.url)
      window.localStorage.setItem('videoUrl', testurl.href)
      window.open(`${data.hostUrl}/video`, )
    })
    .catch((error)=>{
      console.log(error)
    })
}

