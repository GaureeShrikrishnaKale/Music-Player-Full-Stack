const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const {default : mongoose} = require("mongoose");

const PORT = process.env.PORT || 4000;
app.use(cors({origin : true}));

app.get("/", (req, res) => {
    return res.json("Hai there...")
})

//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users",userRoute);

//Artist Routes
const artistsRoutes = require("./routes/artists");
app.use("/api/artists", artistsRoutes);

//Album Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums", albumRoutes);

//Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs",songRoutes);

mongoose.connect(process.env.DB_STRING);
mongoose.connection
.once("open", () => console.log("Connected"))
.on("error", (error) => {
    console.log(`ERROR : ${error}`);
})

app.listen(PORT, () => console.log(`listening at port ${PORT}`));