import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import '../styles/login.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactStars from "react-rating-stars-component";

function MovieDescription(props) {

    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [edit, setEdit] = useState("");
    const [showDelete, setShowDelete] = useState(false);

    useEffect(()=>{
        if(props.reviewForUser.length != 0){
            setRating(props.reviewForUser[0].Rating);
            setReview(props.reviewForUser[0].Review);
        }
    },[props.reviewForUser])

    const handleClose = () => {
        setShow(false);
    }

    const handleCancel = () => {
        setShowDelete(false);
    }

    const okClick = () => {
        props.delete(props.reviewForUser[0].ReviewId);
        setReview("");
        setRating(0);
        setShowDelete(false);
    }

    const addReview = () => {
        if(edit == "add"){
            props.add(rating, review);
            setShow(false);
        } else {
            props.edit(rating,review,props.reviewForUser[0].ReviewId);
            setShow(false);
        }
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
      };

    return(
        <div className="container pt-4 pb-4">
            <div className="row">
                <button className="btn btn-dark backButton" onClick={()=>{props.goBack()}}>Go Back</button>
                <h4 className="pt-4">{props.movie.MovieName}</h4>
            </div>
            <Modal show={showDelete} onHide={handleCancel}>
                    <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete your review?
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleCancel()}}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{okClick()}}>
                        Yes
                    </Button>
                    </Modal.Footer>
            </Modal>
            <Modal className="add-edit-modal" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <div className="container">
                         <div className="row pt-2">
                             <div className="col-2"></div>
                             <div className="col-1"></div>
                             <div className="col-9">
                             <ReactStars
                                    count={10}
                                    onChange={ratingChanged}
                                    size={24}
                                    value={rating}
                                    isHalf={true}
                                    activeColor='#ff0000e6'
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />   
                             </div>
                         </div>
                         <div className="row pt-2">
                             <div className="col-2">Review</div>
                             <div className="col-1"></div>
                             <div className="col-9"><textarea onChange={(e)=>{setReview(e.target.value);}} className="textarea-review-add" value={review}/></div>
                         </div>
                       </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleClose()}}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{addReview();}}>
                        Review
                    </Button>
                    </Modal.Footer>
            </Modal>
            <div className="row pt-2">
                <div className="col-3">
                    <img src={props.movie.ImageUrl}/>
                    <StarRatings
                            rating={props.movie.AVG_RATING}
                            starRatedColor="red"
                            numberOfStars={10}
                            name='rating'
                            starDimension="15px"
                            starSpacing="1px"
                    />
                    <span className="rating"><b>({props.movie.TotalReviews}</b></span>
                            { props.movie.TotalReviews == 1 &&
                                <span className="rating"><b>&nbsp;Review)</b></span>
                            }
                            { props.movie.TotalReviews != 1 &&
                                <span className="rating"><b>&nbsp;Reviews)</b></span>
                            }
                </div>
                <div className="col-1"></div>
                <div className="col-8">
                    <div className="container">
                        <div className="row pt-4">
                            <div className="col-2">Description:</div>
                            <div className="col-10">{props.movie.Description}</div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-2">Genre:</div>
                            <div className="col-10">{props.movie.Genre}</div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-2">ReleaseDate:</div>
                            <div className="col-10">{props.movie.ReleaseDate.split("T")[0]}</div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-2">Runtime:</div>
                            <div className="col-10">{props.movie.LongMinutes}</div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-2">Actors:</div>
                            <div className="col-10">{props.movie.Actors}</div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-2">Director:</div>
                            <div className="col-10">{props.movie.Director}</div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-2">Writer:</div>
                            <div className="col-10">{props.movie.Writer}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-4">
                <b><h4 className="reviews-title">Reviews</h4></b>
            </div>
            <div className="row pt-2">
            { window.sessionStorage.getItem("user") != "admin" && props.reviewForUser.length != 0 &&
                <div className="pt-2">
                    <div className="row pb-2">
                        <button className="btn btn-danger add-edit-review-btn" onClick={()=>{setEdit("edit");setShow(true);}}>Edit Review</button>
                        <button className="btn btn-danger add-edit-review-btn" onClick={()=>{setShowDelete(true);}}>Delete Review</button>
                    </div>
                    <div className="row pb-2">
                        <b>{props.reviewForUser[0].Username}</b>
                        <span>
                        <StarRatings
                            rating={props.reviewForUser[0].Rating}
                            starRatedColor="red"
                            numberOfStars={10}
                            name='rating'
                            starDimension="15px"
                            starSpacing="1px"
                    />
                        </span>
                    </div>
                    <div className="row">
                        <textarea className="text-area-review" readOnly={true} value={props.reviewForUser[0].Review}></textarea>
                    </div>
                </div>
            }
            { window.sessionStorage.getItem("user") != "admin" && props.reviewForUser.length == 0 &&
                <button className="btn btn-danger add-edit-review-btn" onClick={()=>{setEdit("add");setShow(true);}}>Add Review</button>
            }
            </div>
            <div className="row pt-2">
                {props.reviews.map((review, i) => 
                    window.sessionStorage.getItem("user") != review.UserId &&
                    <div key={i} className="pt-2">
                        <div className="row pb-2">
                            <b>{review.Username}</b>
                            <span>
                            <StarRatings
                                rating={review.Rating}
                                starRatedColor="red"
                                numberOfStars={10}
                                name='rating'
                                starDimension="15px"
                                starSpacing="1px"
                        />
                            </span>
                        </div>
                        <div className="row">
                            <textarea className="text-area-review" readOnly={true}>{review.Review}</textarea>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default MovieDescription;