import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes'
import adminRouter from './routers/admin.routes'
import companyRouter from './routers/company.routes'

// const bodyParser = require("body-parser")
// const multer = require("multer")
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/company', companyRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));