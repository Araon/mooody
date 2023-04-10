// basic todo app using express

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database');
    }
);

// import routes
import todoRoutes from './routes/todos';

// routes
app.use('/todos', todoRoutes);

// listen for requests
app.listen(4000, () => {
    console.log('now listening for requests');
    }
);

