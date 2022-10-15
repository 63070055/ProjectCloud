const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const { isLoggedIn } = require('../middlewares');
const { count } = require("console");

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
  const promise1 = pool.query("SELECT * FROM borrow_return JOIN borrow_item on(borrow_return.borrow_id = borrow_item.bi_borrow_id) JOIN book on(borrow_item.bi_book_id = book.book_id) WHERE br_member_id=? and return_date is null ", [
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
}
);

router.post('/borrow', isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const borrow_date = req.body.borrowdate
  const borrow_dateline_date = req.body.datelinedate
  const br_member_id = req.body.borrowby
  const br_librarian_id = req.body.librarian
  const bibookid = req.body.bookid
  // console.log(borrow_status)
  try {

    let rows = await conn.query(
      'INSERT INTO borrow_return(borrow_date, borrow_status, borrow_dateline_date, br_member_id, br_librarian_id) VALUES (?, "borrowed", ?, ?, ?)',
      [borrow_date, borrow_dateline_date, br_member_id, br_librarian_id]

    )
    console.log(rows[0].insertId)
    await conn.query(
      'INSERT INTO borrow_item(bi_borrow_id, bi_book_id) VALUES (?, ?)',
      [rows[0].insertId, bibookid]

    )
    await conn.query(
      'UPDATE book SET book.book_status = ? WHERE book_id=?',
      ['borrowed', bibookid]

    )
    await conn.commit()
    res.json("success")

  } catch (e) {
    await conn.rollback();
    next(e)
  } finally {
    conn.release();
  }
})

router.post('/return', isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  const bibookid = req.body.bookid
  const return_date1 = req.body.return_date
  // console.log(borrow_status)
  try {
    const [rows, fields1] = await conn.query(
      'SELECT * FROM `borrow_item` WHERE `bi_book_id` = ? and return_date IS NULL',
      [bibookid]
    )
    const id = rows[0]
    console.log(return_date1)
    await conn.query(
      'UPDATE borrow_item SET borrow_item.return_date = ? WHERE bi_borrow_id=?',
      [return_date1, id.bi_borrow_id]

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
})
router.post('/edit',isLoggedIn , async function (req, res, next) {
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
}),
router.delete('/delete/:bookid',isLoggedIn , async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  console.log(req.params.bookid)

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
})
exports.router = router;
