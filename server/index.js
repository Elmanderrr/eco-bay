import jsonServer from 'json-server';
import multer from 'multer';
import path from 'path';
import express from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: path.join('/uploads')
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(), '/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage })

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/uploads', express.static('uploads'));



server.use(upload.any(), (req, res, next) => {

  if (req.method === 'POST' && req.url === '/products') {

    if ( req.files.length) {
      req.body.photo = `/uploads/${req.files[0].filename}`;
    }
  }

  if (req.method === 'PATCH' && /\/products\/\d/.test(req.url)) {

    if (req.files.length) {
      req.body.photo = `/uploads/${req.files[0].filename}`;
    }

  }

  // Continue to JSON Server router
  next()
})

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running')
});

