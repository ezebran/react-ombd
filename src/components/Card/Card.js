import React from 'react'

const Card = ({movie}) => {
    return(
        <div className="col-md-4">
            <div className="card">
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} width="100"></img>
                <div className="card-body">
                    <h4>{movie.Title} {movie.Year}</h4>
                    <p>{movie.Type}</p>
                </div>
            </div>
        </div>
    )
}

export default Card