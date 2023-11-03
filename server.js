const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Handle requests for /real-estate-sales-app
  server.get('/real-estate-sales-app', (req, res) => {
    return app.render(req, res, '/real-estate-sales-app', req.query);
  });

  // Serve the real-estate-sales-app.html file directly without the .html extension
  server.get('/real-estate-sales-app.html', (req, res) => {
    const filePath = `${__dirname}/public/real-estate-sales-app.html`;
    return res.sendFile(filePath);
  });

  // Handle other Next.js routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
