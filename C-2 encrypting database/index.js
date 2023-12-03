const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

const PORT = config.app.port;

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
