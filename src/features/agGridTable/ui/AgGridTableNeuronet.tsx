import React, { ReactNode, RefObject, StrictMode, useEffect, useMemo, useRef, useState } from "react";
import { ColDef } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import {AG_GRID_LOCALE_RU} from '../../../shared/locale/locale.ru'

export interface IRow {
    RepID: string|number;
    FullBagsNumb: number;
    EmptyBagsNumb: number;
    RecStatus: string|number;
    RecQuality: string|number;
    Plot: string|number;
    Status: string|number;
    Resolution: string|number;
  }

// export interface IRow {
//     countForMobileApp: number;
//     countFilledBags: number;
//     countEmptyedBags: number;
//     countDeviationFill: number;
//     countDeviationEmptye: string|number;
//   }

const GridExample = (props: {  ref?: RefObject<HTMLUListElement>, dataForTable: IRow[]; toHighlight: (e: any) => void}) => {

    //const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    //     {
    //       field: "RepID",
    //       headerName: 'RepID',
    //       suppressMovable: true,
    //       suppressMenu: true, 
    //       maxWidth: 50,
    //     //   checkboxSelection: true,
    //     //   headerCheckboxSelection: true,
    //     },

    //     {
    //         field: "FullBagsNumb",
    //         headerName: 'FullBagsNumb',
    //         suppressMovable: true,
    //         suppressMenu: true, 
    //         maxWidth: 50,
    //       //   checkboxSelection: true,
    //       //   headerCheckboxSelection: true,
    //     },
        
    //     {
    //         field: "EmptyBagsNumb",
    //         headerName: 'EmptyBagsNumb',
    //         suppressMovable: true,
    //         suppressMenu: true, 
    //         maxWidth: 50,
    //       //   checkboxSelection: true,
    //       //   headerCheckboxSelection: true,
    //     },

    //     {
    //         field: "RecStatus",
    //         headerName: 'RecStatus',
    //         suppressMovable: true,
    //         suppressMenu: true, 
    //         maxWidth: 50,
    //       //   checkboxSelection: true,
    //       //   headerCheckboxSelection: true,
    //     },

    //     {
    //         field: "Plot",
    //         headerName: 'Plot',
    //         suppressMovable: true,
    //         suppressMenu: true, 
    //         maxWidth: 50,
    //       //   checkboxSelection: true,
    //       //   headerCheckboxSelection: true,
    //     },

    //     {
    //         field: "Status",
    //         headerName: 'Status',
    //         suppressMovable: true,
    //         suppressMenu: true, 
    //         maxWidth: 50,
    //       //   checkboxSelection: true,
    //       //   headerCheckboxSelection: true,
    //     },

    //     {
    //         field: "Resolution",
    //         headerName: 'Resolution',
    //         suppressMovable: true,
    //         suppressMenu: true, 
    //         maxWidth: 50,
    //       //   checkboxSelection: true,
    //       //   headerCheckboxSelection: true,
    //     },

    // ]);

    const [rowData, setRowData] = useState<IRow[]>([])

    useEffect(()=>{
      setRowData(props.dataForTable)
    }, [])

    // const [colDefs, setColDefs] = useState([
    //     {
    //       field: "countForMobileApp",
    //       headerName: 'Кол-во мешков по МобПриложению',
    //       suppressMovable: true,
    //       suppressMenu: true, 
    //     //   checkboxSelection: true,
    //     //   headerCheckboxSelection: true,
    //     },
    //     {
    //       headerName: "ИИ",
          
    //       children: [
    //         {
    //           field: "countFilledBags",
    //           headerName: 'Кол-во полных мешков ИИ',
    //           suppressMovable: true,
    //           suppressMenu: true, 
    //         //   checkboxSelection: true,
    //         //   headerCheckboxSelection: true,
    //         },
    //         {
    //           field: "countEmptyedBags",
    //           headerName: 'Кол-во пустых мешков ИИ',
    //           suppressMovable: true,
    //           suppressMenu: true, 
    //         //   checkboxSelection: true,
    //         //   headerCheckboxSelection: true,
    //         },
    //       ],
    //     },
    //     {
    //       headerName: "Отклонение",
    //       children: [
    //         {
    //           field: "countDeviationFill",
    //           headerName: 'Кол-во пустых мешков ИИ',
    //           suppressMovable: true,
    //           suppressMenu: true, 
    //         //   checkboxSelection: true,
    //         //   headerCheckboxSelection: true,
    //         },
    //         {
    //           field: "countDeviationEmptye",
    //           headerName: 'Кол-во пустых мешков ИИ',
    //           suppressMovable: true,
    //           suppressMenu: true, 
    //         //   checkboxSelection: true,
    //         //   headerCheckboxSelection: true,
    //         },
    //       ],
    //     },
        
    // ])

    const [colDefs, setColDefs] = useState([
      {
        field: "RepID",
        headerName: 'Идентификатор',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "FullBagsNumb",
        headerName: 'Количество распознанных полных мешков',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "EmptyBagsNumb",
        headerName: 'Количество распознанных пустых мешков',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "RecStatus",
        headerName: 'Статус задачи анализа',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "RecQuality",
        headerName: 'Показатель качества распознавания',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "Plot",
        headerName: 'Графики распознания',
        suppressMovable: true,
        suppressMenu: true, 
        cellRenderer: function(params: any) {
          return <a href={params.value} target="_blank">График</a>
        },
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "Status",
        headerName: 'Status',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
      {
        field: "Resolution",
        headerName: 'Resolution',
        suppressMovable: true,
        suppressMenu: true, 
      //   checkboxSelection: true,
      //   headerCheckboxSelection: true,
      },
  ])
    
    function toHighlight(e: any){
        props.toHighlight(e)
      }

    const defaultColDef: ColDef = {
        flex: 1,
    };  

    const grid = useRef(null);

    return (
      <>
        <div
        className={
        "ag-theme-quartz"
        }
           style={{ width: "100%", height: 700 }}
        >

            <AgGridReact ref={grid}

                rowData={rowData}
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
      </>

    );  

};

export default GridExample