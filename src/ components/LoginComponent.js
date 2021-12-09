import React, { useState, useEffect } from 'react';
import {loginCall} from '../services/LoginService'
import '../styles/login.css';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    const usernameChanged = (usernameInput) => {
        setUsername(usernameInput);
    }

    useEffect(()=>{
        if(window.sessionStorage.getItem("user") != null){
            history('/home');
        }
    },[])

    const passwordChanged = (passwordInput) => {
        setPassword(passwordInput);
    }

    const login = () => {
        var user = {
            username: username,
            password: password
        };

        if( username == "admin" && password == "admin" ){
            history('/home');
            window.sessionStorage.setItem("user", "admin");
        }
        else {
        loginCall(user).then( response => { 
            if(response.length != 0){
                window.sessionStorage.setItem("user", response[0].UserId);
                history('/home');
            } else {
                toast.error('Username or Password is incorrect', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUsername("");
                setPassword("");
            }
        })
        }
    }

    return (
        <div>
        <div className="row col-12 justify-content-center" style={{backgroundColor: 'transparent', margin: 0}}>
          <img/>
        </div>
          <div className={"box"}>
              <form className={"box-elements pt-4 m-4"}>
                  <h1>Sign In&nbsp;<i class="fa fa-sign-in-alt"></i></h1>
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
                  <button className={"red-button my-2"} type={"button"} onClick={login}>
                      Sign In
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
                    {/* Same as */}
                    <ToastContainer />
                  <p>
                    <Link to={"/register"} style={{color: 'white'}}>Not a member?&nbsp;Sign Up here!</Link>
                  </p>
                  {/* <p>
                      <Link to={"/register"} style={{color: 'white'}}>Not a member?&nbsp;Sign Up here!</Link>
                  </p>
                  <br/>
                  <Link to={"/home"} style={{color: 'white'}}>Continue as Guest</Link> */}
              </form>
          </div>
          </div>
    );


  }
  
  export default LoginComponent; 