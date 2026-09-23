import path from "path";
import passport from "passport";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "../backend/routes/productRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import orderRoutes from "../backend/routes/orderRoutes.js";
// import uploadRoutes from "../backend/routes/uploadRoutes..js";
import authRoutes from "../backend/routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import configurePassport from "../backend/config/passport.js";
import configureGithubPassport from "../backend/config/githubPassport.js";

const app = express();
// const _dirname = path.resolve(); //

await connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(passport.initialize());
configurePassport(passport);
configureGithubPassport(passport);

// app.get("/", (req, res) => {
//   res.send("api running ...");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID }),
);

// app.use(express.static(path.join(_dirname, "/frontend/dist")));
//for unkonwn route hits shows frontend home screen
// app.get(/.*/, (_, res) => {
//   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on server localhost:${PORT}`);
});
