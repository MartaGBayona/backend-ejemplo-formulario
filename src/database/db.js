import { MongoClient } from "mongodb";

export const dbConnection = () => {
    return MongoClient.connect(
        process.env.MONGO_URI,
        []
    );
}