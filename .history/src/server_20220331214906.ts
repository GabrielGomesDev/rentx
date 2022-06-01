import express from 'express';
import { createCourse } from './routes';

const app = express();

app.get('', (request, response) => {
    return response.json({message: 'hi'});    
})
app.listen(3333);
