import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import models from './models/IndexModels';
import routes from './routes/IndexRoute';

const app = express();

// parse body params and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use helmet spy bisa dikenali SEO
app.use(helmet());

// secure apps by setting various HTTP headers
app.use(compress());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use("/hello-world", (req, res) => {
    res.send("Hello  World from Mini Project")
});

//Assign Models to req.context middleware
app.use(async (req, res, next) => {
    req.context = { models };
    next();
});

//API Routes
app.use('/api/photos', routes.PhotosRoute);
app.use('/api/users', routes.UserRoute);

//Catch Unauthorized Error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
});

export default app