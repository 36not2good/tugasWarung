import express from "express";
import db from "./config/Database.js";
import User from "./models/UserModel.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import WarungRoute from "./routes/WarungRoute.js";
import UserRoute from "./routes/UserRoute.js";
import RoleRoute from "./routes/RoleRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
app.use(KategoriRoute);
app.use(WarungRoute);
app.use(UserRoute);
app.use(RoleRoute);


try {
    await db.authenticate();
    console.log("connect")
    await User.sync();
} catch (error) {
    console.error(error);
}

app.listen(5000, () => console.log('Server Up and Running'));
