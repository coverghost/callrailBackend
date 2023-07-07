import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './components/router';
import { connectToDatabase } from './components/config/database';
const PORT = 3150
const application = express();
application.use(express.json());
const corsConfig = {
  origin: '*',
  methods: '*',
};
const args = process.argv.slice(2);

// Process the arguments
if (args.length === 0) {
  console.log('No arguments provided.');
} else {
  console.log('Arguments:');
  args.forEach((arg, index) => {
    console.log(`${index + 1}: ${arg}`);
  });
}
application.use(cors(corsConfig));
application.use(helmet.xssFilter());

application.use('/', router);


connectToDatabase()
application.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});