import app from './app.js';
import connectionToDb from './config/DBConnection.js';

 
const Port = process.env.Port||5000;
app.listen(Port, async()=>{
   await connectionToDb();
        console.log(`App is running at http://localhost:${Port}`)
});
