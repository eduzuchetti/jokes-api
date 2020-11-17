import { model, Schema } from 'mongoose'

export default model('Users', new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    external_uuid: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    profile_verified: {
        type: Boolean,
        default: false
    },
    under_review: {
        type: Boolean,
        default: false
    },
    admin_level: {
        type: Number,
        default: 0
    },
    user_jokes: [{ type: Schema.Types.ObjectId, ref: 'Jokes' }],
    twitter_user: String,
    facebook_user: String,
    instagram_user: String,
    github_user: String,
    profile_image: String,
}))