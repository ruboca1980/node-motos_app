require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');

//Autenticacion de DataBase
db.authenticate()
  .then(() => console.log('database authenticate'))
  .catch((err) => console.log(err));

initModel();

//Sincronizacion de DataBase
db.sync()
  .then(() => console.log('database sync'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Este es tu puerto ${port}`);
});
