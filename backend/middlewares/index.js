const pool = require("../config");

async function logger (req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

async function isLoggedIn (req, res, next) {
    let authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }
    
    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }
        
        // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        return res.status(401).send('You are not logged in')
    }
    
    if(token.user_librarian_id == null){
        const [member] = await pool.query(
            'SELECT member_id, p_mobile, p_faculty, p_firstname, p_lastname, p_username, p_position, p_address, p_email, p_password, p_major ' + 
            'FROM member WHERE member_id = ?', [token.user_member_id]
        )
        req.user = member[0]
        next()
    }
    if(token.user_member_id == null){
        const [librarian] = await pool.query(
            'SELECT librarian_id, p_mobile, p_faculty, p_firstname, p_lastname, p_username, p_position, p_department, p_address, p_email, p_password, p_function, cataloging_dept, information_service_dept ' + 
            'FROM librarian WHERE librarian_id = ?', [token.user_librarian_id]
        )
        req.user = librarian[0]
        next()
    }
        // Set user
}
module.exports = {
    logger,
    isLoggedIn
 }