const fs = require("fs");
const csv = require("neat-csv");
const path = require("path");
const express = require("express");
const app = express();

let _path = path.join(__dirname, "export_dataframe.csv");

const readCSV = async () => {
  const raw = fs.readFileSync(_path, "utf8");
  const result = await csv(raw);
  return result;
};

app.get("/", async (req, res) => {
  const data = await readCSV();
  res.json({ result: data });
});

const search = async (toSearch) => {
  var results = [];
  const data = await readCSV();
  for (var i = 0; i < data.length; i++) {
    if (data[i]["title"].toLowerCase().indexOf(toSearch) != -1) {
      results.push(data[i]);
    }
  }
  return results;
};

app.get("/keywords", async (req, res) => {
  const title = req.query.title;
  const results = await search(title.toLowerCase());
  // console.log(results.length);
  res.json({ data: results });
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
