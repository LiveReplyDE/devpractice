module.exports = {
	getToken(user, pwd) {
		return fetch('http://10.29.100.99:8085/api/authenticate', { //10.0.2.2
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: user,
				password: pwd
			})
		})
		.then((res) => res.json())
        /*.catch((error) => {
            alert('Test:' + error);
        });*/
	}
};
