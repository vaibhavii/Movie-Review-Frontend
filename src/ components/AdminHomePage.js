import React, { useState, useEffect } from 'react';
import {getMovieDetails} from '../services/MovieService'

function AdminHomePage() {

    const [movies, setMovies] = useState([]);


    useEffect(()=>{
        getMovieDetails().then( response => { 
            setMovies(response);
            console.log(response);
        });
    },[])

    return(
        <div>
             {movies.map((movie, i) => 
                <div key={i}>
                    <img src={movie.ImageUrl}/>
                </div>
            )}
        </div>
    );

}

export default AdminHomePage; 