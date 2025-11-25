require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors({
  origin: "*",        // or frontend domain
  methods: "GET,POST,PUT,DELETE",
  credentials: false
}));



app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
