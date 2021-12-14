import React, { useState, useEffect } from 'react';
import {updateUser, getUser} from '../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faFilm, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// user profile component for editing user details
function UserProfileComponent(){

    const[firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [readOnly, setReadOnly] = useState(true);
    const [readOnlyPassword, setReadOnlyPassword] = useState(true);
    const navigate = useNavigate()
 
    useEffect(()=>{
        getUser(window.sessionStorage.getItem("user")).then(response=>{
            setUsername(response[0].Username);
            setFirstName(response[0].FirstName)
            setLastName(response[0].LastName)
            setPassword(response[0].Password);
            setLocation(response[0].Location);
        })
    },[])

    const onSave = () => {

        var user = {
            FirstName: firstname,
            LastName: lastName,
            Password: password,
            Username: username,
            Location: location,
            id: window.sessionStorage.getItem("user")
        }

        updateUser(user).then(response => {
            console.log(response);
        })

    }


    return(
        <div>
        <div className="row nav">
            <div className="col-2 nav-title">
                MovieDB
            </div>
            <div className="col-6"></div>
            <div className="col-2"></div>
            <div className="col-1 pt-2"></div>
            <div className="col-1 pt-2">
                <FontAwesomeIcon icon={faSignOutAlt} className="sign-out-btn" onClick={()=>{window.sessionStorage.removeItem("user"); navigate('/')}}/>
            </div>
        </div>
        <div className="container user-container">
            <h4>My Profile</h4>
           <div className="row pt-2">
               <label className="col-2 label-form">First Name</label>
               <div className="col-1"></div>
               <div className="col-9">
                   <input className="input-profile form-control" readOnly={readOnly} value={firstname} onChange={(e)=>{setFirstName(e.target.value)}}/>
               </div>
           </div>
           <div className="row pt-2">
               <label className="col-2 label-form">Last Name</label>
               <div className="col-1"></div>
               <div className="col-9">
                   <input className="input-profile form-control" readOnly={readOnly} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
               </div>
           </div>
           <div className="row pt-2">
               <label className="col-2 label-form">Location</label>
               <div className="col-1"></div>
               <div className="col-9">
                   <input className="input-profile form-control" readOnly={readOnly} value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
               </div>
           </div>
           <div className="row pt-4 button-row">
               { readOnly &&
               <button className="btn btn-dark user-edit-btn" onClick={()=>{setReadOnly(false);}}>Edit</button>
              }
              { !readOnly &&
              <div className="row">
                   <div className="col"><button className="btn btn-dark user-edit-btn" onClick={()=>{onSave();setReadOnly(true);}}>Save</button></div>
                   <div className="col"><button className="btn btn-dark user-edit-btn" onClick={()=>{setReadOnly(true);}}>Cancel</button></div>
              </div>
              }   
           </div>
           <div className="pt-4">
               <h4>Password</h4>
               <div className="row pt-4">
                    <label className="col-2 label-form">Password</label>
                    <div className="col-1"></div>
                    <div className="col-9">
                        <input className="input-profile form-control" type="password" readOnly={readOnlyPassword} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                <div>
                { !readOnlyPassword &&
                    <div className="row pt-4">
                        <label className="col-2 label-form">Confirm Password</label>
                        <div className="col-1"></div>
                        <div className="col-9">
                            <input className="input-profile form-control" type="password" readOnly={readOnlyPassword} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        </div>
                    </div>
                }
                <div className="row pt-4 button-row">
                    { readOnlyPassword &&
                    <button className="btn btn-dark user-edit-btn" onClick={()=>{setReadOnlyPassword(false);}}>Edit</button>
                    }
                    { !readOnlyPassword &&
                    <div className="row">
                        <div className="col"><button className="btn btn-dark user-edit-btn" onClick={()=>{onSave();setReadOnlyPassword(true);}}>Change</button></div>
                        <div className="col"><button className="btn btn-dark user-edit-btn" onClick={()=>{setReadOnlyPassword(true);}}>Cancel</button></div>
                    </div>
                    }   
                </div>
            </div>
           </div>
        </div>
        </div>
        </div>
    );

}

export default UserProfileComponent;