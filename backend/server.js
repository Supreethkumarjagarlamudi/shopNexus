import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongoDbConfig.js";
import connectCloudinary from "./config/cloudinaryConfig.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter);

// api calls
app.get("/", (req, res) => {
    res.send("API working successfully");
})

app.listen(port, () => {
    console.log("Backend Successfully running on port : " + port)
})