import React from "react";


const MovieCard = ({ movie }) => {
    return (
        <>
            <figure className="movie">
                <div className="movie__hero">
                    <img src={(movie.poster_path)?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:`./rmovie/src/logo.svg`} alt="Rambo" className="movie__img" />
                </div>
                <div className="movie__content">
                    <div className="movie__title">
                        <h1 className="heading__primary">{movie.title} <i className="fas fa-fire"></i></h1>
                        {/* <div className="movie__tag movie__tag--1">#{movie.genres[0].name}</div> */}
                    </div>
                    <p className="movie__description">{movie.overview}</p>
                    <div className="movie__details">
                        <p className="movie__detail"><span className="icons icons-red"><i className="fas fa-camera-retro"></i> </span>AVG Rate : {movie.vote_average}</p>
                        <p className="movie__detail"><span className="icons icons-grey"><i className="fas fa-clock"></i> </span>Release date : {movie.release_date}</p>
                        <p className="movie__detail"><span className="icons icons-yellow"><i className="fas fa-file-invoice-dollar"></i></span>Original Language : {(movie.original_language == 'en'?'English':movie.original_language)}</p>
                    </div>
                </div>
                <div className="movie__price">popularity {movie.popularity}</div>
            </figure>
        </>
    )
}

export default MovieCard;


