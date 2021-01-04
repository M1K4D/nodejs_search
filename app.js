const fs = require("fs");
const csv = require("neat-csv");
const path = require("path");
const express = require("express");
const app = express();

let _path = path.join(__dirname, "team.csv");

const raw = fs.readFileSync(_path, "utf8");
const readCSV = async () => {
  const result = await csv(raw);
  return result;
};

app.get("/", async (req, res) => {
  const data = await readCSV();
  res.json({ result : data });
});

const search = async (toSearch) => {
  var results = [];
  const data = await readCSV();
  for (var i = 0; i < data.length; i++) {
    if (data[i]["common_name"].toLowerCase().indexOf(toSearch) != -1) {
      results.push(data[i]);
    }
  }
  return results;
};

app.get("/team/", async (req, res) => {
  const name =  req.query.name
  const results = await search(name.toLowerCase())
  console.log(results.length)
  res.json({data : results});
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
