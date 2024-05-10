require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./utils/db");
const productrouter = require('./routers/product_router')
const brandrouter = require('./routers/brand_router')
const categoryrouter = require('./routers/category_router')
const multer  = require('multer')
const path = require('path');


app.use(cors());

app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // Extracting the file extension from the original filename
    const fileExt = path.extname(file.originalname);
    console.log('..........',fileExt);
    // Generating a unique filename using the current timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Combining the unique filename with the original file extension
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExt;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imagePath = path.join(req.file.filename);
  // Save imagePath to database or return it as response
  res.json({ imagePath });
});


app.use('/uploads', express.static('uploads'));

app.use('/api/product',productrouter)
app.use('/api/brand',brandrouter)
app.use('/api/category',categoryrouter)

connectDb().then(()=>{
    app.listen(8000, () => {
        console.log(`server running on port 8000 👍`);
      });
})


module.exports = app