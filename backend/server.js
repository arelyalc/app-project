import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import User from './models/User';
import Question from './models/Question';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

// mongoose.connect('mongodb://localhost:27017/users');

// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully!');
// });

router.route('/users').get((req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

router.route('/questions').get((req, res) => {
    User.find((err, questions) => {
        if (err)
            console.log(err);
        else
            res.json(questions);
    });
});


router.route('/users/:id').get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});

router.route('/users/add').post((req, res) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/questions/add').post((req, res) => {
    let question = new Question(req.body);
    question.save()
        .then(question => {
            res.status(200).json({'question': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


router.route('/users/update/:id').post((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new Error('Could not load document'));
        else {
            user.title = req.body.title;
            user.responsible = req.body.responsible;
            user.description = req.body.description;
            user.severity = req.body.severity;
            user.status = req.body.status;

            user.save().then(user => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/users/delete/:id').get((req, res) => {
    User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));