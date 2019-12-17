import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Question = new Schema({
    question: {
        type: String
    },
    choice1: {
        type: String
    },
    choice2: {
        type: String
    },
    choice3: {
        type: String
    }, 
    user_id: {
        type: String
    }
});

export default mongoose.model('Question', Question);