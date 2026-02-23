var express = require('express');
var fs = require('fs').promises;
var path = require('path');
var router = express.Router();

const filePath = path.join(__basedir, "data", "users.json");

router.post('/print-data', async function (req, res, next) {
  const users = JSON.parse(await fs.readFile(filePath));
  const { username, password } = req.body;
  const index = users.findIndex(user => user.username === username);
  if (index !== -1) {
    users[index].password = password;
  } else {
    users.push({ username, password });
  }
  await fs.writeFile(filePath, JSON.stringify(users));
  res.sendStatus(200);
});

module.exports = router;
