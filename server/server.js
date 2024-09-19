const express = require("express");
const app = express();
const authRoute = require("./routers/auth_router");
const connectDb = require("./Database/db");
const cors = require("cors");
const serviceRoute = require("./routers/service_router")
const adminRoute = require("./routers/admin_router")
const errorMiddleware = require("./Middlewares/error-middleware")

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
require('dotenv').config();

app.use("/api/auth", authRoute);
app.use("/api/data", serviceRoute)
app.use("/api/admin", adminRoute)

app.use(errorMiddleware)

const PORT = 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});
