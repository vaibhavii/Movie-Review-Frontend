import React, { useState, useEffect } from 'react';
import {getMovieDetails, deleteMovie} from '../services/MovieService';
import '../styles/login.css';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditMovieComponent from './EditMovieComponent';


function AdminHomePage() {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState(0);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});

    const deleteMovieById = (id) => {
        deleteMovie(id).then(response => {
            console.log(response);
        })
        getMovieDetails().then( response => { 
            setMovies(response);
        });
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleNo = () => {
        setDeleteId(0);
        setShow(false);
    }

    const handleYes = () => {
        deleteMovieById(deleteId);
        setShow(false);
        getMovieDetails().then( response => { 
            setMovies(response);
        });
    }


    useEffect(()=>{
        getMovieDetails().then( response => { 
            setMovies(response);
        });
    },[])

    return(
        <div>
            {
                showEdit &&
                <div>
                    <EditMovieComponent movie={selectedMovie}></EditMovieComponent>
                </div>
            }
            { !showEdit &&
             <div className="container pt-4">
                <div className="row">
                    <div className="col-3 add-movie-button">
                        <button type={"button"} className="btn btn-danger" onClick={()=>{navigate('/admin/movie')}}>Add Movie</button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this movie?
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleNo()}}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{handleYes()}}>
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="row">
                    {movies.map((movie, i) => 
                        <div key={i} className="col mt-4 pt-4 card-movie" onClick={()=>{console.log("hi");}}>
                            <img className="imageHome" src={movie.ImageUrl}/>
                            <div className="titleMovie">
                                <span>{movie.MovieName}</span>
                                <FontAwesomeIcon className="icons-update" icon={faEdit} onClick={()=>{setSelectedMovie(movie); setShowEdit(true);}}/>
                                <FontAwesomeIcon className="icons-update" icon={faTrash} onClick={()=>{ setShow(true); setDeleteId(movie.MovieID);}}/>
                            </div>
                            <div>
                            { movie.AVG_RATING != null &&
                                <StarRatings
                                    rating={movie.AVG_RATING}
                                    starRatedColor="red"
                                    numberOfStars={10}
                                    name='rating'
                                    starDimension="12px"
                                    starSpacing="1px"
                                />
                            }
                            { movie.AVG_RATING == null &&
                                <StarRatings
                                    rating={0}
                                    starRatedColor="red"
                                    numberOfStars={10}
                                    name='rating'
                                    starDimension="12px"
                                    starSpacing="1px"
                                />
                            }
                            <span className="rating">({movie.TotalReviews}</span>
                            { movie.TotalReviews == 1 &&
                                <span className="rating">&nbsp;Review)</span>
                            }
                            { movie.TotalReviews != 1 &&
                                <span className="rating">&nbsp;Reviews)</span>
                            }
                            </div>
                </div>
                )}
            </div>
        </div>
}
        </div>
    );

}

export default AdminHomePage; 