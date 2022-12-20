import React from 'react'

const Posts = ({posts,loading}) => {
    if(loading){
        return <h2>Loading...</h2>;
    }
  return (
    <>
        {posts.map(post=>{
            return(
                <div className="cards-wrapper mx-3" key={post.id}>
                <div className="card" key={post.id}>
                        <div className="Cards d-none d-md-block">
                            <div className="card-body">
                                <h5 className="card-title mb-0">{post.title}</h5>
                            </div>
                            <ul className="list-group list-group-flush" key={post.id}>
                                <li className="list-group-item"></li>
                                <li className="list-group-item"> Description:{post.description}</li>
                                <li className="list-group-item"> Date of Theft:{post.date_stolen}</li>
                                <li className="list-group-item"> Case Reported:{post.year}</li>
                                <li className="list-group-item"> stolen_location:{post.stolen_location}</li>
                            </ul>
                        </div>
                    </div>
                    </div>
       ) })}

    </>
   
  )
}

export default Posts