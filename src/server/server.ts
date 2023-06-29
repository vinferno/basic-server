import express from 'express';
import { env } from 'process';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3005;

app.get('/', function(req, res) {
    res.json({message: 'Yay!'});
});
app.get('/users', function(req, res) {
    res.sendFile(path.join(__dirname, 'users.json'))
});
app.post('/users', function(req, res) {
    const users = getResourceAndParse('users');
    users.push(req.body);
    saveFile('users', users);
    res.json(users);
})

app.get('/posts', function(req, res) {
    res.sendFile(path.join(__dirname, 'posts.json'))
});
app.post('/posts', function(req, res) {
    const posts = getResourceAndParse('posts');
    posts.push(req.body);
    saveFile('posts', posts);
    res.json(posts);
})


app.listen(PORT, function() {
    console.log('running at http://localhost:' + PORT);
});

function getResourceAndParse(resourceName: string) {
    const dataString = fs.readFileSync(path.join(__dirname, resourceName + '.json'), 'utf8');

    return JSON.parse(dataString);
}

function saveFile(resourceName: string, data: any) {
    fs.writeFileSync(path.join(__dirname, resourceName + '.json'), JSON.stringify(data))
}