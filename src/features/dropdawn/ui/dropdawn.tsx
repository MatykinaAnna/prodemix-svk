import { useEffect, useState, useRef  } from 'react';
import styles from './dropdawn.module.scss'
import classNames from 'classnames'


const Dropdawn = (props: {  placeholder: string,
                            autoChosen: number[],
                            list: {
                                id: number,
                                name: string,
                                parrentId?: number,
                                parrentName?: string,
                                check: boolean
                            }[],
                            isChoosingAll: boolean,
                            isChoosingAllValue: boolean,
                            onChange: (value: 
                                {
                                    id: number,
                                    name: string,
                                    parrentId?: number,
                                    parrentName?: string,
                                    check: boolean
                                }[]) => void
                        }) => {
    
    const [searchString, setSearchString] = useState<string>('');

    

    const [filteredList, setFilteredList] = useState(props.list.sort((a, b)=>{
        if (a.parrentId && b.parrentId){
            return (a.parrentId - b.parrentId || a.id - b.id)
        } else {
            return (a.id - b.id)
        }
    }))
    const [hideList, setHideList] = useState(false)
    const [isChoosingAllValue, setIsChoosingAllValue] = useState(props.isChoosingAllValue)
    const [classParent, setClassParent] = useState('')
    const [keyList, setKeyList] = useState(1)
    const [keyAll, setKeyAll] = useState(1)

    const myRef = useRef(null);

    const rootEl = useRef(null);

    useEffect(()=>{
        toFilterList(searchString)
    }, [searchString])

    
    useEffect(() => {
 
        //@ts-ignore
        function handleOutsideClick(event) {
            //@ts-ignore
          if (rootEl.current && !rootEl.current.contains(event.target)) {
            click(event.target.className)
          } 
        }
     
        // Adding click event listener
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
      }, [rootEl]);

    useEffect(()=>{
        if (hideList){  
            //@ts-ignore
            myRef.current!.style.transform = 'rotate(180deg)'
        } else {
            //@ts-ignore
            myRef.current!.style.transform = 'rotate(0deg)'
        }
        
    }, [hideList])

    const list = filteredList.map((item, index) => {
        return (
            <div className={styles.container_checkbox}
                 key={item.id} id={`containerCheckbox${item.id}`}
                 style={{display: 'flex', alignItems: 'center'}}
                 ref={rootEl}
            >
                <input  
                        type="checkbox"
                        onChange={()=>{clickPoint(item.id)}}
                        id={`item${item.id}`}
                        checked={isChecked(item.id)}
                        //defaultChecked={isChecked(item.id)}
                        key={`checkbox${item.id}`}
                />
                <label htmlFor={`item${item.id}`}>{item.name}</label>
            </div>
        )
    })

    function isParent(item: {
        id: number;
        name: string;
        parrentId?: number;
        parrentName?: string;
        check: boolean;
    }){
        let resultInd = filteredList.findIndex((item1)=>{
            return (item1.parrentId! == item.parrentId! && !item1.check)
        })
        return Boolean(resultInd == -1)
    }

    function isAll(){
        let resultInd = filteredList.findIndex((item1)=>{
            return (!item1.check)
        })
        return Boolean(resultInd == -1)
    }

    function doingRangerList(list: {
        id: number,
        name: string,
        parrentId?: number,
        parrentName?: string,
        check: boolean
    }[]){
        let parrentId = list[0].parrentId 
        let parrentIndex = 0
        return list.map((item, index) => {
            if (item.parrentId == parrentId && index == parrentIndex){
                return (
                    <>
                        <div className={styles.container_checkbox}
                            key={`parrent${item.parrentId}`} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                        >

                            <input  
                                type="checkbox"
                                onChange={()=>{cliskToParrent(item)}}
                                id={`parrentCheckbox${item.parrentName}`}
                                checked={isParent(item)}
                                key={`parrentCheckbox${item.id}`}
                            />

                            <label style={{fontWeight: 'bold'}} htmlFor={`parrentCheckbox${item.parrentName}`}>{item.parrentName}</label>
                        </div>

                        <div className={classNames(styles.container_checkbox, styles.childeNode)}
                            key={item.id} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                        >
                            <input  
                                    type="checkbox"
                                    onChange={()=>{clickPoint(item.id)}}
                                    id={`item${item.id}`}
                                    checked={isChecked(item.id)}
                                    //defaultChecked={isChecked(item.id)}
                                    key={`checkbox${item.id}`}
                            />
                            <label htmlFor={`item${item.id}`}>{item.name}</label>
                        </div>
                    </>  
                )
            } else if (item.parrentId == parrentId && index !== parrentIndex){
                return (
                    <div className={classNames(styles.container_checkbox, styles.childeNode)}
                            key={item.id} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                        >
                            <input  
                                    type="checkbox"
                                    onChange={()=>{clickPoint(item.id)}}
                                    id={`item${item.id}`}
                                    checked={isChecked(item.id)}
                                    key={`checkbox${item.id}`}
                            />
                            <label htmlFor={`item${item.id}`}>{item.name}</label>
                        </div>
                )
            } else if (item.parrentId != parrentId) {
                parrentId = list[index].parrentId 
                parrentIndex = index

                return (
                    <>
                        <div className={styles.container_checkbox}
                            key={`parrent${item.parrentId}`} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                            
                        >
                            <input  
                                type="checkbox"
                                onChange={()=>{cliskToParrent(item)}}
                                id={`parrentCheckbox${item.parrentName}`}
                                checked={isParent(item)}
                                key={`parrentCheckbox${item.parrentId}`}
                            />
                            <label style={{fontWeight: 'bold'}} htmlFor={`parrentCheckbox${item.parrentName}`}>{item.parrentName}</label>
                        </div>

                        <div className={classNames(styles.container_checkbox, styles.childeNode)}
                            key={item.id} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                        >
                            <input  
                                    type="checkbox"
                                    onChange={()=>{clickPoint(item.id)}}
                                    id={`item${item.id}`}
                                    checked={isChecked(item.id)}
                                    key={`checkbox${item.id}`}
                            />
                            <label htmlFor={`item${item.id}`}>{item.name}</label>
                        </div>
                    </>  
                )
            }
            
        })
    }

    function click(eventClass: string){
        if (!eventClass.includes("dropdawn") && !eventClass.includes("checkbox") && eventClass!==''){
            setHideList(false)
            sendDate()
        }
    }

    function isChecked(id: number){
        if (filteredList.find((item)=>{
            return item.id == id
        })) {
            return filteredList.find((item)=>{
                return item.id == id
            })!.check
        } else {
            console.log(filteredList, id)
        }
        
    }

    function clickPoint(id: number){
        let array = filteredList
        let ind = array.findIndex((item)=>{
            return item.id == id
        })
        array[ind].check = !array[ind].check

        if (!array[ind].check){
            setIsChoosingAllValue(false)
            setKeyAll(keyAll+1)
        }

        props.onChange(array)
        setFilteredList(array)
        setKeyList(keyList+1)
    }

    function cliskToParrent(item: any){
        let array = filteredList
        //item.check --> item.check = false -- так как item.check данному моменту не успел поменяться
        if (item.check){
            array.forEach((item1)=>{
                if (item.parrentId! == item1.parrentId!){
                    item1.check = false
                }
                
            })
        } else {
            array.forEach((item1)=>{
                if (item.parrentId! == item1.parrentId!){
                    item1.check = true
                }
                
            })
        }
        setFilteredList(array)
        props.onChange(array)
        setKeyList(keyList+1)
    }

    function cliskToAll(){
        setIsChoosingAllValue(!isChoosingAllValue) 
        let array = filteredList
        //!isChoosingAllValue -- так как isChoosingAllValueк данному моменту не успел поменяться (так как хранится в state)
        if (!isChoosingAllValue){
            array.forEach((item)=>{
                item.check = true
            })
        } else {
            array.forEach((item)=>{
                item.check = false
            })
        }
        setFilteredList(array)
        props.onChange(array)
        setKeyList(keyList+1)
    }

    function toFilterList(value: string){
        if (value == ''){
            setFilteredList(props.list)
        } else {
            let array = props.list.filter((item)=>{
                return item.name.includes(value)
            })
            setFilteredList(array)
        }
    }

    function sendDate(){
        let choosenList: number[] = []
        filteredList.forEach((item)=>{
            if (item.check){
                choosenList.push(item.id)
            }
        })
        props.onChange(filteredList)
        setHideList(false)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.choosen} onClick={(event)=>{
                setHideList(!hideList)
                
                //@ts-ignore
                let strСlass = event.target.parentElement.parentElement.className

                if (!strСlass.includes('MainPage_dropdawn')){
                    //@ts-ignore
                    strСlass = event.target.parentElement.parentElement.parentElement.className
                }

                if (document.getElementById('wrapperFilters')?.childNodes.length !== undefined){
                    for (let i=0; i<document.getElementById('wrapperFilters')?.childNodes.length!; i++){
                        //@ts-ignore
                        if (document.getElementById('wrapperFilters')?.childNodes[i].className.includes('MainPage_dropdawn') && 
                        //@ts-ignore
                            (document.getElementById('wrapperFilters')?.childNodes[i].className) !== strСlass) {
                                document.getElementById('wrapperFilters')?.childNodes[i].childNodes[0].childNodes.forEach((item)=>{
                                    //@ts-ignore
                                    if (item.className.includes('dropdawn_choosen')){
                                        item.childNodes.forEach((item1)=>{
                                            //@ts-ignore
                                            if (item1.className !== undefined){
                                                //@ts-ignore
                                                if (item1.className.includes('dropdawn_arrowDown')){
                                                    //@ts-ignore
                                                    item1.style.transform = 'rotate(0deg)'
                                                }
                                            }
                                            
                                        })
                                    } 
                                    //@ts-ignore
                                    if (item.className.includes('dropdawn_list')){
                                        
                                        //@ts-ignore
                                        item.style.display = 'none'
                                    }
                                })
                            }
                    } 
                }
                
            }}>
                {props.placeholder}
                <div ref={myRef} className={styles.arrowDown}></div>
            </div>
            {hideList && <div className={styles.list}>
                <div className={styles.container_list_input} style={{padding: '4px'}}>
                    <input className={styles.list_input} type="text" 
                            value={searchString} 
                            placeholder='Поиск'
                            onChange={e => setSearchString(e.target.value)}/>
                    {/* <button className={styles.btn_send} onClick={()=>{sendDate()}}></button>         */}
                </div>
                { props.isChoosingAll && 
                    <div className={styles.checkAll} key={`keyAll${keyAll}`}>
                        <input  
                                type="checkbox"
                                onChange={()=>{cliskToAll()}}
                                id={`all`}
                                checked={isAll()}
                            />
                        <label htmlFor={`all`}>{"Все"}</label>
                    </div>
                }
                {Boolean(props.list[0].parrentId) && <div className='dropdownList' style={{display: 'flex', flexDirection: 'column'}}>{doingRangerList(props.list)}</div>}
                {!Boolean(props.list[0].parrentId) && <div key={`keyList${keyList}`} className='dropdownList' style={{display: 'flex', flexDirection: 'column'}}>{list}</div>}
            </div>}
        </div>
    )
}

export default Dropdawn