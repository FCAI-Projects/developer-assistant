import mongoose from "mongoose";

class Connection {
  private readonly URL: string = "mongodb://localhost:27017/developer-assistant" || process.env.MONGO_URL;

  constructor() {
    mongoose.connect(this.URL).then(() => {
      console.log("Connected to database");
    });
  }
}

export default new Connection();
