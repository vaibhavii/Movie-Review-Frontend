import React, { useState, useEffect } from 'react';
import {addUser} from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';


function RegisterComponent(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword ] = useState("");
    const [firstName, setFirstName ] = useState("");
    const [lastName, setLastName ] = useState("");
    const [location, setLocation] = useState("");
    const history = useNavigate();

    const usernameChanged = (usernameInput) => {
        setUsername(usernameInput);
    }

    const passwordChanged = (passwordInput) => {
        setPassword(passwordInput);
    }

    const confirmPasswordChanged = (passwordInput) => {
        setConfirmPassword(passwordInput);
    }

    const firstNameChanged = (firstNameInput) => {
        setFirstName(firstNameInput);
    }

    const lastNameChanged = (lastNameInput) => {
        setLastName(lastNameInput);
    }

    const register = () => {
        var user = {
            Username: username,
            FirstName: password,
            LastName: lastName,
            Location: location,
            Password: password
        };

        if( username == "admin" && password == "admin" ){
            console.log("admin login");
        }

        if( confirmPassword != password ){
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });;
        } else if ( username == "" || firstName == "" || lastName == "" || password == ""){
            toast.error('Fields cannot be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });;
        } else {
            addUser(user).then( response => { 
                if(response.message){
                    history('/');
                }
            })
        }
    }


    return(
        <div>
        <div className="row col-12 justify-content-center" style={{backgroundColor: 'transparent', margin: 0}}>
          <img/>
        </div>
          <div className={"box"}>
              <form className={"box-elements pt-4 m-4"}>
                  <h1>Sign Up&nbsp;<i class="fa fa-sign-in-alt"></i></h1>
                  <input className={"form-control my-2"} type={"text"}
                         placeholder={"Username"} 
                         value={username}
                         onChange={(e)=>{usernameChanged(e.target.value)}}
                        />
                  <input className={"form-control my-2"} type={"password"}
                         placeholder={"Password"} 
                         value={password}
                         onChange={(e)=>{passwordChanged(e.target.value)}}
                         />
                  <input className={"form-control my-2"} type={"password"}
                         placeholder={"Confirm Password"} 
                         value={confirmPassword}
                         onChange={(e)=>{confirmPasswordChanged(e.target.value)}}
                         />
                  <input className={"form-control my-2"} type={"text"}
                        placeholder={"First Name"} 
                        value={firstName}
                        onChange={(e)=>{firstNameChanged(e.target.value)}}
                    />
                  <input className={"form-control my-2"} type={"text"}
                        placeholder={"Last Name"} 
                        value={lastName}
                        onChange={(e)=>{lastNameChanged(e.target.value)}}
                    />
                    <input className={"form-control my-2"} type={"text"}
                        placeholder={"Location (Country)"} 
                        value={location}
                        onChange={(e)=>{setLocation(e.target.value)}}
                    />
                  <button className={"red-button my-2"} type={"button"} onClick={register}>
                      Sign Up
                  </button>
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
                 <p>
                    <Link to={"/"} style={{color: 'white'}}>Already Registered?&nbsp;Sign In Here!</Link>
                  </p>
              </form>
          </div>
          </div>
    );

}

export default RegisterComponent;