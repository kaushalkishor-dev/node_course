//core module
const path = require('path');

// External module
const express = require("express");

// Local Module
const storeRouter = require("./routes/storeRouter")
const  hostRouter  = require("./routes/hostRouter")
const rootDir = require('./utils/pathUtil'); 
const { pageNotFound } = require('./controllers/error');
const { mongoConnect } = require('./utils/databaseUtil');
const { getDB } = require('./utils/databaseUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(pageNotFound);

const PORT = 3001;
mongoConnect(() => {
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
})

