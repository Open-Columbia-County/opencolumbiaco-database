const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

// Import Routers
const authenticate = require('./auth/authenticate')
const Auth = require('./users/authRouter')
const User = require('./users/userRouter')
const Projects = require('./projects/projectsRouter')

// Server set up
const server = express()

const sessionConfig = {
    name: 'auth',
    secret: 'authenticateUser',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore(
        {
            knex: require('./database/db-config.js'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 1000 * 60 * 60
        }
    )
};

// Api middleware
server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())
server.use(session(sessionConfig));

// API paths
server.use('/api/auth', Auth)
server.use('/api/users', User)
server.use('/api/projects', Projects)


server.get('/', (req, res) => {
    res.json({ message: 'Server is running'})
})

server.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = server