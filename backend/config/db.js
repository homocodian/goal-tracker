const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DB_URI);
    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
