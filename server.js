const app = require('./index');
const { sequelize } = require('./db');

const { PORT = 4000 } = process.env;

app.get('/cars', (req, res) => {

})


app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Jokes are ready at http://localhost:${PORT}`);
});