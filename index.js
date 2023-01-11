const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Sequelize, Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    const {tags, content} = req.query;

    if (!tags && !content) {
      const jokes = await Joke.findAll();
      res.json(jokes);
    }

    const jokes = await Joke.findAll({
      where: {
        [Op.or]: [
          {
            tags : {
            [Op.like]: '%' + tags + '%'   
          }
          },
          {
            joke: {
              [Op.like]: '%' + content + '%'
            }
          }
        ]
      }
    })

    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
