import express from "express"
import SequelizeConfig from "./db/config"
const app = express()
import AuthRoutes from "./routes/auth.routes"
import { errorHandler } from "./middleware/errorHandler"
const PORT: number = 3001

//Middleware to allow express to accept payloads
app.use(express.json())

// Global error handler 
app.use(errorHandler)

// Auth Routes 
app.use('/auth',AuthRoutes)


SequelizeConfig.sync().then(() => {
    console.log("DB has synced sucessfully");

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT} `);
    })
}).catch((err) => {
    console.log("An error occurred in connecting db");

})