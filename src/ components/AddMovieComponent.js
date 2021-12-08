import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import {addMovieDetails, getOmdnMovieDetails} from '../services/MovieService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddMovieComponent() {

    const [ name, setName ] = useState("");
    const [ genre, setGenre ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ runtime, setRuntime ] = useState("");
    const [ boxOffice, setBoxOffice ] = useState(0);
    const [ writer, setWriter ] = useState("");
    const [ director, setDirector ] = useState("");
    const [ actors, setActors ] = useState("");
    const [ releaseDate, setReleaseDate ] = useState(new Date('1995-12-17T03:24:00'));
    const [ language, setLanguage ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ image, setImage ] = useState("");
    const [ poster, setPoster ] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = (isUse) => {
        if(isUse == "image") {
            setShow(false);
            setImage(poster);
        } else {
            setShow(false);
        }
    }
    const handleShow = () => setShow(true);

    const findImage = () => {
        if( name != "" ){
            getOmdnMovieDetails(name).then(response => {
                if(response.hasOwnProperty("Poster")){
                    setShow(true);
                    setPoster(response["Poster"]);
                }
            })
        } else {
            toast.error('Enter movie title to find an image', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const addMovie = () => {

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
            Country: country
        }

        console.log(movie);

        addMovieDetails(movie).then( response => { 
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
                setName("");
                setReleaseDate(new Date());
                setWriter("");
                setDirector("");
                setActors("");
                setDesc("");
                setRuntime("");
                setBoxOffice(0);
                setLanguage("");
                setCountry("");
                setImage("");
                setGenre("");
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
            <h4 className="mb-4"> ADD MOVIE </h4>
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
                        <input type="date" defaultValue={releaseDate} 
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
                        <input value={image} onChange={(e)=>{setImage(e.target.value)}}></input>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-2">
                    <div className="row">
                        <button type="button" className="btn btn-dark pos-button" onClick={()=>{findImage();}}>Find Image</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <button type="button" className="btn btn-danger btn-size" onClick={()=>{addMovie();}}>Add Movie</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={poster}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{handleClose("")}}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={()=>{handleClose("image")}}>
                    Use this image
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )


}

export default AddMovieComponent; ; 