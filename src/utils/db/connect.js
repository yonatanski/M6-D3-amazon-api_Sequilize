import Sequelize from "sequelize"

// const { POSTGRES_URI } = process.env
// console.log(process.env.POSTGRES_URI)

// const sequelize = new Sequelize(POSTGRES_URI, {
//   dialect: "postgres",
// })

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, { host: process.env.PGHOST, dialect: "postgres" })

export const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate({ logging: false })
    await sequelize.sync({ alter: true, logging: false })
    console.log("✅ Connection has been established successfully.")
  } catch (error) {
    console.log(error)
    console.error("❌ Unable to connect to the database:", error)
  }
}

export default sequelize
