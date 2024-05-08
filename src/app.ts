import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from '@hackatone/routes';
import { swagger, swaggerUI } from '@hackatone/config';
import { notFound, error } from '@hackatone/middleware';

require('dotenv').config();

const app = express();

const swaggerSpec = swaggerJSDoc(swagger);
//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUI));
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerSpec, swaggerUI));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(notFound);
app.use(error);

export default app;
