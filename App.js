// require('dotenv').config()
require('colors')
const Db=require("./Database/Connection")
const express = require('express');
const app = express();
const port = 3000 || process.env.port
const bodyParser = require('body-parser');
const userApi = require('./Routes/user');
const VideoApi = require('./Routes/portfolio/videos');
const GraphicApi = require('./Routes/portfolio/graphics');
const FaqsApi = require('./Routes/portfolio/faqs');
const EmailApi = require('./Routes/portfolio/leadEmail');
const cookieParser = require('cookie-parser');
const path = require('path')
const cors=require("cors")
const morgan = require("morgan");

// Middleware

morgan.token('splitter', (req) => {
  return "\x1b[36m--------------------------------------------\x1b[0m\n";
});
morgan.token('statusColor', (req, res, args) => {
  // get the status code if response written
  var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
      ? res.statusCode
      : undefined

  // get status color
  var color = status >= 500 ? 31 // red
      : status >= 400 ? 33 // yellow
          : status >= 300 ? 36 // cyan
              : status >= 200 ? 32 // green
                  : 0; // no color

  return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

app.use(morgan(`:splitter \n :date \n \x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length/:res[content-length] :user-agent\n:splitter`))
// app.use(helmet())

//database is established here
Db();
app.use('/', express.static(path.join(__dirname, 'Public')))



app.use(cors({origin: ["http://localhost:5173"],credentials: true }))
// app.options("", cors(corsConfig))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


          

// Routes Api
app.use('/api/v1/user', userApi);
app.use('/api/v1/video', VideoApi);
app.use('/api/v1/graphic', GraphicApi);
app.use('/api/v1/faqs', FaqsApi);
app.use('/api/v1/leademail', EmailApi);

// testing endpoint
app.get('/api/v1',function (req,res){  
  // console.log("'Connection Established'".underline.green.bgWhite)
  res.status(200).json({msg:'Connection Established'});
})

app.get('/api/v1/blogs',async function (req,res){  
  const mediumURL = "https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40tenrin";
  const response = await fetch(mediumURL);
  const json = await response.json()
  // console.log(json)
  res.status(200).json({msg:'Connection Established',data:json});
})


// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});