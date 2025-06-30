import express from "express"
import morgan from "morgan"
import SequelizeConfig from "./db/config"
const app = express()
import AuthRoutes from "./routes/auth.routes"
import BookRoutes from "./routes/book.routes"
import { errorHandler } from "./middleware/errorHandler"
import Borrow from "./routes/borrow.route"
import "./models/index"
import { startDueDateReminderJob } from "./services/dueDateReminderNotification"
import Reports from "./routes/reports.routes"
const PORT: number = 3001

//Middleware to allow express to accept payloads
app.use(express.json())

// Global error handler 
app.use(errorHandler)

// Auth Routes 
app.use('/auth',AuthRoutes)

//Book Routes
app.use("/books",BookRoutes)

//Borrow Routes
app.use("/borrow",Borrow)


//Reports Routes
app.use("/reports",Reports)


// Run Cron Job for reminders 
startDueDateReminderJob()

//Log Requests to console
app.use(morgan("combined"))

SequelizeConfig.sync().then(() => {
    console.log("DB has synced sucessfully");

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT} `);
    })
}).catch((err) => {
    console.log("An error occurred in connecting db");

})