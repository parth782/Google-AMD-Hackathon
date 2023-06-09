import config from '../config'

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)

    },
    saveRole(role){
        window.sessionStorage.setItem(config.ROLE,role)
    },
    getRole(){
       return window.sessionStorage.getItem(config.ROLE)
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY)
        sessionStorage.clear();
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`)
    },
    saveUserId(userId) {
        return window.sessionStorage.setItem('user_id', userId);
    },
    getUserId(user_id) {
        return window.sessionStorage.getItem('user_id');
    }

}

export default TokenService