import { MongoClient } from "mongodb";

let dbInstance;

export const dbConnection = async () => {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        dbInstance = client.db(); // Asignar la base de datos al objeto dbInstance
        return dbInstance;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error; // Lanzar el error para manejarlo en otras partes de la aplicación
    }
};
