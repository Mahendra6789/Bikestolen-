import React, { useState } from 'react'
// import Datepicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css'
// import "./styles/Header.css"

// const Dateselection = () => {
//   const [selectedDate, setSelectedDate] = useState(null)
//   return (
//     <>
//     <div>
//       <div>
//         <div className='Dateselection'>
//         {/* <input type="text" placeholder='search case description' /> */}
//       <span className='rangeselection'>From</span>
//         <Datepicker selected={selectedDate} onChange={Date => { setSelectedDate(Date) }} dateFormat="dd/MM/yyyy" isClearable showYearDropdown showMonthDropdown scrollableMonthYearDropdown />
       
//         <span className='rangeselection'>To</span>
//         <Datepicker selected={selectedDate} onChange={Date => { setSelectedDate(Date) }} dateFormat="dd/MM/yyyy" isClearable showYearDropdown showMonthDropdown scrollableMonthYearDropdown />
//         <button >Find cases</button></div>
//       </div>
      
      
//     </div>
//     </>
//   )
// }

// export default Dateselection

import React, { useState, useEffect, useRef } from 'react'
import { DateRange } from 'react-date-range';
import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateComponent = (handleDateFilter) => {

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection"
        }
    ]);

    // open & close date range picker
    const [open, setOpen] = useState(false);

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        // console.log(e.key)
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        console.log(refOne.current)
        console.log(e.target)
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }



    return (
        <div className="calenderWrap">
            <label>Select Date Range: </label>
            <input
                value={` From ${format(range[0].startDate, "MM/dd/yyyy")} To ${format(range[0].endDate, "MM/dd/yyyy")}`}
                readOnly
                className="inputBox"
                onClick={() => setOpen(open => !open)}
            />
            <button type='button' onClick={handleDateFilter}>Find Cases</button>
            <div ref={refOne}>
                {open &&
                    <DateRange editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="horizontal"
                        className="calendarElement"
                        onChange={item => setRange([item.selection])}


                    />
                }

            </div>
        </div>
    )
}

export default DateComponent;