import React from 'react'
// import './Search.css'

const Search = ({ searchTerm, searchKeyword }) => {



    const getSearchTerm = (event) => {
        //console.log(event.target.value);
        searchKeyword(event.target.value);
    }

    return (
        <div className='d-flex justify-content-center'>
            <span>
                <input className="searchInput"
                    placeholder="Search case title"
                    value={searchTerm}
                    onChange={getSearchTerm}
                />
            </span>


        </div>
    )
}

export default Search