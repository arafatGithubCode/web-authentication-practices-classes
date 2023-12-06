const app = require("./app");
const connectDB = require("./config/db");
const config = require("./config/config");

const PORT = config.app.port;

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
