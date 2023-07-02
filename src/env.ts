import * as dotenv from 'dotenv';
import {getOsEnv} from './lib/env/utils';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`)
})

export const env = {
    mongodb: {
        url: getOsEnv('MONGO_URL'),
    }
};