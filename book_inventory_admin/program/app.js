// -------------------------
// app.js - 도서 재고 관리 (프론트엔드)
// -------------------------

// -------------------------
// API 호출
// -------------------------
const API = {
  list: (params = {}) => {
    const url = new URL(location.origin + "/api/books");
    if (params.q) url.searchParams.set("q", params.q);
    if (params.category) url.searchParams.set("category", params.category);
    if (params.inStock) url.searchParams.set("inStock", params.inStock);
    if (params.page) url.searchParams.set("page", params.page);
    if (params.limit) url.searchParams.set("limit", params.limit);
    return fetch(url).then(r => r.json());
  },
  bulkUpdate: (updates) =>
    fetch(location.origin + "/api/books/bulk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates })
    }).then(r => {
      if (!r.ok) throw new Error("update failed");
      return r.json();
    })
};

// -------------------------
// 상태 & DOM 요소
// -------------------------
let books = [];
let editMode = false;
let dirty = false;
let pendingStocks = {};
let currentPage = 1;
let totalPages = 1;

const tableBody = document.getElementById("bookTable");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const stockToggle = document.getElementById("stockToggle");
const updateBtn = document.getElementById("updateBtn");
const pagination = document.getElementById("pagination");

// -------------------------
// 데이터 로딩
// -------------------------
async function loadBooks(page = 1) {
  const q = (searchInput.value || "").trim();
  const category = categorySelect.value || "";
  const inStock = stockToggle.checked ? "1" : "";

  const data = await API.list({ q, category, inStock, page, limit: 10 });

  books = data.books;
  currentPage = data.page;
  totalPages = data.totalPages;
}

// -------------------------
// 테이블 렌더링
// -------------------------
function renderBooks() {
  tableBody.innerHTML = "";

  for (const book of books) {
    const row = document.createElement("tr");

    const stockCellHtml = editMode
      ? `
        <div class="stock-editor">
          <button class="step-btn" data-id="${book.id}" data-delta="-1" aria-label="decrease">▼</button>
          <input type="number" min="0"
            value="${(pendingStocks[book.id] ?? book.stock)}"
            data-id="${book.id}" class="stock-input" />
          <button class="step-btn" data-id="${book.id}" data-delta="1" aria-label="increase">▲</button>
        </div>
      `
      : `${book.stock}`;

    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.price.toLocaleString()}원</td>
      <td>${stockCellHtml}</td>
      <td>${book.category}</td>
    `;
    tableBody.appendChild(row);
  }

  if (editMode) {
    tableBody.querySelectorAll(".stock-input").forEach(inp => {
      inp.addEventListener("input", onInputChange);
    });
    tableBody.querySelectorAll(".step-btn").forEach(btn => {
      btn.addEventListener("click", onStep);
    });
    checkDirty();
  }
}

// -------------------------
// 페이지네이션
// -------------------------
function renderPagination() {
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener("click", async () => {
      await loadBooks(i);
      renderBooks();
      renderPagination();
    });
    pagination.appendChild(btn);
  }
}

// -------------------------
// 재고 수정 핸들러
// -------------------------
function onStep(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  const delta = parseInt(btn.dataset.delta, 10);

  const inp = tableBody.querySelector(`input.stock-input[data-id="${id}"]`);
  const next = Math.max(0, (parseInt(inp.value || "0", 10) + delta));
  inp.value = next;

  pendingStocks[id] = next;
  checkDirty();
}

function onInputChange(e) {
  const id = e.target.dataset.id;
  const v = Math.max(0, parseInt(e.target.value || "0", 10));
  e.target.value = String(v);
  pendingStocks[id] = v;
  checkDirty();
}

function checkDirty() {
  dirty = Object.keys(pendingStocks).some(k => {
    const book = books.find(b => b.id === k);
    return book && book.stock !== pendingStocks[k];
  });
  updateBtn.disabled = editMode && !dirty;
}

// -------------------------
// 모드 전환
// -------------------------
function enterEditMode() {
  editMode = true;
  pendingStocks = {};
  dirty = false;
  updateBtn.textContent = "재고 수정하기";
  updateBtn.disabled = true;
  renderBooks();
}

async function applyChangesAndExit() {
  const updates = [];
  for (const b of books) {
    const next = pendingStocks[b.id];
    if (typeof next === "number" && next !== b.stock) {
      updates.push({ id: b.id, stock: next });
    }
  }
  if (updates.length > 0) {
    await API.bulkUpdate(updates);
  }

  editMode = false;
  dirty = false;
  pendingStocks = {};
  updateBtn.textContent = "재고 업데이트하기";
  updateBtn.disabled = false;

  await loadBooks(currentPage);
  renderBooks();
  renderPagination();
}

// -------------------------
// 초기화
// -------------------------
async function init() {
  searchInput.addEventListener("input", async () => { 
    await loadBooks(1); renderBooks(); renderPagination(); 
  });
  categorySelect.addEventListener("change", async () => { 
    await loadBooks(1); renderBooks(); renderPagination(); 
  });
  stockToggle.addEventListener("change", async () => { 
    await loadBooks(1); renderBooks(); renderPagination(); 
  });

  updateBtn.addEventListener("click", async () => {
    if (!editMode) {
      enterEditMode();
    } else if (dirty) {
      await applyChangesAndExit();
    }
  });

  await loadBooks(1);
  renderBooks();
  renderPagination();
}

document.addEventListener("DOMContentLoaded", init);
