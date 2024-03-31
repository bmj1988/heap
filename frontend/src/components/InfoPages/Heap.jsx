import { FaCube, FaCubes, FaEquals, FaPlus, FaRegMoneyBillAlt } from 'react-icons/fa'
import './infopages.css'

const HeapMS = () => {
    return (
        <div className="msMain textmark">
            <h2>What is Heap?</h2>
            <p> Simply put, an online market. Every day hundreds of thousands of tons of scrap exchanges hands. The people selling it (vendors)
                want to know what a fair price for their material is, and the people buying it (agents) want to know
                who wants to sell it. That's where Heap comes in.</p>
            <p>
                For Vendors, Heap publishes online listings. These listings can be as small as a pile of cast iron rotors
                or as large as a cargo container of aluminum alloy. It only takes seconds to upload a few pictures of what you're
                try to sell, put in an address for the sale, and provide an asking price -- then your sale is published to every
                Agent with a heap account. The agents will send you offers for your listing, and you accept whichever you like.
                You can message any agent who places a bid at any time to get clarification or negotiate on price, and their profiles
                will be available so you can look at all their advertised prices. Once you accept a bid, the address for the listing
                is sent to the agent who placed the winning bid.By using the address provided for the listing, we match you with the
                agents closest to you - minimizing the time between posting your listing and selling it. That's it!
            </p>
            <p>
                For Agents, Heap aggregates all your local metal sales in the palm of your hand, and allows you to instantly bid on listings.
                Know you're going to be in an area tomorrow? Scan the listings there the night before, place some offers, and have deals lined
                up before you leave for work. Our card system lets you publically post your prices to your profile so you can advertise to vendors
                looking to sell a certain material.
            </p>
            <p>
                For everyone involved, Heap is dedicated to using over 15 years of industry experience to craft a platform that makes it easier
                and more lucrative to do what you do.
            </p>
            <div className='msIcons'>
                <FaCube className='heapPurple'/> <FaPlus /> <FaCubes className='heapPurple' /> <FaEquals /> <FaRegMoneyBillAlt className='accept'/>
            </div>
        </div>
    )
}

export default HeapMS
