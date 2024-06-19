import { dbConnection } from "./database/db.js";
import router from './routes/router.js'
import 'dotenv/config'
import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4002;

app.get('/api/healty', (req, res) => {
    res.status(200).json(
        {
            success:true,
            message: "server is healthy"
        }
    )
});

app.use('/api', router);

dbConnection()
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`);
    })
})
.catch(error => {
    console.log(error)
})
