import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/config/db.js'

const port=process.env.PORT||5002

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`⚙️ Server is running at port : http://localhost:${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
