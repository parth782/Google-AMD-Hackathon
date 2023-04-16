import React from "react"
import ValidationError from './validationError'
import AuthApiService from './services/auth-api-service'
import TokenService from './services/token-service.js'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            user_name: {
                value: "",
                touched: false,
            },
            password: {
                value: "",
                touched: false,
            },
            repeatPassword: {
                value: "",
                touched: false,
            },
            farm_name: {
                value: "",
                touched: false,
            },
            street_address: {
                value: "",
                touched: false,
            },
            city: {
                value: "",
                touched: false,
            },
            state: {
                value: "",
                touched: false,
            },
            zip: {
                value: "",
                touched: false,
            },
        };
    }

    changeUsername(user_name) {
        this.setState({
            user_name: { value: user_name, touched: true },
        });
    }

    changePassword(password) {
        this.setState({
            password: { value: password, touched: true },
        });
    }

    updateRepeatPassword(repeatPassword) {
        this.setState({
            repeatPassword: { value: repeatPassword, touched: true },
        });
    }

    validateUserName() {
        const user_name = this.state.user_name.value.trim();
        if (user_name.length === 0) {
            return <p className="input-error">Username is required</p>;
        } else if (user_name.length < 2) {
            return (
                <p className="input-error">
                    Username must be at least 2 characters long
                </p>
            );
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return <p className="input-error">Password is required</p>;
        } else if (password.length < 6 || password.length > 72) {
            return (
                <p className="input-error">
                    Password must be between 6 and 72 characters long
                </p>
            );
        } else if (!password.match(/[0-9]/)) {
            return (
                <p className="input-error">
                    Password must contain at least one number
                </p>
            );
        }
    }

    validateRepeatPassword() {
        const repeatPassword = this.state.repeatPassword.value.trim();
        const password = this.state.password.value.trim();

        if (repeatPassword !== password) {
            return <p className="input-error">Passwords do not match</p>;
        }

    }


//////Farm name
changeFarmName(farm_name) {
    this.setState({
        farm_name: { value: farm_name, touched: true },
    });
}

validateFarmName() {
    const farm_name = this.state.farm_name.value.trim();
    if (farm_name.length === 0) {
        return <p className="input-error">Farm name is required</p>;
    } else if (farm_name.length < 2) {
        return (
            <p className="input-error">
                Farm name must be at least 2 characters long
            </p>
        );
    }
}



/////street_address
changeStreetAddress(street_address) {
    this.setState({
        street_address: { value: street_address, touched: true },
    });
}
validateStreetAddress() {
    const street_address = this.state.street_address.value.trim();
    if (street_address.length === 0) {
        return <p className="input-error">Street address is required</p>;
    } else if (street_address.length < 2) {
        return (
            <p className="input-error">
                Street address be at least 2 characters long
            </p>
        );
    }
}
////City
changeCity(city) {
    this.setState({
        city: { value: city, touched: true },
    });
}

validateCity() {
    const city = this.state.city.value.trim();
    if (city.length === 0) {
        return <p className="input-error">City is required</p>;
    } else if (city.length < 2) {
        return (
            <p className="input-error">
                City must be at least 2 characters long
            </p>
        );
    }
}


/////State
changeState(state) {
    this.setState({
        state: { value: state, touched: true },
    });
}

validateState() {
    const state = this.state.state.value.trim();
    if (state.length === 0) {
        return <p className="input-error">State is required</p>;
    } else if (state.length < 2) {
        return (
            <p className="input-error">
                State must be at least 2 characters long
            </p>
        );
    }
}

/////ZIP
changeZIP(zip) {
    this.setState({
        zip: { value: zip, touched: true },
    });
}
validateZIP() {
    const zip = this.state.zip.value.trim();
    if (zip.length === 0) {
        return <p className="input-error">ZIP is required</p>;
    } else if (zip.length < 5) {
        return (
            <p className="input-error">
                ZIP must be at least 5 characters long
            </p>
        );
    }
}

    registerUser = (event) => {
      event.preventDefault();
        //get the input from the form submission
        const data = {};
        //get the payload from the form submission
        const formData = new FormData(event.target);
        for (let value of formData) {
            data[value[0]] = value[1];
        }
       // console.log(data);

        let { user_name,
            password,
            farm_name,
            street_address,
            city,
            state,
            zip} = data;
        //console.log(user_name, password, repeatPassword);


      this.setState({ error: null })
      AuthApiService.postUser({
        user_name,
        password,
        farm_name,
        street_address,
        city,
        state,
        zip
      })
  
      .then(response => {
          //console.log('user:', response)
          TokenService.saveAuthToken(response.authToken)
          TokenService.saveUserId(response.id)
          window.location = "/add-item"
      }) 
  
      .catch(res => {
          this.setState({ error: res.error })
      })  
     }


    render() {
        const msg = this.state.error? 
        <p>
            {this.state.error}
        </p>:
        <div></div>;

        return (
            <div className="Register">
                <section id="signUpPage">
                <h2>Sign up</h2>
                    <form className="registerForm" onSubmit={this.registerUser}>
                    <div className = "errorMessage">
                        {msg}
                    </div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Username"
                            onChange={(e) =>
                                this.changeUsername(e.target.value)
                            }
                            required
                        />
                        {this.state.user_name.touched && (
                            <ValidationError
                                message={this.validateUserName()}
                            />
                        )}

                        <label>Password</label>
                        <input
                            type="Password"
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


                        <label>Repeat Password</label>
                        <input
                            type="Password"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            onChange={(e) =>
                                this.updateRepeatPassword(e.target.value)
                            }
                            required
                        />
                         
                        {this.state.repeatPassword.touched && (
                            <ValidationError
                                message={this.validateRepeatPassword()}
                            />
                        )}

                        <label htmlFor="farm_name">Farm name</label>
                        <input
                            type="text"
                            name="farm_name"
                            placeholder="Farm name"
                            onChange={(e) =>
                                this.changeFarmName(e.target.value)
                            }
                            required
                        />
                        {this.state.user_name.touched && (
                            <ValidationError
                                message={this.validateFarmName()}
                            />
                        )}


                        <label htmlFor="street_address">Street address</label>
                        <input
                            type="text"
                            name="street_address"
                            placeholder="street address"
                            onChange={(e) =>
                                this.changeStreetAddress(e.target.value)
                            }
                            required
                        />
                        {this.state.street_address.touched && (
                            <ValidationError
                                message={this.validateStreetAddress()}
                            />
                        )}

                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="city"
                            onChange={(e) =>
                                this.changeCity(e.target.value)
                            }
                            required
                        />
                        {this.state.user_name.touched && (
                            <ValidationError
                                message={this.validateCity()}
                            />
                        )}

                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            onChange={(e) =>
                                this.changeState(e.target.value)
                            }
                            required
                        />
                        {this.state.user_name.touched && (
                            <ValidationError
                                message={this.validateState()}
                            />
                        )}

                        <label htmlFor="zip">ZIP</label>
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP"
                            onChange={(e) =>
                                this.changeZIP(e.target.value)
                            }
                            required
                        />
                        {this.state.user_name.touched && (
                            <ValidationError
                                message={this.validateZIP()}
                            />
                        )}


                        <button
                            className="signup-button"
                            id="register-button"
                            type="submit"
                            disabled={this.state.submitButtonDisabled}
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="login">
                        <p>
                            Already have an account? 
                        </p>
                        <p>
                        <a href="/user/login">Log in here</a>
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

export default Register;
