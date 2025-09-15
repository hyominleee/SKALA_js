// ==========================
// server.js - 도서 재고 관리 서버
// ==========================

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const app = express();
const PORT = 3000;

// ==========================
// DB 초기화
// ==========================
const db = new Database("books.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id        TEXT PRIMARY KEY,
    title     TEXT NOT NULL,
    author    TEXT NOT NULL,
    price     INTEGER NOT NULL,
    stock     INTEGER NOT NULL DEFAULT 0,
    category  TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
  CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
`);


// ==========================
// Seed 데이터 로드 (최초 실행 시에만)
// ==========================
const rowCount = db.prepare("SELECT COUNT(*) as count FROM books").get().count;

if (rowCount === 0) {
  const seedPath = path.join(process.cwd(), "data.json");
  const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));

  const insert = db.prepare(`
    INSERT INTO books (id, title, author, price, stock, category)
    VALUES (@id, @제목, @저자, @가격, @재고, @카테고리)
  `);

  const insertMany = db.transaction((rows) => {
    for (const r of rows) insert.run(r);
  });
  insertMany(seed);

  console.log(`[seed] inserted ${seed.length} rows`);
} else {
  console.log(`[seed] skipped — existing rows found (${rowCount})`);
}


// ==========================
// 미들웨어 & 정적 서빙
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "program")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "program", "inventory.html"));
});

// ==========================
// API: 도서 조회 (검색/필터/페이지네이션)
// ==========================
app.get("/api/books", (req, res) => {
  const { q = "", category = "", inStock = "", page = 1, limit = 10 } = req.query;

  let baseSql = `FROM books WHERE 1=1`;
  const params = {};

  if (q) {
    baseSql += ` AND (LOWER(title) LIKE LOWER(@q) OR LOWER(author) LIKE LOWER(@q))`;
    params.q = `%${q}%`;
  }
  if (category && category !== "모두") {
    baseSql += ` AND category = @category`;
    params.category = category;
  }
  if (inStock === "1") {
    baseSql += ` AND stock > 0`;
  }

  const countSql = `SELECT COUNT(*) as total ${baseSql}`;
  const total = db.prepare(countSql).get(params).total;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));
  const offset = (pageNum - 1) * limitNum;

  const dataSql = `SELECT id, title, author, price, stock, category ${baseSql}
                   ORDER BY rowid ASC LIMIT @limit OFFSET @offset`;
  params.limit = limitNum;
  params.offset = offset;
  
  const rows = db.prepare(dataSql).all(params);

  res.json({
    page: pageNum,
    total,
    totalPages: Math.ceil(total / limitNum),
    books: rows,
  });
});

// ==========================
// API: 재고 일괄 업데이트
// ==========================
app.put("/api/books/bulk", (req, res) => {
  const { updates } = req.body;
  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: "updates must be an array" });
  }

  const stmt = db.prepare(`UPDATE books SET stock = @stock WHERE id = @id`);

  const txn = db.transaction((items) => {
    for (const it of items) {
      const s = Math.max(0, parseInt(it.stock, 10) || 0);
      stmt.run({ id: it.id, stock: s });
    }
  });

  try {
    txn(updates);
    res.json({ ok: true, updated: updates.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "update failed" });
  }
});

// ==========================
// 서버 실행
// ==========================
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
