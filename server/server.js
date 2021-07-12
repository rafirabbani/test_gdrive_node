import config from '../config/config';
import { sequelize } from '../config/config-db';
import app from './express';


/* const app = express();
const port = 5000; */

/* app.get('/', (req, res) => {
    res.send('Hello World!')
}); */

/* app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); */

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("Connection established, do nothing");
    }

    app.listen(config.port, () =>
        console.info('Server started on port %s.', config.port),
    );
});
