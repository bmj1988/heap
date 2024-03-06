import { ColorRing } from 'react-loader-spinner'
import './Navigation/Navigation.css'

const Spinner = () => {
    return (
        <div className='spinner'>
            <ColorRing visible={true} height="200" width="200" ariaLabel='loading' wrapperStyle={{}} wrapperClass='colorRing' colors={["#741cb8", "#1ab027", "#0f55bd", "#bd0f0f", "#fce303"]} />
        </div>
    )
}

export default Spinner;
