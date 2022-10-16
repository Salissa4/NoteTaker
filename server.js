const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static
app.use(express.static('public'));

//routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

//PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`));
