const express = require("express");
const redis = require("redis");
const app = express();
const port = 3010;

// redisDemo.js
let redisClient = redis.createClient(); // this creates a new client

redisClient.on("connect", function() {
  console.log("Redis client connected");
  redisClient.set("my test key", "my test value", redis.print);

  for (let i = 0; i < 1000000; i++) {
    redisClient.set("my test key" + i, "my test value", console.log(i));
  }
});

redisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});

app.get("/", (req, res) => {
  redisClient.get("my test key", function(error, result) {
    if (error) {
      console.log(error);
      throw error;
    }
    // console.log("GET result ->" + result);
    res.send("Hello World: " + result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
