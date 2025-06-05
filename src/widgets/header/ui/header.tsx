import styles from './header.module.scss'
import classNames from 'classnames'
import iconExit from '../../../shared/icons/icon _exit.svg'
import { useNavigate } from "react-router-dom";
import { Logout } from '@mui/icons-material'

const Header = (props: {
                    supportMsg: string,
                    downloadApp: boolean,
                    iconExit: boolean,
                    email: string
                }) => {

    const navigate = useNavigate();
    
    function Logout(){
        window.localStorage.setItem('accessToken', 'null')
        navigate(`/login`);
    }
                    
    return (
        <div className={styles.wrapper}>

            <div className={styles.left}>
                <div className={styles.textHeader}>
                Продимекс Контроль
                </div>
                {props.iconExit &&<div className={styles.text}>
                    {props.supportMsg}
                </div>}
            </div>
            {props.iconExit && 
            <div className={styles.right}>
                <div style={{marginRight: '25px', display:'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{alignItems: 'center', fontSize: '14px', }}>{props.email}</span>
                    {props.downloadApp && <button className={styles.btnGreen}>Скачать мобильное приложение</button>}
                </div>
                <div>
                    <button className={styles.btnLogout} onClick={()=>{Logout()}}>
                        {/* <object style={{cursor: 'pointer'}} type="image/svg+xml" data={iconExit} />  */}
                    </button>
                </div>
            </div>
            }
        </div>
    )
}

export default Header