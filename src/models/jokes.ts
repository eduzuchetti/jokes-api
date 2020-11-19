import { model, Schema } from 'mongoose'

export default model('Jokes', new Schema({
    joke: {
        type: String,
        required: true
    },
    has_answer: {
        type: Boolean,
        default: true
    },
    answer: {
        type: String,
        required: false
    },
    approved: {
        type: Boolean,
        default: true
    },
    under_review: {
        type: Boolean,
        default: true
    },
    mainTheme: Array,
    author: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
}))