import React from "react"
import ValidationError from "./validationError"
import AuthApiService from "./services/auth-api-service"
import TokenService from "./services/token-service.js"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: {
                value: "",
                touched: false,
            },
            password: {
                value: "",
                touched: false,
            },
            LogInUserID: 0,
            error: null,
        };
    }

    changeUsername(userName) {
        this.setState({
            userName: { value: userName },
        });
    }

    changePassword(password) {
        this.setState({
            password: { value: password },
        });
    }

    validateUserName() {
        const userName = this.state.userName.value.trim();
         if (userName.length < 2&&userName.length > 0) {
            return (
                <div style={{color:'white'}}>
                Username must be at least 2 characters long
                </div>
            );
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
         if ((password.length < 6 || password.length > 72)&&(password.length > 0)) {
            return (
                <div style={{color:'white'}}>
                Incorrect Password! Password must be between 6 and 72 characters long.
                </div>
            );
        } else if (!password.match(/[0-9]/)&&(password.length > 0)) {
            return (
                <div style={{color:'white'}}>
                Password must contain at least one number.
                </div>

            );
        }
    }

    loginUser = (event) => {
        event.preventDefault();
        const { userName, password } = event.target;
        //console.log("username:", userName.value, "password:", password.value);
        AuthApiService.postLogin({
            user_name: userName.value,
            password: password.value,
        })

            .then((response) => {
                // console.log("response ID", response);

                TokenService.saveAuthToken(response.authToken);
                TokenService.saveUserId(response.userId);
                window.location = "/";
            })
            .catch((err) => {
                this.setState({
                    error: "Username or password is invalid"
                })
                // console.log(err);
            });
    };

    render() {
        const msg = this.state.error ? <p style={{color:'white'}}>
            {this.state.error}
        </p> :
            <div></div>;
        return (
            <div className="Fast">
                <div className="Login">

                    <section id="loginPage">
                        <h2 style={{padding:'7px'}}>Login</h2>

                        <form className="loginForm" onSubmit={this.loginUser}>
                            <div className="errorMessage" style={{color:'white'}}>
                                {msg}
                            </div>
                            <label htmlFor="userName">Username</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                placeholder="Username"
                                onChange={(e) =>
                                    this.changeUsername(e.target.value)
                                }
                                required
                            />
                            {this.state.userName.touched && (
                                <ValidationError
                                    message={this.validateUserName()}
                                />
                            )}
                            <ValidationError
                                message={this.validateUserName()}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="Password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    this.changePassword(e.target.value)
                                }
                                required
                            />
                            {this.state.password.touched && (
                                <ValidationError
                                    message={this.validatePassword()}
                                />
                            )}
                            <ValidationError
                                message={this.validatePassword()}
                            />


                            <button
                                className="go-button"
                                type="submit"
                            >
                                Go
                            </button>
                            <div className="signUp">
                                <p style={{color:'white'}}>
                                    Do not have an account?{" "}
                                </p>
                                <p>
                                    <a href="/signup" style={{color:'white',textDecoration:'underline'}}>Sign up here</a>
                                </p>
                            </div>
                        </form>
                    </section>
                    <div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
