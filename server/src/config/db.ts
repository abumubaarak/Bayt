import mongoose from "mongoose";
import "colors";
export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Mongo db connected to ${connect.connection.host} `.bgCyan);
  } catch (error) {
    console.log(error);
  }
};
