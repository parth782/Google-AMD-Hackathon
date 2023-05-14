import config from '../config'

const AuthApiService = {
  postLogin(credentials) {
    //console.log(credentials)
    return fetch(`${config.FARMER_API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),

    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      )
      .catch(err => {
        console.log('error:', err)
      })
  },
  verifyOtp(otp) {
   
    return fetch(`${config.FARMER_API_ENDPOINT}/otp-verify`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(otp),
    }).then((res) => {
      (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
    }).catch(err => {
      console.log(err);
    })
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      )
      .catch(err => {
        console.log('error:', err)
      })
  },
}

export default AuthApiService