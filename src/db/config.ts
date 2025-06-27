import {Sequelize as SQL} from "sequelize";
import dotenv from "dotenv"

dotenv.config()

// const { DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env
let DB_NAME ='db_bookbase'
let DB_PASSWORD = 'root'
let DB_USERNAME ="root"


const SequelizeConfig = new SQL(DB_NAME as string, DB_USERNAME as string, DB_PASSWORD as string, {
    host: "localhost",
    dialect:"mysql"
})


export default SequelizeConfig