class Authentication {
	registerSuccessfull(username, password) {
		//console.log('successfully logged in');
		sessionStorage.setItem("authenticationService", username);
	}
	isUserLoggedIn() {
		let user = sessionStorage.getItem("authenticationService");
		if (user === null) {
			return false;
		} else {
			return true;
		}
	}

	getUserName() {
		return sessionStorage.getItem("authenticationService");
	}
	logout() {
		sessionStorage.removeItem("authenticationService");
	}
}

export default new Authentication();
