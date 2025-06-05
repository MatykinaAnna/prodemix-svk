import save from '../../../shared/icons/save.svg'
import widgetsIcon from '../../../shared/icons/widgets-icon.svg'
import downloadСloud from '../../../shared/icons/download-cloud.svg'
import upload from '../../../shared/gif/upload.gif'
import plus from '../../../shared/icons/plus.svg'
import { useEffect, useRef, useState } from "react";
import styles from './mainTable.module.scss'
import moment from 'moment'
import 'moment/locale/ru';
import GridExample from '../../../features/agGridTable/ui/AgGridTable';
import classNames from 'classnames'
import {IRow} from '../../../features/agGridTable/ui/AgGridTable'
import { baseUrl } from '../../../shared/variable';
import { DataForListReportsVideo, DataApi_list_reports_video } from '../../../shared/interfaces';
import {refreshToken, loadListReportsVideo} from "../../../shared/functions"
import DropFileInput from "../../../features/dropFileInput/DropFileInput"
import { formToJSON } from 'axios'
import { accessSync } from 'fs'
import preloader from '../../../shared/gif/bouncing-circles.svg'
import CryptoJS from 'react-native-crypto-js'

const MainTable = (props: {  
                            dataForTable: DataForListReportsVideo,
                            listDepartmentId: number[], 
                            listTmcId: number[],
                            withNull: boolean
                          }) => {
                        

  const [rowData, setRowData] = useState<IRow[]>([]);

  const [uploadFlag, setUploadFlag] = useState(false);
  const [file, setFile] = useState<File>()

  const grid1 = useRef<HTMLUListElement>(null);

  const [highlightRows, setHighlightRows] = useState<any>([])

  const [addVideoWrapperClass, setAddVideoWrapperClass] = useState(false)

  const [isPreloader, setIsPreloader] = useState(false)

  const [idVideo, setIdVideo] = useState()

  const [textWinConferm, setTextWinConferm] = useState<string>('')
  const [flagTextWinConferm, setFlagTextWinConferm] = useState<boolean>(false)

  const [txt1, setTxt1] = useState('')

  useEffect(()=>{
    setIsPreloader(false)
  }, [rowData])

  const downloadLane = useRef(null);

  const addVideoWrapper = useRef(null);

  const xhr = new XMLHttpRequest();

  
  function toLoadListReportsVideo(data: any){
    setIsPreloader(true)
    const toLoadListReportsVideo = loadListReportsVideo(data)

    toLoadListReportsVideo.then((data) => {
      console.log(data);

      if (data.error === undefined){
        setRowData(formatToTableIRow(data.reportsData, JSON.parse(data.serviceResponseBody)))
        console.log(JSON.parse(data.serviceResponseBody))
      } else if (data.error == 401) {
        console.log('востановить токен')
        setIsPreloader(false)
      } else if (data.error == 400) {
        console.log('Пользователь не авторизован')
        setIsPreloader(false)
      } else if (data.error == 500)  {
        console.log('Произошла ошибка при обработке запроса')
        setIsPreloader(false)
      }
    })
  }

  useEffect(()=>{

    const formData1 = new FormData();
    formData1.append('objectId', idVideo!); 
    formData1.append('file', file!); 

    if (uploadFlag){
      upload(formData1, `${baseUrl}/api/Video/upload`).then((data)=>{
        if (data){
          console.log(data)
          data = JSON.parse(data)
          console.log(data)
          let d = []
          d.push(data.report)
          let array =  [...formatToTableIRow(d), ...rowData];
          setRowData(array)

          setFlagTextWinConferm(true)
          setTextWinConferm('Файл успешно загружен')
          setTimeout(()=>{
            setFlagTextWinConferm(false)
          }, 3000)
        }
      })
    }

  }, [uploadFlag])


  useEffect(()=>{
    if (props.dataForTable.listTmcId[props.dataForTable.listTmcId.length-1] == undefined){
      props.dataForTable.listTmcId.splice(-1, 1)
    }
    if (props.listTmcId[props.dataForTable.listTmcId.length-1] == undefined){
      props.listTmcId.splice(-1, 1)
    }

    console.log(props.dataForTable.listTmcId, props.listTmcId)
    const data = {
            listTmcId: props.dataForTable.listTmcId[0] !== -1 &&  props.dataForTable.listTmcId[0] !== undefined ? props.dataForTable.listTmcId : props.listTmcId,
            listDepartmentId: props.dataForTable.listDepartmentId[0] !== -1 && props.dataForTable.listDepartmentId[0] !== undefined ? props.dataForTable.listDepartmentId : props.listDepartmentId,
            startDate: props.dataForTable.startDate!==null ? props.dataForTable.startDate: "2024-01-21T11:00:04.791Z",
            endDate: props.dataForTable.endDate!==null ? props.dataForTable.endDate: "2025-01-21T11:00:04.791Z",
            withNull: props.withNull
        }

        toLoadListReportsVideo(data)  
  }, []) 

  useEffect(()=>{
    if (txt1 != '') {
      let l_txt1 = txt1

      let txt1Obj = l_txt1.split('}')[0]+'}'
      let txt2Obj = l_txt1.split('}')[1]+'}'
      
      txt1Obj = JSON.parse(txt1Obj)
      
      txt2Obj = JSON.parse(txt2Obj)
      
      const mergedObject = Object.assign({}, txt1Obj, txt2Obj);

      console.log(mergedObject)

      let JSON_reportVideoMetaJson = {
        //@ts-ignore
        culture: mergedObject.culture,
        //@ts-ignore
        departmentName: mergedObject.DEPARTMENT,
        //@ts-ignore
        fieldName: mergedObject.FIELD_NAME,
        //@ts-ignore
        fileGuid: mergedObject.GlobalID,
        //@ts-ignore
        sectorId: mergedObject.SECTORID,
        //@ts-ignore
        tmcTypeId: mergedObject.tmc_type_id
      }
      let JSON_reportVideoJson = {
        //@ts-ignore
        azimuth: mergedObject.azimuth,
        //@ts-ignore
        bag_weight: mergedObject.bag_weight,
        //@ts-ignore
        cnt_bags: mergedObject.cnt_bags,
        //@ts-ignore
        isInTheField: mergedObject.isInField,
        //@ts-ignore
        lat: mergedObject.lat,
        //@ts-ignore
        lon: mergedObject.lon,
        //@ts-ignore
        report_id: mergedObject.GlobalID,
        //@ts-ignore
        tmc_item_id: mergedObject.tmc_item_id,
        //@ts-ignore
        tmc_type_id: mergedObject.tmc_type_id,
        //@ts-ignore
        tractor_number: mergedObject.tractor_number,
        //@ts-ignore
        trailer_number: mergedObject.trailer_number,
        //@ts-ignore
        userId: mergedObject.ownerUserName,
        //@ts-ignore
        video_date: mergedObject.video_date,
        //@ts-ignore
        video_length: mergedObject.video_length,
        //@ts-ignore
        video_size: mergedObject.video_size,
      }

      let JSON_reportControlJson = {
        //@ts-ignore
        COMMENT: mergedObject.COMMENT,
        //@ts-ignore
        DATE_CREATE: mergedObject.DATE_CREATE,
        //@ts-ignore
        DATE_UPDATE: mergedObject.DATE_UPDATE,
        //@ts-ignore
        DEPARTMENT: mergedObject.DEPARTMENT,
        //@ts-ignore
        FIELD_NAME: mergedObject.FIELD_NAME,
        //@ts-ignore
        GROWTH_STAGE: mergedObject.GROWTH_STAGE,
        //@ts-ignore
        GlobalID: mergedObject.GlobalID,
        //@ts-ignore
        OBJECTID: mergedObject.OBJECTID,
        //@ts-ignore
        PhotoIds: mergedObject.PhotoIds,
        //@ts-ignore
        SECTORID: mergedObject.SECTORID,
        //@ts-ignore
        THREAT_LEVEL: mergedObject.THREAT_LEVEL,
        //@ts-ignore
        THREAT_SUBTYPE: mergedObject.THREAT_SUBTYPE,
        //@ts-ignore
        THREAT_TYPE: mergedObject.THREAT_TYPE,
        //@ts-ignore
        VideoIds: mergedObject.VideoIds,
        //@ts-ignore
        YAMMER_PUBLISHED: mergedObject.YAMMER_PUBLISHED,
        //@ts-ignore
        growthStageName: mergedObject.growthStageName,
        //@ts-ignore
        ownerUserName: mergedObject.ownerUserName,
      }

      const formData1 = new FormData();
      formData1.append('report_video', JSON.stringify(JSON_reportVideoJson));
      formData1.append('report_video_meta', JSON.stringify(JSON_reportVideoMetaJson));
      formData1.append('report_control', JSON.stringify(JSON_reportControlJson));

      upload(formData1, `${baseUrl}/api/Video/upload_report_statistic`)
      setFlagTextWinConferm(true)
      setTextWinConferm('Начало загрузки файла')
      setTimeout(()=>{
        setFlagTextWinConferm(false)
      }, 3000)

    }
  }, [txt1])
  
  function formaterForDate(date: string) {
    let d = new Date(date)
    let datestring = ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    return datestring
  }

  function loadingLine(){
    if (downloadLane.current!== null){
      //@ts-ignore
      let width = 0
      //@ts-ignore
      downloadLane.current.style.width = `${width}px`
      let interval = setInterval(()=>{
        if (width < 103){
          width = width + 1
          //@ts-ignore
          downloadLane.current.style.width = `${width}px`
        } else {
          clearInterval(interval)
        }
      }, 150)
    }
  }

  function formatToTableIRow(data: any, serviceResponseBody?: any[]){
    
    return data.map((item: any)=>{

      //@ts-ignore
      let serviceItem = serviceResponseBody?.results.find((item1)=>{
        return item1.RepID == item.objectId
      })
      
      if (!serviceItem){
        return {
          checkbox: '',
          objectId: item.objectId,
          nameFile: item.filename,
          video: item.path, 
          dateVideo: (formaterForDate(moment(item.videoDate, "YYYYMMDDTHHmmss.SSSZ").toString())).split(' ')[0],
          timeVideo: (formaterForDate(moment(item.videoDate, "YYYYMMDDTHHmmss.SSSZ").toString())).split(' ')[1],
          uploadDate: formaterForDate(item.dateUpload),
          userName: item.fullName,
          numberСar: item.tractorNumber,
          videoSize: item.videoSize,
          videoLength: item.videoLength,
          tmcItemName: item.tmcItemName,
          countBags: item.countBags,
          bagWeight: item.bagWeight,
          trailerNumber: item.trailerNumber,
          tmcTypeName: item.tmcTypeName,
          comment: item.comment, 
        }
      } else {
        return {
          checkbox: '',
          objectId: item.objectId,
          nameFile: item.filename,
          video: item.path, 
          dateVideo: (formaterForDate(moment(item.videoDate, "YYYYMMDDTHHmmss.SSSZ").toString())).split(' ')[0],
          timeVideo: (formaterForDate(moment(item.videoDate, "YYYYMMDDTHHmmss.SSSZ").toString())).split(' ')[1],
          uploadDate: formaterForDate(item.dateUpload),
          userName: item.fullName,
          numberСar: item.tractorNumber,
          videoSize: item.videoSize,
          videoLength: item.videoLength,
          tmcItemName: item.tmcItemName,
          countBags: item.countBags,
          bagWeight: item.bagWeight,
          trailerNumber: item.trailerNumber,
          tmcTypeName: item.tmcTypeName,
          comment: item.comment,
          countFilledBags: serviceItem.FullBagsNumb,
          countEmptyedBags: serviceItem.EmptyBagsNumb,
          countDeviationFilledBags: item.countBags - serviceItem.FullBagsNumb,
          countDeviationEmptyedBags: item.countBags - serviceItem.EmptyBagsNumb,
        }
      }
    })
  }

  function downloadVideo(){
    if (highlightRows.length){
      let fileLinks = []

      fileLinks = highlightRows.map((item: any)=>{
        return item.data.video
      })
  
      const token = window.localStorage.getItem('accessToken')  
  
      loadingLine()
      let interval = setInterval(()=>{
        loadingLine()
      }, 15300)
  
      fetch(`${baseUrl}/api/Video/multiple_downloads`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(fileLinks.map((item:any)=>{
          return (item.replace(/\\/g, '/'))
        })),
      })
        .then(async (response) => {
          const blob = await response.blob(); // Получение данных как блоба
          const downloadUrl = URL.createObjectURL(blob);
          // Создание временного элемента для скачивания
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'videos.zip';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(downloadUrl);
          clearInterval(interval)
          //@ts-ignore
          downloadLane.current.style.width = `${103}px`         
        })   
        .catch((error)=>{
          console.log(error)
          clearInterval(interval)
          //@ts-ignore
          downloadLane.current.style.width = `${103}px`
        })
    }
  }

  function addVideo(){
    console.log(addVideoWrapper.current)
    setAddVideoWrapperClass(true)
  }

  const upload = (myData: any, url: string, options?: { onProgress?: (progress: number) => void }): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      //xhr.responseType = 'json';
      
      xhr.open('POST', url);
      xhr.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('accessToken')}`)
      //xhr.setRequestHeader('Content-Type', 'multipart/form-data')

      // Добавили обработку прогресса
      xhr.upload.onprogress = (event) => {
        // options?.onProgress?.(Math.round((event.loaded / event.total) * 100));
        console.log(event.loaded + ' / ' + event.total)
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          // обработка ответа
          resolve(xhr.response)
          console.log(xhr.response.objectId)
          setIdVideo(JSON.parse(xhr.response).objectId)
          
          setUploadFlag(true)
        } else {
          // обработка ошибок
          // reject(xhr.status)
          setTextWinConferm('Не удалось загрузить файлы')
          setFlagTextWinConferm(true)
          setTimeout(()=>{
            setFlagTextWinConferm(false)
          }, 3000)
        }
      };
      console.log(typeof(myData))
      try {
        xhr.send(myData);
      } catch {
        
      }
    })
  }

  const onFileChange = async (files: any) => {

    let index_txt_1 = -1
    let index_txt_2 = -1
    let index_mp4 = -1

    files.forEach((item: any, index: any)=>{
      if (item.name.split('.')[1] == 'txt' && index_txt_1 == -1) {
        index_txt_1 = index
      } else if (item.name.split('.')[1] == 'txt' && index_txt_1 != -1) {
        index_txt_2 = index
      } else if (item.name.split('.')[1] == 'mp4') {
        index_mp4 = index
      }
    })

    if (index_txt_1 === -1 || index_mp4 === -1){
      alert("Вставьте один файл типа .txt и один файл типа .mp4")
    } else {
      console.log(files[index_mp4]);
      console.log(files[index_txt_1]);
      setAddVideoWrapperClass(false)

      let reader = new FileReader();
      reader.readAsText(files[index_txt_1]);
      reader.onload = async function() {

        //зашифровать файл
        // console.log(reader.result)
        // let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(reader.result), '1234567890123456').toString();
        // console.log(ciphertext)
        
        // console.log(reader.result)
        // let bytes  = CryptoJS.AES.decrypt(String(reader.result), '1234567890123456');
        //let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //console.log(bytes.toString(CryptoJS.enc.Utf8))

        let originalText = String(reader.result)

        setTxt1(originalText)
      }
      setFile(files[index_mp4])
    }
  }

  const onFileChange1 = async (files: any) => {
    
    const formData1 = new FormData();
    formData1.append('objectId', '974030'); 
    formData1.append('file', files[1]); 

    upload(formData1, `${baseUrl}/api/Video/upload`).then((data)=>{
      if (data){
        console.log(data)
        data = JSON.parse(data)
        console.log(data)

        let d = []
        d.push(data)
        let array =  [...formatToTableIRow(d), ...rowData];
        setRowData(array)

        setFlagTextWinConferm(true)
        setTextWinConferm('Файл успешно загружен')
        setTimeout(()=>{
          setFlagTextWinConferm(false)
        }, 3000)
      }
    })
    
  }

  return (

    <div className={styles.wrapper}>

        {isPreloader &&
          <>
            <div className={styles.bgPreloader} />
            <object className={styles.preloader} type="image/svg+xml" data={preloader} width="200" height="200" ></object>
          </>
        }
        
        <div className={styles.btnRow}>
            <button className={styles.btnBorder} style={{marginLeft: '8px'}}>
                <img src={save} alt="btn-save" style={{marginRight: '6px'}} />
                Сохранить вид отчета
            </button>
            <button className={styles.btnBorder} style={{marginLeft: '8px'}}>
                <img src={widgetsIcon} alt="btn-save" style={{marginRight: '6px'}} />
                Удалить
            </button>
            <button id='btnDownload' className={classNames(styles.btnBorder, styles.btnSave)} onClick={()=>{downloadVideo()}} style={{marginLeft: '8px', }}>
                <div className={styles.downloadLane} ref={downloadLane}>
                  
                </div>
                <img src={downloadСloud}  alt="btn-save" style={{marginRight: '6px'}} />
                <span>Скачать</span>
                
            </button>
            <button className={styles.btnGreen} style={{marginLeft: '8px'}} onClick={()=>{addVideo()}}>
                <img src={plus} alt="btn-save" style={{marginRight: '6px'}} />
                Загрузить видео
            </button>
        </div>
        <div style={{flexGrow: '1'}}>
            <GridExample ref={grid1} {... {dataForTable: rowData, toHighlight: (e)=>{
                console.log(e)
                let index = highlightRows.findIndex((item: any)=>{
                  //@ts-ignore
                  return (item.data.objectId == e.data.objectId)
                })
                if (index == -1 ){
                  let array = highlightRows
                  array.push(e)
                  setHighlightRows(array)
                } else {
                  let array = highlightRows
                  array.splice(index, 1)
                  setHighlightRows(array)
                }
              }}} />
        </div>

        {addVideoWrapperClass && 
          <div className={styles.addVideoWrapperBg} onClick={()=>{setAddVideoWrapperClass(false)}}>
          
          </div>
        }
        
        {addVideoWrapperClass && <div className={styles.addVideoWrapper} ref={addVideoWrapper}  >
            <div style={{marginTop: '20px',  textAlign: 'center'}}>
            Перетащите сюда видеофайлы, скачанные из вашего мобильного устройства, или нажмите «Открыть файлы»
            </div>
            <DropFileInput
            //@ts-ignore
                onFileChange={(files) => onFileChange(files)}
            />
        </div>}

        {flagTextWinConferm && <div className={styles.winConferm}>
          {textWinConferm}
        </div>}

    </div>

  )
}

export default MainTable


