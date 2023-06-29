import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './components/router';
import { connectToDatabase, db } from './components/config/database';
const PORT = 3090
const application = express();
application.use(express.json());
const corsConfig = {
  origin: '*',
  methods: '*',
};

application.use(cors(corsConfig));
application.use(helmet.xssFilter());

application.use('/', router);


connectToDatabase()
application.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});