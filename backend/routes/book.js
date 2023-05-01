const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const { isLoggedIn } = require('../middlewares');
const { count } = require("console");
const moment = require('moment-timezone');


router = express.Router();

const blogOwner = async (req, res, next) => {
  if (req.user.role === 'admin') {
    return next()
  }
  const [[blog]] = await pool.query('SELECT * FROM blogs WHERE id=?', [req.params.id])

  if (blog.create_by_id !== req.user.id) {
    return res.status(403).send('You do not have permission to perform this action')
  }

  next()
}
// SET STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/blogs", isLoggedIn, function (req, res, next) {
  user = req.user
  // and return_date is null
  const promise1 = pool.query("SELECT * FROM borrow_return JOIN borrow_item on(borrow_return.borrow_id = borrow_item.bi_borrow_id) JOIN book on(borrow_item.bi_book_id = book.book_id) WHERE br_member_id=? ", [
    user.member_id,
  ]);
  Promise.all([promise1])
    .then((results) => {
      const [images, imageFields] = results[0];
      res.json({
        images: images,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.get("/borrow_return", isLoggedIn, function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM borrow_return JOIN borrow_item on(borrow_return.borrow_id = borrow_item.bi_borrow_id) JOIN book on(borrow_item.bi_book_id = book.book_id) JOIN member on(borrow_return.br_member_id = member.member_id)");
  Promise.all([promise1])
    .then((results) => {
      const [returndata, returnFields] = results[0];
      res.json({
        returndata: returndata,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.get("/addrequest", isLoggedIn, function (req, res, next) {
  const promise = pool.query("SELECT * FROM confirmborrow JOIN book on(confirmborrow.con_book_id = book.book_id)");
  Promise.all([promise])
    .then((results) => {
      const [returndata, returnFields] = results[0];
      const booking = returndata.map(row => ({
        con_ID: row.con_ID,
        con_status: row.con_status,
        con_borrow_date: moment.utc(row.con_borrow_date).tz('Asia/Bangkok').format(),
        con_borrow_dateline_date: moment.utc(row.con_borrow_dateline_date).tz('Asia/Bangkok').format(),
        con_member_id: row.con_member_id,
        con_book_id: row.con_book_id,
        book_status: row.book_status,
        book_title: row.book_title,
        book_librarian_id: row.book_librarian_id,
        book_image: row.book_image
      }))
      res.json({
        borrowdate: booking,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.get("/returnbook", isLoggedIn, function (req, res, next) {
  const promise = pool.query("SELECT * FROM borrow_return JOIN borrow_item on(borrow_return.borrow_id = borrow_item.bi_borrow_id)");
  Promise.all([promise])
    .then((results) => {
      const [returndata, returnFields] = results[0];
      const booking = returndata.map(row => ({
        borrow_id: row.borrow_id,
        borrow_date: moment.utc(row.borrow_date).tz('Asia/Bangkok').format(),
        borrow_dateline_date: moment.utc(row.borrow_dateline_date).tz('Asia/Bangkok').format(),
        br_member_id: row.br_member_id,
        br_librarian_id: row.br_librarian_id,
        item_no: row.item_no,
        bi_book_id: row.bi_book_id,
        borrow_status: row.borrow_status,
      }))
      res.json({
        returndata: booking,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.post("/addBook", upload.array("myImage", 1), async function (req, res, next) {
  if (req.method == "POST") {
    const file = req.files;
    let pathArray = [];
    console.log(file)
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const title = req.body.title;
    const language = req.body.language;
    const type = req.body.type;
    const isbn = req.body.isbn;
    const bookyear = req.body.bookyear;
    const edition = req.body.edition;
    const accesnumber = req.body.accesnumber;
    const publisher = req.body.publisher;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const status = req.body.status;
    const barcode = req.body.barcode;
    const createby = req.body.createby;

    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    try {
      req.files.forEach((file, index) => {
        let path = [file.path.substring(6)];
        pathArray.push(path);
      });
      let results = await conn.query(
        "INSERT INTO book(book_status, book_language, book_edition ,book_type, book_isbn, barcode, book_year, book_title, book_accessnumber, book_publisher, book_price, book_quantity, book_librarian_id, book_image) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [status, language, edition, type, isbn, barcode, bookyear, title, accesnumber, publisher, price, quantity, createby, pathArray]
      );
      await conn.commit();
      console.log(results)
      res.send("success!");
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  }
});

router.post('/memberborrow', isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const con_borrow_date = req.body.borrowdate
  const con_borrow_dateline_date = req.body.datelinedate
  const con_member_id = req.body.memnerId
  const con_book_id = req.body.bookid
  try {

    let rows = await conn.query(
      'INSERT INTO confirmborrow( con_status, con_borrow_date , con_borrow_dateline_date, con_member_id,con_book_id) VALUES ("waiting", ?, ?, ?,?)',
      [con_borrow_date, con_borrow_dateline_date, con_member_id, con_book_id]

    )
    await conn.query(
      'UPDATE book SET book.book_status = ? WHERE book_id=?',
      ['waiting', con_book_id]

    )
    await conn.commit()
    res.json("success")
  } catch (e) {
    await conn.rollback();
    next(e)
  } finally {
    conn.release();
  }
});

router.post('/borrow', isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const borrow_date = req.body.borrowdate
  const borrow_dateline_date = req.body.datelinedate
  const br_member_id = req.body.borrowby
  const br_librarian_id = req.body.librarian
  const bibookid = req.body.bookid
  const conID = req.body.conID
  try {

    let rows = await conn.query(
      'INSERT INTO borrow_return(borrow_date, borrow_status, borrow_dateline_date, br_member_id, br_librarian_id) VALUES (?, "borrowed", ?, ?, ?)',
      [borrow_date, borrow_dateline_date, br_member_id, br_librarian_id]
    )
    const br_id = rows[0].insertId;
    await conn.query(
      'INSERT INTO borrow_item(return_date,bi_borrow_id, bi_book_id,bi_borrow_status) VALUES (?, ?, ?, ?)',
      [borrow_dateline_date, br_id, bibookid, "borrowed"]

    )
    await conn.query(
      'UPDATE book SET book.book_status = ? WHERE book_id=?',
      ['borrowed', bibookid]

    )
    await conn.query(
      'DELETE FROM confirmborrow WHERE con_ID=?',
      [conID]
    )
    await conn.commit()
    res.json("success")

  } catch (e) {
    await conn.rollback();
    next(e)
  } finally {
    conn.release();
  }
});

router.post('/return', isLoggedIn, async function (req, res, next) {
  console.log("55")
  const bibookid = req.body.bookid;
  const borrowid = req.body.borrowid;
  const Item_on = req.body.Itemon;
  console.log(bibookid)

  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try {
    await conn.query(
      'UPDATE borrow_item SET borrow_item.bi_borrow_status = ? WHERE item_no=?',
      ['unborrow', Item_on]

    )
    await conn.query(
      'UPDATE borrow_return SET borrow_return.borrow_status = ? WHERE borrow_id=?',
      ['unborrow', borrowid]
    )
    await conn.query(
      'UPDATE book SET book.book_status = ? WHERE book_id=?',
      ['unborrow', bibookid]
    )
    await conn.commit()
    res.json("success")

  } catch (e) {
    await conn.rollback();
    next(e)
  } finally {
    conn.release();
  }
});

router.post('/edit', isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  console.log(req.body)


  const book_title = req.body.booktitle
  const book_type = req.body.booktype
  const book_year = req.body.bookyear
  const book_language = req.body.booklanguage
  const book_publisher = req.body.bookpublisher
  const book_price = req.body.bookprice
  const bibookid = req.body.bookid

  try {

    let rows = await conn.query(
      'UPDATE book SET book.book_title=?, book.book_type=?, book.book_year=?, book.book_language=?, book.book_publisher=?, book.book_price=? WHERE book_id =?',
      [book_title, book_type, book_year, book_language, book_publisher, book_price, bibookid]

    )
    await conn.commit()
    res.json("success")

  } catch (e) {
    await conn.rollback();
    next(e)
  } finally {
    conn.release();
  }
});

router.delete('/delete/:bookid', isLoggedIn, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
      const [rows, fields] = await pool.query(
        'DELETE FROM borrow_item WHERE bi_book_id=?', [req.params.bookid]
      )
      const [rows1, fields1] = await pool.query(
        'DELETE FROM book WHERE book_id=?', [req.params.bookid]
      )
      res.json("success")

    } catch (e) {
      await conn.rollback();
      next(e)
    } finally {
      conn.release();
    }
});

router.delete('/deletecomfirm', isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  const conid = req.body.confirmID;
  const bookid = req.body.bookID;
  try {
    await pool.query(
      'DELETE FROM confirmborrow WHERE con_ID=?', [conid]
    )
    await pool.query('UPDATE book SET book.book_status = ? WHERE book_id=?',
      ['unborrow', bookid])
    res.json("success")

  } catch (e) {
    await conn.rollback();
    next(e)
  } finally {
    conn.release();
  }
});
exports.router = router;
