import { FaCube } from 'react-icons/fa'
import '../main.css'
import PurpleOutlineDiv from './BoxDiv'

const MainNoUser = () => {
    return (
        <div className='noUserMain'>
            <PurpleOutlineDiv boldText={'Create a vender account'} smallText={"Put a listing up for sale and have agents bid on it with the click of a button."} logo={<FaCube className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv firstDiv'} clicker={null}/>
            <PurpleOutlineDiv boldText={'Create an agent account and start bidding today'} smallText={"Get access to all the listings posted in your area."} logo={<FaCube className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv'} clicker={null}/>
            <PurpleOutlineDiv boldText={'Access information for all your local metal buyers'} smallText={"Track global and local metal and parts prices so you can decide when to sell"} logo={<FaCube className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv'} clicker={null}/>
            <PurpleOutlineDiv boldText={'About Heap'} smallText={"We connect buyers with sellers --  it's that simple. But you can click to learn more anyway."} logo={<FaCube className='cube heapPurple' />} css={"purpleOutlineDiv colorDiv lastDiv"} clicker={null}/>
        </div>
    )
}

export default MainNoUser
