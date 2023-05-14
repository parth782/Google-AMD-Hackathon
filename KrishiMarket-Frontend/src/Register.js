import React from "react";
import ValidationError from "./validationError";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service.js";

import RadioGroup from "./components/RadioGroup";
import { UserIcon } from "@heroicons/react/24/solid";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      
      bloodGroup: {
        value: "",
        touched: false,
      },
     city: {
        value: "",
        touched: false,
      },
      district: {
        value: "",
        touched: false,
      },
      
      mobileNo: {
        value: "",
        touched: false,
      },
    };
  }

  // NAME
  changeName(name) {
    this.setState({
      name: { value: name, touched: true },
    });
  }

 
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Name is required
        </p>
      );
    } else if (name.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Name must be at least 2 characters long
        </p>
      );
    }
  }


  //////Blood Group
  changeBloodGroup(bloodGroup) {
    this.setState({
      bloodGroup: { value: bloodGroup, touched: true },
    });
  }

  validateBloodGroup() {
    const bloodGroup = this.state.bloodGroup.value.trim();
    if (bloodGroup.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          BloodGroup is required
        </p>
      );
    } else if (bloodGroup.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          BloodGroup must be at least 2 characters long
        </p>
      );
    }
  }

  /////District
  changeDistrict(district) {
    this.setState({
      district: { value: district, touched: true },
    });
  }
  validateDistrict() {
    const district = this.state.district.value.trim();
    if (district.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Street address is required
        </p>
      );
    } else if (district.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
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
      return (
        <p className="input-error" style={{ color: "red" }}>
          City is required
        </p>
      );
    } else if (city.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          City must be at least 2 characters long
        </p>
      );
    }
  }





  /////MOBILE NO
  changemobileNo(mobile_no) {
    this.setState({
      mobileNo: { value: mobileNo, touched: true },
    });
  }
  validateMobileNo() {
    const mobile_no = this.state.Mbileno.value.trim();
    if (mobile_no.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Mobile No is required
        </p>
      );
    } else if (mobile_no.length < 10 || !(mobile_no > 1000000000 && mobile_no < 9999999999)) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Mobile No must be at least 10 characters long
        </p>
      );
    }
  }

  updateUser = (event) => {
    event.preventDefault();
    //get the input from the form submission
    const data = {};
    //get the payload from the form submission
    const formData = new FormData(event.target);
    for (let value of formData) {
      data[value[0]] = value[1];
    }
    // console.log(data);

    let {
      name,
      mobileNo,
      city,
      district,
      bloodGroup
    } = data;
    //console.log(user_name, password, repeatPassword);

    this.setState({ error: null });
    AuthApiService.updatetUser({
      name,
      mobileNo,
      city,
      district,
      bloodGroup

    })

      .then((response) => {
        //console.log('user:', response)
        TokenService.saveAuthToken(response.authToken);
        TokenService.saveUserId(response.id);
        window.location = "/add-item";
      })

      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const msg = this.state.error ? (
      <p style={{ color: "red" }}>{this.state.error}</p>
    ) : (
      <div></div>
    );

    return (
      <div className="Fast">
        <div className="Register">
          <section id="signUpPage">
            <h2>Profile</h2>
            {/* <div className="mx-auto w-96 shadow my-1">
              <RadioGroup
                onChange={(option) => console.log(option)}
                options={[
                  <div className="flex flex-1 justify-around">
                    <span>Farmer</span>
                    <UserIcon className="w-4" />
                  </div>,
                  <div className="flex  flex-1 justify-around">
                    <span>Consumer</span>
                    <UserIcon className="w-4" />
                  </div>,
                ]}
              />
            </div> */}

            <form className="registerForm" onSubmit={this.registerUser}>
              <div className="errorMessage">{msg}</div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={(e) => this.changeName(e.target.value)}
                required
              />
              {this.state.name.touched && (
                <ValidationError message={this.validateName()} />
              )}




              <label htmlFor="bloodGroup">Blood Group</label>
              <select name="bloodGroup"
                placeholder="Blood Group"
                onChange={(e) => this.validateBloodGroup(e.target.value)}
                required>
                <option value="" selected>Select BloodGroup</option>
                <option value="O+">O+</option>

                <option value="A+">A+</option>

                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>

                <option value="A-">A-</option>

                <option value="B-">B-</option>
                <option value="AB-">AB-</option>

              </select>
              {/* <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                onChange={(e) => this.validateBloodGroup(e.target.value)}
                required
              /> */}
              {this.state.bloodGroup.touched && (
                <ValidationError message={this.validateBloodGroup()} />
              )}

              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={(e) => this.changeCity(e.target.value)}
                required
              />
              {this.state.city.touched && (
                <ValidationError message={this.validateCity()} />
              )}

              <label htmlFor="district">District</label>
              <input
                type="text"
                name="district"
                placeholder="District"
                onChange={(e) => this.changeDistrict(e.target.value)}
                required
              />
              {this.state.district.touched && (
                <ValidationError message={this.validateDistrct()} />
              )}


              <label htmlFor="mobileNo">Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                placeholder="Mobile No"
                onChange={(e) => this.changeMobileNo(e.target.value)}
                required
              />
              {this.state.mobileNo.touched && (
                <ValidationError message={this.validateMobileNo()} />
              )}

              <button
                className="signup-button"
                id="register-button"
                type="submit"
                style={{ opacity: "100% !important" }}
                disabled={this.state.submitButtonDisabled}
              >
                Update
              </button>
            </form>

          </section>
        </div>
      </div>
    );
  }
}

export default Register;
