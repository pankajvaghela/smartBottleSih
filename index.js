import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));


let serverIp = 'localhost';

app.get('/', (req, res) => {
    res.redirect(`http://${serverIp}`);
});

app.post('/changehostip', (req, res) => {
    serverIp = req.body.ip;
    console.log(serverIp)
    res.send("ok");
});

require('dotenv').config();
const APP_PORT = process.env.PORT || (process.env.APP_PORT || 3000);

app.set('port',  APP_PORT);
app.set('host',  process.env.APP_HOST || '0.0.0.0');


app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});
