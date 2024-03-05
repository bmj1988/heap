import { FaCubes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export const LogoDiv = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const click = () => {
        if (location.pathname !== '/') {
            navigate('/')
            return
        }
    }
    return (
        <div className='logoDiv' onClick={() => click()}>
            <FaCubes className='heapPurple logo' />
            <p className="logoStyling ">
                heap
            </p>
        </div>
    )
}
