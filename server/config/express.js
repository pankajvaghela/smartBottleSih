import express from 'express';
import bodyParser from 'body-parser';
// import morgan from 'morgan';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import methodOverride from 'method-override';

import dirs from './directory';



const app = express();

app.set('view engine', 'ejs');

require('dotenv').config();
const APP_PORT = process.env.PORT || (process.env.APP_PORT || 3000);

app.set('port',  APP_PORT);
app.set('host',  process.env.APP_HOST || '0.0.0.0');

// app.use('/dist',express.static(dirs.distDir));
app.use(express.static(dirs.assetsDir));

// app.use(cors());
// app.use(helmet());
// app.use(compression());
// app.use(methodOverride());
app.use(bodyParser.json());
// app.use(morgan('dev'));

export default app;