import { useEffect, useRef, useState } from "react";
import { DataForListNeuronet } from "../../../shared/interfaces";
import { loadListNeuronet, sendToAnaliseListNeuronet } from "../../../shared/functions";
import GridExample from "../../../features/agGridTable/ui/AgGridTableNeuronet";
import { IRow } from "../../../features/agGridTable/ui/AgGridTableNeuronet";

const NeuronetTable = (props: {  
        dataForTable: DataForListNeuronet,
        listDepartmentId: number[], 
    }) => {

    const [dataForTable, setDataForTable] = useState<IRow[]>([])
    const [keyDataForTable, setKeyDataForTable] = useState(-1)

    useEffect(()=>{

        const data = {
            listDepartmentId: props.dataForTable.listDepartmentId[0] !== -1 && props.dataForTable.listDepartmentId[0] !== undefined ? props.dataForTable.listDepartmentId : props.listDepartmentId,
            startDate: props.dataForTable.startDate!==null ? props.dataForTable.startDate: "2024-01-21T11:00:04.791Z",
            endDate: props.dataForTable.endDate!==null ? props.dataForTable.endDate: "2025-01-21T11:00:04.791Z",
        }

        console.log(data)
        toLoadListNeuronet(data)
    }, []) 

    useEffect(()=>{
      setKeyDataForTable(keyDataForTable+1)

    }, [dataForTable])

      function dataToDataForTable(arrayData: any[]){
        let row: IRow
        let array: IRow[] = []
        arrayData.forEach((data)=>{
          row = {
            RepID: data.RepID,
            FullBagsNumb: data.FullBagsNumb,
            EmptyBagsNumb: data.EmptyBagsNumb,
            RecStatus: data.RecStatus,
            RecQuality: data.RecQuality,
            Plot: data.Plot,
            Status: data.Status,
            Resolution: data.Resolution
          }   
          array.push(row)
        })
        console.log(array)
        return  array
      }

      function toLoadListNeuronet(data: any){
        console.log(data)
        const toLoadListNeuronet = loadListNeuronet(data)
        toLoadListNeuronet.then((data) => {
            console.log(data);
            setDataForTable(dataToDataForTable(data.results))
            if (data.error === undefined){
              //setRowData(formatToTableIRow(data))
            } else if (data.error == 401) {
              console.log('востановить токен')
              //setIsPreloader(false)
            } else if (data.error == 400) {
              console.log('Пользователь не авторизован')
              //setIsPreloader(false)
            } else if (data.error == 500)  {
              console.log('Произошла ошибка при обработке запроса')
              //setIsPreloader(false)
            }
          })
      }

      return <>
        <div key={keyDataForTable}>
          {<GridExample {...{dataForTable: dataForTable, toHighlight: ()=>{}}} />}
        </div>
        
      </>

  }

  export default NeuronetTable