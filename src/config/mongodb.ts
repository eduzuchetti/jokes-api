import mongoose from 'mongoose'

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    connectTimeoutMS: 3000,
    retryWrites: true,
    w: 'majority'
}

const mdb_uri: string = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/jokes'

mongoose.connect(mdb_uri, options).then(
    () => { console.info('Connected on', mongoose.connection.host) }
).catch(
    err => console.error('Fail to connect on MongoDB:', err)
)

export default mongoose.connection

/** Adicional functions to control database connection */
export const close = () => {
    mongoose.connection.close().then(
        () => { console.info('Connection closed calling mongoose.connection.close()') }
    ).catch(
        err => console.error('Failed to close connection via mongoose.connection.close():', err)
    )
}

export const disconnect = () => {
    mongoose.disconnect().then(
        () => { console.info('Connection closed calling mongoose.connection.close()') }
    ).catch(
        err => console.error('Failed to close connection via mongoose.connection.close():', err)
    )
}