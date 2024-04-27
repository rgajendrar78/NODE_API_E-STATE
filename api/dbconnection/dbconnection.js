import mongoose from "mongoose";
export const dbconnection = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}/E-State_MERN`)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
