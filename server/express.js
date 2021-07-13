import express from 'express';
import models from './models/IndexModels';
import routes from './routes/IndexRoute';

const app = express();

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