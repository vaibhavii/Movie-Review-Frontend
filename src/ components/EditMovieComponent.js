import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {updateMovieDetails, getOmdnMovieDetails} from '../services/MovieService';


function EditMovieComponent(props){


    useEffect(()=> {
        setName(props.movie.MovieName);
        setGenre(props.movie.Genre);
        setImage(props.movie.ImageUrl);
        setLanguage(props.movie.Language);
        setDesc(props.movie.Description);
        setActors(props.movie.Actors);
        setDirector(props.movie.Director);
        setReleaseDate(props.movie.ReleaseDate);
        console.log(props.movie.ReleaseDate);
        setBoxOffice(props.movie.BoxOfficeCollection);
        setRuntime(props.movie.LongMinutes);
        setCountry('United States');
        setPoster(props.movie.ImageUrl);
        setWriter(props.movie.Writer);
    },[])

    const [ name, setName ] = useState("");
    const [ genre, setGenre ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ runtime, setRuntime ] = useState("");
    const [ boxOffice, setBoxOffice ] = useState(0);
    const [ writer, setWriter ] = useState("");
    const [ director, setDirector ] = useState("");
    const [ actors, setActors ] = useState("");
    const [ releaseDate, setReleaseDate ] = useState(new Date());
    const [ language, setLanguage ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ image, setImage ] = useState("");
    const [ poster, setPoster ] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const updateMovie = () => {

        var movie = {
            Name: name,
            Description: desc,
            releaseDate: releaseDate,
            LongMinutes: runtime,
            ImageUrl: image,
            Genre: genre,
            BoxOffice: boxOffice,
            Writer: writer,
            Director: director,
            Actors: actors,
            LanguageMovie: language,
            Country: country,
            id: props.movie.MovieID,
        }

        console.log(movie);

        updateMovieDetails(movie).then( response => { 
            if(response.message){
                toast.success('Movie Added Successfully!', {
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

    return(
        <div className="container-add-movie">
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
            <h4 className="mb-4"> EDIT MOVIE </h4>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="row">
                        Movie Title
                    </div>
                    <div className="row">
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                    <div className="row">
                        Genre
                    </div>
                    <div className="row">
                        <input type="text" value={genre} onChange={(e)=>{setGenre(e.target.value)}}></input>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="row">
                        Runtime
                    </div>
                    <div className="row">
                        <input value={runtime} onChange={(e)=>{setRuntime(e.target.value)}}></input>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                    <div className="row">
                        Box Office Collection
                    </div>
                    <div className="row input-icon">
                        <input type="number" value={boxOffice} onChange={(e)=>{setBoxOffice(e.target.value)}}/>
                        <i>$</i>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="row">
                        Writer
                    </div>
                    <div className="row">
                        <input value={writer} onChange={(e)=>{setWriter(e.target.value)}}></input>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                    <div className="row">
                        Director
                    </div>
                    <div className="row">
                        <input type="text" value={director} onChange={(e)=>{setDirector(e.target.value)}}/>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="row">
                        Actors
                    </div>
                    <div className="row">
                        <input value={actors} onChange={(e)=>{setActors(e.target.value)}}></input>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                    <div className="row">
                        Language
                    </div>
                    <div className="row">
                        <input type="text" value={language} onChange={(e)=>{setLanguage(e.target.value)}}/>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-5">
                    <div className="row">
                        Release Date
                    </div>
                    <div className="row">
                        <input type="date" format="yyyy-mm-dd" selected={releaseDate} value={releaseDate} 
                            onChange={(e)=>{
                                setReleaseDate(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                    <div className="row">
                        Country
                    </div>
                    <div className="row">
                        <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
                    </div>
                </div>
            </div>
            <div className="row">
                Description
            </div>
            <div className="row mb-2">
                <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
            </div>
            <div className="row">
                Image Url
            </div>
            <div className="row mb-4">
                <div className="col-9">
                    <div className="row">
                        <input value={image} onChange={(e)=>{setImage(e.target.value); setPoster(e.target.value);}}></input>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-2">
                    <div className="row">
                        <button type="button" className="btn btn-dark pos-button" onClick={()=>{setShow(true);}}>Preview Image</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <button type="button" className="btn btn-danger btn-size" onClick={()=>{updateMovie();}}>Update</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={poster}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{handleClose()}}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default EditMovieComponent;