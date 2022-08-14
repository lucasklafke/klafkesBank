import app from './app.js';
import dotenv from "dotenv";
dotenv.config();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
