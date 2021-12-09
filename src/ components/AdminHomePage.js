import React, { useState, useEffect } from 'react';
import {getMovieDetails, deleteMovie, searchMovie} from '../services/MovieService';
import {getFavs, addFav, deleteFav} from '../services/FavoriteService';
import {getReviewsByMovie, getReviewsByMovieAndUser, addReview, editReview, deleteReview} from '../services/ReviewService';
import '../styles/login.css';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faFilm } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditMovieComponent from './EditMovieComponent';
import MovieDescription from './MovieDescription';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminHomePage() {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState(0);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [showDesc, setShowDesc] = useState(false);
    const [currMovie, setCurrMovie] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [userReview, setUserReviews] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);


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

    const goBackMovie = () => {
        setShowDesc(false);
        setCurrMovie({});
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

    const onSearch = () => {
        searchMovie(searchInput).then(res=>{
            if(res.length != 0 ){
                setMovies(res);
            } else {
                toast.error('No such movies found', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    const addFavorite = () => {

        const fav = {
            UserId: window.sessionStorage.getItem("user"),
            MovieID: currMovie.MovieID
        }

        addFav(fav).then(res=>{
            if (window.sessionStorage.getItem("user") != "admin"){
                getFavs(currMovie.MovieID, window.sessionStorage.getItem("user")).then(res=>{
                    console.log(res);
                    setUserFavorites(res);
                })
            }
        })
    }

    const deleteFavorite = () => {

        deleteFav(userFavorites[0].FavoriteId).then(res=>{
            if (window.sessionStorage.getItem("user") != "admin"){
                getFavs(currMovie.MovieID, window.sessionStorage.getItem("user")).then(res=>{
                    setUserFavorites(res);
                })
            }
        })

    }

    const addReviewByUser = (rating, review) => {
        var review = {
            Rating: rating,
            Review: review,
            UserId: window.sessionStorage.getItem("user"),
            MovieID: currMovie.MovieID
        }

        addReview(review).then(res=>{
            console.log(res);
        })
        getReviewsByMovie(currMovie.MovieID).then(res=>{
            setAllReviews(res);
        })
        if (window.sessionStorage.getItem("user") != "admin"){
            getReviewsByMovieAndUser(currMovie.MovieID, window.sessionStorage.getItem("user")).then(res=>{
                setUserReviews(res);
            })
        }
    }

    const editReviewByUser = (rating, review, id) => {
        var review = {
            id: id,
            Rating: rating,
            Review: review,
        }

        console.log(review);

        editReview(review).then(res=>{
            console.log(res);
        })
        getReviewsByMovie(currMovie.MovieID).then(res=>{
            setAllReviews(res);
        })
        if (window.sessionStorage.getItem("user") != "admin"){
            getReviewsByMovieAndUser(currMovie.MovieID, window.sessionStorage.getItem("user")).then(res=>{
                setUserReviews(res);
            })
        }
    }

    const deleteReviewByUser = (id) => {
        deleteReview(id).then(res=>{
            console.log(res);
        })
        getReviewsByMovie(currMovie.MovieID).then(res=>{
            setAllReviews(res);
        })
        if (window.sessionStorage.getItem("user") != "admin"){
            getReviewsByMovieAndUser(currMovie.MovieID, window.sessionStorage.getItem("user")).then(res=>{
                setUserReviews(res);
            })
        }
    }

    const getReviewsForMovie = (id) => {
        getReviewsByMovie(id).then(res=>{
            setAllReviews(res);
        })
    }

    const getReviewsForMovieUser = (id) => {
        if (window.sessionStorage.getItem("user") != "admin"){
            getReviewsByMovieAndUser(id, window.sessionStorage.getItem("user")).then(res=>{
                setUserReviews(res);
            })
        }
    }

    const getFavoritesForMovieUser = (id) => {
        if (window.sessionStorage.getItem("user") != "admin"){
            getFavs(id, window.sessionStorage.getItem("user")).then(res=>{
                setUserFavorites(res);
            })
        }
    }

    useEffect(()=>{
        getMovieDetails().then( response => { 
            setMovies(response);
        });
    },[])

    return(
        <div>
            <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    {/* Same as */}
            <ToastContainer />
            <div className="row nav">
                    <div className="col-2 nav-title">
                            MovieDB
                    </div>
                    <div className="col-6 pt-2">
                        <input className="input-search" placeholder="Search Movie.." value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}></input>
                    </div>
                    <div className="col-2 pt-1">
                        <button className="btn btn-danger" onClick={()=>{onSearch();}}>Search</button>
                    </div>
                    <div className="col-2 pt-1">
                        <button className="btn btn-danger" onClick={()=>{window.sessionStorage.removeItem("user"); navigate('/')}}>Sign Out</button>
                    </div>
            </div>
            {
                showEdit &&
                <div>
                    <EditMovieComponent movie={selectedMovie}></EditMovieComponent>
                </div>
            }
            {
                showDesc &&
                <div>
                    <MovieDescription deleteFav={deleteFavorite} addFavForUser={addFavorite} favorites={userFavorites} movie={currMovie} delete={deleteReviewByUser} edit={editReviewByUser} add={addReviewByUser} reviews={allReviews} reviewForUser={userReview} goBack={goBackMovie}></MovieDescription>
                </div>
            }
            { (!showEdit && !showDesc) &&
             <div className="container pt-4">
                <div className="row">
                    { window.sessionStorage.getItem("user") == "admin" &&
                    <div className="col-3 add-movie-button">
                        <button type={"button"} className="btn btn-danger" onClick={()=>{navigate('/admin/movie')}}>Add Movie</button>
                    </div>
                    }
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
                        <div key={i} className="col mt-4 pt-4 card-movie" >
                            <a onClick={()=>{
                                    getReviewsForMovie(movie.MovieID);
                                    getReviewsForMovieUser(movie.MovieID);
                                    getFavoritesForMovieUser(movie.MovieID);
                                    setShowDesc(true);
                                    setCurrMovie(movie);
                                    }}><img className="imageHome" src={movie.ImageUrl}/></a>
                            <div className="titleMovie">
                                <span>{movie.MovieName}</span>
                                { window.sessionStorage.getItem("user") == "admin" && <FontAwesomeIcon className="icons-update" icon={faEdit} onClick={()=>{setSelectedMovie(movie); setShowEdit(true);}}/>}
                                { window.sessionStorage.getItem("user") == "admin" && <FontAwesomeIcon className="icons-update" icon={faTrash} onClick={()=>{ setShow(true); setDeleteId(movie.MovieID);}}/>}
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