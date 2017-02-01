const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(express.static('dist'));
}

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});