import React, { useState, useEffect } from 'react'
import Posts from "./Posts.js"
import { Paginationcomponent } from './Paginationcomponent.js';
import Search from './Search.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
// import Dateselection from './Dateselection.js';

const Datafetch = () => {
    const [posts, setposts] = useState([]);
    const [loading, setloading] = useState(false);
    const [errorState, seterrorState] = useState(false)
    const [currentpage, setcurrentpage] = useState(1);
    const [postsperpage] = useState(10);

    const [searchTerm, setsearchterm] = useState('')
    const [searchResults, setSearchResults] = useState([]);


    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();


    useEffect(() => {
        try {
            const FetchingApi = async () => {
                setloading(true)
                return await fetch("https://bikeindex.org/api/v3/search")
                    .then((res) => res.json())
            }
            return () => {
                FetchingApi().
                    then(({ bikes }) => {
                        setposts(bikes)
                        setloading(false);
                    })
            }
        } catch (error) {
            console.log(error)
            seterrorState(error)
        }
    }, [])
    // console.log(posts)

    //Get current Posts

    const Indexoflastpost = currentpage * postsperpage;
    const indexoffirstpost = Indexoflastpost - postsperpage;
    const currentposts = posts.slice(indexoffirstpost, Indexoflastpost);

    //change page

    const paginate = (pageNumber) => setcurrentpage(pageNumber)

    // Search With Partial Title
    const searchHandler = (searchTerm) => {
        setsearchterm(searchTerm);

        if (searchTerm !== "") {
            const result = posts.filter((bike) => {
                return bike.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
            if (result !== null) {
                setSearchResults(result);
            } else {
                <h2>No Results</h2>
            }

        } else {
            setSearchResults(posts);
        }
        console.log(searchResults)

    };

    const onChangeHandler = (value) => {
        setDateStart(value[0]);
        setDateEnd(value[1]);
        dateRangeHandler(dateStart, dateEnd);
    }

    const dateRangeHandler = (dateStart, dateEnd) => {
        setDateStart(dateStart);
        setDateEnd(dateEnd)
        const filteredData = posts.filter((bike) => {
            if (bike.dateoftheft >= dateStart && bike.dateoftheft <= dateEnd) {
                return bike;
            } else {
                return null;
            }
        })
        setSearchResults(filteredData);
        console.log(filteredData);
    }

    return (
        <>
            <Search searchTerm={searchTerm} searchKeyword={searchHandler} dateRangeHandler={dateRangeHandler} />
            <div className='datediv'>
                <DatePicker
                    id="dateStartEnd"
                    selectsRange={true}
                    startDate={dateStart}
                    endDate={dateEnd}
                    onChange={onChangeHandler}
                    dateFormat="dd-MM-yyyy"
                    className={'form-control form-control-sm'}
                    showDisabledMonthNavigation
                    placeholderText='Pick date range'
                />
            </div>
            <div className='totalCases' >
                <span className='cases'><h3>Total Cases: {posts.length}</h3></span>
            </div>

            <div className='container'>
                <h1 className='text-primary-mb-3'>Total cases</h1>
                {/* <Posts posts={currentposts} loading={loading}/> */}
                {/* <Paginationcomponent postsperpage={postsperpage} totalposts={posts.length} paginate={paginate}/> */}
                <Posts posts={searchTerm.length < 1 ? currentposts : searchResults}
                    loading={loading} errorState={errorState} />
                <Paginationcomponent postsperpage={postsperpage} totalposts={posts.length} paginate={paginate} />

            </div>
        </>
    )
}

export default Datafetch