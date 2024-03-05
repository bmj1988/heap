import { FaSearch } from 'react-icons/fa'


const SearchBar = () => {
    return (<div className='searchBar textmark' onClick={() => alert('Feature coming soon!')}>
        <FaSearch className='searchIcon'/>
        <input type='text' className='noStyle' placeholder='Search near you'/>
    </div>)
}

export default SearchBar
