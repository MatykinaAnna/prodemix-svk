import 'ag-grid-enterprise'
// Theme
import { ColDef } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-enterprise/styles/ag-grid.css";
// Core CSS
import "ag-grid-enterprise/styles/ag-theme-quartz.css";
import React, { ReactNode, RefObject, StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import eyeIcon from '../../../shared/icons/eye-icon.svg'
import { useNavigate } from "react-router-dom";
import { baseUrl, hostUrl } from '../../../shared/variable';
import {loadingVideo} from '../../../shared/functions'
import styles from './AgGridTable.module.scss'
import { useRef } from 'react';
import {AG_GRID_LOCALE_RU} from '../../../shared/locale/locale.ru'

// Row Data Interface
export interface IRow {
  checkbox: string;
  objectId: number;
  nameFile: string;
  video: any;
  dateVideo: string;
  timeVideo: string;
  uploadDate: string;
  userName: string;
  numberСar: number;
  videoSize: string;
  videoLength: string;
  tmcItemName: string;
  countBags: number;
  bagWeight: number;
  trailerNumber: string;
  tmcTypeName: number;
  comment: string
}
// Create new GridExample component
const GridExample = (props: {  ref?: RefObject<HTMLUListElement>, dataForTable: IRow[]; toHighlight: (e: any) => void}) => {

  const grid = useRef(null);

  const navigate = useNavigate();

  function toVideo(props: any){
    if (props && props.value){
        loadingVideo({value: String(props.value), hostUrl: hostUrl})
    }
    
  }

  function IconVideo(props: any) {
    return (
        <button className={styles.btnVideo} onClick={()=>{toVideo(props)}}>
        </button>
    )
    
  }
  const [colDefs, setColDefs] = useState([
    {
      field: "checkbox",
      headerName: '',
      suppressMovable: true,
      suppressMenu: true, 
      maxWidth: 70,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellStyle: {textAlign: 'center'},
      headerStyle: {justifyContent: 'center'}
    },
    {   
        field: "objectId",
        headerName: "Номер отчета",
        enableRowGroup: true,
        hide: false,
        minWidth: 160,
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    {   
        field: "nameFile",
        headerName: "Номер поля",
        enableRowGroup: true,
        minWidth: 150,
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    {   field: "video",
        cellRenderer: IconVideo,
        headerName: "",
        enableRowGroup: true,
        suppressMenu: true, 
        minWidth: 65,
        maxWidth: 65,
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    { 
        field: "dateVideo",
        headerName: "Дата видео",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 160,
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    { 
        field: "timeVideo",
        headerName: "Время",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 130,
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    { 
        field: "uploadDate",
        headerName: "Дата загрузки",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 180,
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'},
        comparator: (valueA: string, valueB: string) => {
          let r = - 1
          if (valueA !== null && valueB !== null) {
              if (Number(valueA.split('.')[2]) < Number(valueB.split('.')[2])) {
                  r = -1
              } else if (Number(valueA.split('.')[2]) > Number(valueB.split('.')[2])) {
                  r = 1
              } else {
                  if (Number(valueA.split('.')[1]) < Number(valueB.split('.')[1])) {
                      r = -1
                  } else if (Number(valueA.split('.')[1]) > Number(valueB.split('.')[1])) {
                      r = 1
                  } else if (Number(valueA.split('.')[1]) == Number(valueB.split('.')[1])) {
                      if (Number(valueA.split('.')[0]) < Number(valueB.split('.')[0])) {
                          r = -1
                      } else if (Number(valueA.split('.')[0]) == Number(valueB.split('.')[0])) {
                          r = 1
                      } else if (Number(valueA.split('.')[0]) > Number(valueB.split('.')[0])) {
                          r = 1
                      }
                  }
              }
          } else if (valueA === null && valueB !== null) {
              r = -1
          } else {
              r = 1
          }
          return r
      },
    },
    { 
        field: "userName",
        headerName: "Имя пользователя",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 200,
        cellStyle: {textAlign: 'center'},
        headerStyle: {justifyContent: 'center'}
    },
    { 
        field: "numberСar",
        headerName: "Номер машины",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 180,
        cellStyle: {textAlign: 'center'},
        headerStyle: {justifyContent: 'center'}
    },
    {
        field: "trailerNumber",
        headerName: "Номер прицепа",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 180,
        cellStyle: {textAlign: 'center'},
        headerStyle: {justifyContent: 'center'}
    },
    {
        field: "tmcTypeName",
        headerName: "Тип тмц",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 180,
        headerStyle: {justifyContent: 'center'},
        cellStyle: (params: { value: string | null; }) => {
          if (params.value === null || params.value === '') {
              return {backgroundColor: '#f68896'};
          }
          return null;
        }
    },
    {
        field: "tmcItemName",
        headerName: "Наименование тмц",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 250,
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    {
        field: "countBags",
        headerName: "Кол-во груза",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        minWidth: 130,
        headerStyle: {justifyContent: 'center'},
        cellStyle: {textAlign: 'center'}
    },
    {
          headerName: "ИИ",
          headerStyle: {textAlign: 'center'},
          children: [
            {
              field: "countFilledBags",
              headerName: 'Кол-во полных мешков ИИ',
              suppressMovable: true,
              suppressMenu: true,
              headerStyle: {justifyContent: 'center'}, 
              cellStyle: {textAlign: 'center'},
              minWidth: 200,
            //   checkboxSelection: true,
            //   headerCheckboxSelection: true,
            },
            {
              field: "countEmptyedBags",
              headerName: 'Кол-во пустых мешков ИИ',
              suppressMovable: true,
              suppressMenu: true, 
              headerStyle: {justifyContent: 'center'},
              cellStyle: {textAlign: 'center'},
              minWidth: 200,
            //   checkboxSelection: true,
            //   headerCheckboxSelection: true,
            },
            
          ],
    },
    {
        headerName: "Отклонение",
        headerStyle: {textAlign: 'center'},
        children: [
          {
            field: "countDeviationFilledBags",
            headerName: 'Полных (МП/ИИ)',
            suppressMovable: true,
            suppressMenu: true,
            headerStyle: {justifyContent: 'center'}, 
            cellStyle: {textAlign: 'center'},
            minWidth: 200,
          //   checkboxSelection: true,
          //   headerCheckboxSelection: true,
          },
          {
            field: "countDeviationEmptyedBags",
            headerName: 'Пустых (МП/ИИ)',
            suppressMovable: true,
            suppressMenu: true, 
            headerStyle: {justifyContent: 'center'},
            cellStyle: {textAlign: 'center'},
            minWidth: 200,
          //   checkboxSelection: true,
          //   headerCheckboxSelection: true,
          },
          
        ],
    },
    {
        field: "bagWeight",
        headerName: "Вес груза",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        headerStyle: {justifyContent: 'center'},
        enableRowGroup: true,
        minWidth: 130,
        cellStyle: {textAlign: 'center'}
    },
    {
        field: "comment",
        headerName: "Комментарий",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        headerStyle: {justifyContent: 'center'},
        minWidth: 180,
    },
    {
        field: "videoSize",
        headerName: "Размер видео",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        headerStyle: {justifyContent: 'center'},
        minWidth: 150,
    },
    {
        field: "videoLength",
        headerName: "Длина видео",
        filter: 'agSetColumnFilter',
        aggFunc: "count",
        enableRowGroup: true,
        headerStyle: {justifyContent: 'center'},
        minWidth: 150,
    }
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };


  function toHighlight(e: any){
    props.toHighlight(e)
  }


  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={
        "ag-theme-quartz"
      }
      style={{ width: "100%", height: "100%" }}
    >

        <AgGridReact ref={grid}

          rowData={props.dataForTable}
          columnDefs={colDefs}
          rowSelection={'multiple'}
          paginationPageSizeSelector={[20, 50, 100, 200, 500, 700]}
          pagination={true}
          defaultColDef={defaultColDef}
          rowGroupPanelSuppressSort={true}
          localeText={AG_GRID_LOCALE_RU}
          rowGroupPanelShow={"always"}
          onRowSelected={(e) => toHighlight(e)}
          
        />
      
    </div>
  );
};

export default GridExample

