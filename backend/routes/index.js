const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')

router = express.Router();

router.get("/", isLoggedIn, async function (req, res, next) {
  try {
    user = req.user
    const search = req.query.search || ''
    let sql = 'SELECT * FROM book'
    let [rows1, fild] = await pool.query('SELECT a.*, count(b.bi_book_id) FROM borrow_return JOIN borrow_item AS b on(borrow_return.borrow_id = b.bi_borrow_id) JOIN book AS a on(b.bi_book_id = a.book_id)GROUP BY(b.bi_book_id)order by count(b.bi_book_id) desc;')
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT * FROM book WHERE book_title LIKE ?;'
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json({
      rows: rows,
      user: user,
      rows1: rows1,
    });
  } catch (err) {
    return res.status(500).json(err)
  }
});
router.get("/returnList", isLoggedIn, async function (req, res, next) {
  try {
    user = req.user
    const search = req.query.search || ''
    let sql = 'SELECT * FROM book'
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT a.* FROM borrow_return JOIN borrow_item on(borrow_return.borrow_id = borrow_item.bi_borrow_id) JOIN book AS a on(borrow_item.bi_book_id = a.book_id) WHERE return_date IS NULL and br_member_id LIKE ?'
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json({
      rows: rows,
      user: user
    });
  } catch (err) {
    return res.status(500).json(err)
  }
});
exports.router = router;
