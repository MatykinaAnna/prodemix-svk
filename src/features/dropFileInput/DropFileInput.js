// DropFileInput.jsx
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DropFileInput.module.scss'

import { ImageConfig } from './ImageConfig.js';

const DropFileInput = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        console.log(e.target.files[0])
        console.log(e.target.files[1])

        const updatedList = [];

        if (fileList.length>0){
            updatedList.push(fileList[0])
        }

        const newFile = e.target.files[0];
        console.log(newFile.type)
        if (newFile.type == 'text/plain' || newFile.type == 'video/mp4') {
            updatedList.push(newFile)          
        }

        if (e.target.files[1] != undefined){
            const newFile = e.target.files[1];
            console.log(newFile.type)
            if (newFile.type == 'text/plain' || newFile.type == 'video/mp4') {
                updatedList.push(newFile)   
            }
        }

        setFileList(updatedList);
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        
    }


    return (
        <>
            <div
                ref={wrapperRef}
                className={fileList.length<2 ? styles.drop_file_input : styles.drop_file_input1}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className={styles.drop_file_input__label}>
                    <p>Открыть файлы</p>
                </div>
                
                <input disabled={fileList.length>=2} type="file" multiple="multiple" accept=".txt, .mp4" value="" onChange={onFileDrop} />
                
            </div>
            
            {
                fileList.length > 0 ? (
                    <div className={styles.drop_file_preview}>

                        
                            <>
                                {fileList.map((item, index) => (
                                        <div key={index} className={styles.drop_file_preview__item}>
                                            <img src={ImageConfig[item.type.split('/')[1]] ||
                                                ImageConfig['default']} alt="" />
                                            <div className={styles.drop_file_preview__item__info}>
                                                <p>{item.name}</p>
                                                <p>{item.size}B</p>
                                            </div>
                                            <span className={styles.drop_file_preview__item__del}
                                                onClick={() => fileRemove(item)}>
                                                x
                                            </span>
                                        </div>
                                    ))
                                }
                                {fileList.length == 2 && <div className={styles.btn_ok} >
                                    <p onClick={()=>{
                                        const updatedList = [...fileList];
                                        props.onFileChange(updatedList)
                                    }}>Готово</p>
                                </div>}
                            </>
                        
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
