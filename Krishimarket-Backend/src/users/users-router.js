const express = require('express')
const path = require('path')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const UsersService = require('./users-service')


// All users
usersRouter
    .route('/')
    .get((req, res, next) => {
        UsersService.getAllUsers(req.app.get('db'))
            .then(user => {
                console.log('User:', user)
                res.json(user)
            })
            .catch(next)
    })
    //register new user
    .post(jsonBodyParser, (req, res, next) => {
        const {
            user_name,
            password,
            farm_name,
            street_address,
            city,
            state,
            zip } = req.body

        console.log("user_name:", user_name, "password-->", password, '<---');

        for (const field of ['user_name', 'password'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
        const passwordError = UsersService.validatePassword(password.trim())

        console.log("password error:", passwordError);

        if (passwordError)
            return res.status(400).json({ error: passwordError })

        UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_name
        )
            .then(hasUserWithUserName => {

                console.log("hasUserWithUserName:", hasUserWithUserName);

                if (hasUserWithUserName)
                    return res.status(400).json({ error: `Username already taken` })

                return UsersService.hashPassword(password.trim())
                    .then(hashedPassword => {
                        console.log("hashedpassword", hashedPassword);
                        const newUser = {
                            user_name,
                            password: hashedPassword,
                            farm_name,
                            street_address,
                            city,
                            state,
                            zip
                        }
                        console.log(newUser, 'new user payload')
                        return UsersService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                console.log("user:", user)
                                res
                                    .status(201)
                                    // .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(UsersService.serializeUser(user))
                            })
                            .catch(error => {
                                console.log('insert user', error)
                            })
                    })
                    .catch(error => {
                        console.log('hash password', error)
                    })
            })
            .catch(error => {
                console.log('duplicated username', error)
            })
    })

// Individual users by id
usersRouter
    .route('/:user_id')
    .all((req, res, next) => {
        const { user_id } = req.params;
        UsersService.getById(req.app.get('db'), user_id)
            .then(user => {
                if (!user) {
                    return res
                        .status(404)
                        .send({ error: { message: `User doesn't exist.` } })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(res.user)
    })
    .delete((req, res, next) => {
        const { user_id } = req.params;
        UsersService.deleteUser(
            req.app.get('db'),
            user_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = usersRouter
