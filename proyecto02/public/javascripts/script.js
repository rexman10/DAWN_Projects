const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
	}
};

fetch('https://api-formula-1.p.rapidapi.com/circuits?id=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));