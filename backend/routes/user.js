const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')


router = express.Router();

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT p_username FROM member WHERE p_username = ?", [value])
    if (rows.length > 0) {
        const message = 'This username is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().required().email(),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    address: Joi.string().required().max(255),
    Faculty: Joi.string().required(),
    Major: Joi.string().required(),
})

router.post('/user/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const mobile = req.body.mobile
    const address = req.body.address
    const Faculty = req.body.Faculty
    const Major = req.body.Major

    try {
        await conn.query(
            'INSERT INTO member(p_mobile, p_faculty, p_firstname, p_lastname, p_username, p_position, p_address, p_email, p_password, p_major) VALUES (?, ?, ?, ?, ?, "member", ?, ?, ?, ?)',
            [mobile, Faculty, first_name, last_name, username, address, email, password, Major]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

const signuplibrarian = Joi.object({
    email: Joi.string().required().email(),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    address: Joi.string().required().max(255),
    Faculty: Joi.string().required(),
    Deparment: Joi.string().required(),
    JobPosition: Joi.string().required(),
    Function1: Joi.string().required(),
})

router.post('/user/signuplibrarian', async (req, res, next) => {
    // try {
    //     await signuplibrarian.validateAsync(req.body, { abortEarly: false })
    // } catch (err) {
    //     return res.status(400).send(err)
    // }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const mobile = req.body.mobile
    const JobPosition = req.body.JobPosition
    const address = req.body.address
    const Faculty = req.body.Faculty
    const Deparment = req.body.Deparment
    const Function1 = req.body.Function1

    try {
        console.log(JobPosition)
        if (JobPosition == "c1") {
            await conn.query(
                'INSERT INTO librarian(p_mobile, p_faculty, p_firstname, p_lastname, p_username, p_position, p_department, p_address, p_email, p_password, p_function, cataloging_dept, information_service_dept) VALUES (?, ?, ?, ?, ?, "librarian", ?, ?, ?, ?, ?, 1, 0)',
                [mobile, Faculty, first_name, last_name, username, Deparment, address, email, password, Function1]
            )
            conn.commit()
            res.status(201).send()
        }else{
            await conn.query(
                'INSERT INTO librarian(p_mobile, p_faculty, p_firstname, p_lastname, p_username, p_position, p_department, p_address, p_email, p_password, p_function, cataloging_dept, information_service_dept) VALUES (?, ?, ?, ?, ?, "librarian", ?, ?, ?, ?, ?, 0, 1)',
                [mobile, Faculty, first_name, last_name, username, Deparment, address, email, password, Function1]
            )
            conn.commit()
            res.status(201).send()
        }

    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [member] = await conn.query(
            'SELECT * FROM member WHERE p_username = ?',
            [username]
        )
        const [librarian] = await conn.query(
            'SELECT * FROM librarian WHERE p_username = ?',
            [username]
        )
        const user = member[0]
        const user1 = librarian[0]
        if (!user && user1 == undefined) {
            throw new Error('Incorrect username or password')
        }
        if (!user1 && user == undefined) {
            throw new Error('Incorrect username or password')
        }
        // Check if password is correct
        if (user && user1 == undefined) {
            if (password != user.p_password) {
                throw new Error('Incorrect username or password')
            }

        }
        if (user1 && user == undefined) {
            if (password != user1.p_password) {
                throw new Error('Incorrect username or password')
            }
        }

        // Check if token already existed
        if (user == undefined) {
            const [tokens] = await conn.query(
                'SELECT * FROM tokens WHERE user_librarian_id = ?',
                [user1.librarian_id]
            )
            let token = tokens[0]?.token
            if (!token) {
                // Generate and save token into database
                token = generateToken()
                await conn.query(
                    'INSERT INTO tokens(user_librarian_id, token) VALUES (?, ?)',
                    [user1.librarian_id, token]
                )
                conn.commit()
                res.status(200).json({ 'token': token })
            }
        }
        else {
            const [tokens] = await conn.query(
                'SELECT * FROM tokens WHERE user_member_id = ?',
                [user.member_id]
            )
            let token = tokens[0]?.token
            console.log(token)
            if (!token) {
                // Generate and save token into database
                token = generateToken()
                await conn.query(
                    'INSERT INTO tokens(user_member_id, token) VALUES (?, ?)',
                    [user.member_id, token]
                )
                conn.commit()
                res.status(200).json({ 'token': token })
            }
        }

    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})

router.delete('/user/logout', isLoggedIn, async (req, res, next) => {

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        const user = req.user
        if (user.member_id == null) {
            const [tokens] = await conn.query(
                'SELECT * FROM tokens WHERE user_librarian_id=?',
                [user.librarian_id]
            )
            let token = tokens[0]?.token
            console.log(token)
            if (token) {
                // Generate and save token into database
                token = generateToken()
                await conn.query(
                    'DELETE FROM tokens WHERE user_librarian_id=? ',
                    [user.librarian_id]
                )
            }
            conn.commit()
            res.json("success")
        }
        if (user.librarian_id == null) {
            const [tokens] = await conn.query(
                'SELECT * FROM tokens WHERE user_member_id=?',
                [user.member_id]
            )
            let token = tokens[0]?.token
            if (token) {
                // Generate and save token into database
                token = generateToken()
                await conn.query(
                    'DELETE FROM tokens WHERE user_member_id=? ',
                    [user.member_id]
                )
            }
            conn.commit()
            res.json("success")
        }
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})

router.post('/user/update', async (req, res, next) => {

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const password = req.body.password
    const first_name = req.body.firstname
    const last_name = req.body.lastname
    const email = req.body.email
    const mobile = req.body.mobile
    const address = req.body.address
    const id = req.body.id
    const check = req.body.check

    try {
        if (check == 0) {
            await conn.query(
                'UPDATE member SET member.p_mobile = ?, member.p_firstname = ?, member.p_lastname = ?,  member.p_address = ?, member.p_email = ?,member.p_password = ? WHERE member_id=?',
                [mobile, first_name, last_name, address, email, password, id]
            )
            let [rows, fild] = await conn.query(
                'SELECT * FROM member WHERE member_id = ?', [id]
            )
            conn.commit()
            res.json({ rows: rows })
        } else {
            await conn.query(
                'UPDATE librarian SET librarian.p_mobile = ?, librarian.p_firstname = ?, librarian.p_lastname = ?,  librarian.p_address = ?, librarian.p_email = ?,librarian.p_password = ? WHERE librarian_id=?',
                [mobile, first_name, last_name, address, email, password, id]
            )
            let [rows, fild] = await conn.query(
                'SELECT * FROM librarian WHERE librarian_id = ?', [id]
            )
            conn.commit()
            res.json({ rows: rows })
        }
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})

exports.router = router