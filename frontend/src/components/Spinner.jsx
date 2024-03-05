import { ColorRing } from 'react-loader-spinner'
import './Navigation/Navigation.css'

const Spinner = () => {
    return (
        <div>
            <ColorRing visible={true} height="150" width="150" ariaLabel='loading' wrapperStyle={{}} wrapperClass='colorRing' colors={["#741cb8", "#1ab027", "#0f55bd", "#bd0f0f", "#fce303"]} />
        </div>
    )
}

export default Spinner;
