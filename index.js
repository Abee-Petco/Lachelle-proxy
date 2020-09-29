const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');
<<<<<<< HEAD
const path = require('path');
=======

>>>>>>> 5df1b656179a19d18f0808fdd493a855cf398263
const server = express();

server.use(morgan('dev'));
server.use(serveStatic('./client/'));

server.get('/product', (req, res) => {
  const { itemID } = req.query;
  const itemIdNumber = Number.parseInt(itemID, 10);

<<<<<<< HEAD

  if (itemIdNumber < 100 || itemIdNumber > 10000000 || itemIdNumber === undefined) {
=======
  if (itemIdNumber < 100 || itemIdNumber > 199 || itemIdNumber === undefined) {
>>>>>>> 5df1b656179a19d18f0808fdd493a855cf398263
    res.status(404).send('itemID invalid');
  } else {
    res.sendFile(`${__dirname}/client/index.html`);
  }
});

<<<<<<< HEAD
server.listen(3010);
=======
server.listen(3000);
>>>>>>> 5df1b656179a19d18f0808fdd493a855cf398263
