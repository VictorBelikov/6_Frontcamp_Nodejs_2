const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server is listening on port ${port} ...`));

// Or
// app.listen(3000, () => console.log('Server is running on port 3000...'));

/*
{
    "author": "Gustavo Fring",
    "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat obcaecati quia quaerat asperiores\neaque commodi beatae, labore vel maiores consequuntur sunt. Obcaecati, accusantium omnis dolorum fugit magnam animi\nplaceat iusto!",
    "date": "2018-03-29",
    "imageUrl": "/meth-labotatory.png"
}
 */
