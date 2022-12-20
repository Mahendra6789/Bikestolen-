import React from 'react'

export const Paginationcomponent = ({postsperpage,totalposts,paginate}) => {
    const Pagenumbers =[];
    for(let i=1;i<=Math.ceil(totalposts/postsperpage);i++){
        Pagenumbers.push(i);
    }
  return (
    <>
    <ul className='pagination'>
        {Pagenumbers.map(number =>{
            return(
            <li key={number} className="page-item">
                <a onClick={()=>  paginate(number)} href="!#" className='page-link'>
                    {number}
                </a>
            </li>
        )})}
    </ul>
    </>
  )
}
