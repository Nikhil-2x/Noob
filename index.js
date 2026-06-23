import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is working fine.." });
});

app.get("/product", async (req, res) => {
  try {
    const prod = await fetch("https://dummyjson.com/product/1");
    const data = await prod.json();
    // console.log(res);

    // return res.status(199).json(prod);
    return res.json(data);
  } catch (error) {
    console.log("ERROR while fetching data from dummjson website");
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/getip", async (req, res) => {
  try {
    const resp = await fetch("https://dummyjson.com/ip");
    const data = await resp.json();

    return res.status(200).json(data);
  } catch (err) {
    console.log("ERROR while getting ip from dummyjson website", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/exit", (req, res) => {
  console.log("Exiting api..");
  res.status(200).send("Server stopped");
  process.exit(1);
});

app.listen(3002, () => {
  console.log(`server running on localhost:3002`);
});
