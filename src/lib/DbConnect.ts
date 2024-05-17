import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;

/*
 Learning next js ek edgetime framework hai matlab ek baar aap start hone ke baad bhi requirement
 ke hisab se chize reload hoti hai aisa nahi ki ek bar server start ho gya to sari chije run kar 
 rahi hai hames ke liye
 e.g. agar user ne signin ke liye request kiya to sign in state action me aajayega "
*/
