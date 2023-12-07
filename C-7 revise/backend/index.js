const config = require("./config/config");
const app = require("./app");
const connectDB = require("./config/db");

const port = config.app.port;

app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});
