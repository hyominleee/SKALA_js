# 📚 1) Book Inventory Admin

> 도서 재고 관리 웹 애플리케이션 (관리자용 대시보드)<br>
> https://github.com/hyominleee/SKALA_js/tree/main/book_inventory_admin


![](https://velog.velcdn.com/images/yoonyouuu/post/292af9bb-77d4-4a2a-a4fe-76898a241eda/image.png)

![](https://velog.velcdn.com/images/yoonyouuu/post/ece0f281-f73b-4964-b1f4-35d4c80e120f/image.png)

![](https://velog.velcdn.com/images/yoonyouuu/post/2d012514-fc00-41c6-a7b6-4a609786e6b1/image.png)

---

## 🎯 프로그램 주제
도서 재고를 효율적으로 관리할 수 있는 **웹 기반 어드민 툴**입니다.  
검색, 카테고리 필터, 재고 업데이트 기능을 제공합니다.  

---

## 📝 목적
- JS + Node.js + SQLite 기반 풀스택 학습용 프로젝트

---

## 🛠 기술 스택
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (`better-sqlite3`)
- **Dev Tools**: Nodemon (개발 시 자동 재시작)

---

## 📂 파일 구조

![](https://velog.velcdn.com/images/yoonyouuu/post/5012bea6-8775-4cfc-a715-c61379793d68/image.png)




---

## ⚙️ 주요 기능

- **도서 검색** : 제목 / 저자 기준 검색
- **카테고리 필터** : 경영/경제, 소설, 에세이, 자기개발, 교재
- **재고만 보기** : 재고가 있는 항목만 필터링
- **페이지네이션** : 10개 단위 페이지 이동
- **재고 편집 모드** : 
  -각 행에서 ▲/▼ 버튼 또는 직접 입력으로 수량 변경  
  -`재고 업데이트하기 → 재고 수정하기` 버튼 전환  
  -일괄 업데이트 후 DB 반영  

---


## 실행 방법


```
<zsh>
npm install
npm run dev
npm start
```

<br>
<br>

## 🛍️ 2) Shopping Cartpage

> 쇼핑몰 장바구니 페이지<br>
https://github.com/hyominleee/SKALA_js/tree/main/shop_app_cartpage

![](https://velog.velcdn.com/images/yoonyouuu/post/b412e599-cf16-4215-b2ea-9912e398aad0/image.png)

![](https://velog.velcdn.com/images/yoonyouuu/post/dcb22ac2-f070-4d22-846c-e6a5263a5722/image.png)


---

## 🎯 프로그램 주제
회원 / 상품 / 장바구니 데이터를 불러와 선택 / 수량조절 / 할인 / 배송비를 반영한 예상 결제 금액을 계산합니다.

---

## 📝 목적
- 최소한의 스택으로 빠르게 동작하는 E2E 흐름 구현 
- DB(회원/상품/장바구니) → API → 프론트 계산/표시까지 한 번에 확인
`React(5173) ↔ FastAPI(8000) ↔ SQLite`

---

## 🛠 기술 스택

SQLite(DB) + FastAPI(백엔드) + React(Vite) + TailwindCSS(프론트)


- **Backend**: Python 3.10+, FastAPI, Uvicorn, SQLAlchemy, SQLite, Pydantic v2
- **Frontend**: React 18, Vite, TailwindCSS, Fetch API
- **기타**: Node 18+, npm



---

## 📂 파일 구조
        
        
![](https://velog.velcdn.com/images/yoonyouuu/post/49095df1-3652-45aa-8432-a1a0f46633ff/image.png)



## 📊 데이터 구조


### users

<table border=0 style="width:100%">
<tr>
  <th ><big>컬럼</big></th>
  <th><big>타입</big></th>
  <th><big>설명</big></th>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>user_id (PK)</big></td>
  <td align="center"><big>TEXT</big></td>
  <td align="center"><big>이메일</big></td>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>name</big></td>
  <td align="center"><big>TEXT</big></td>
  <td align="center"><big>회원명</big></td>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>phone (UNIQUE)</big></td>
  <td align="center"><big>TEXT</td>
  <td align="center"><big>전화번호</big></td>
</tr>
  <tr style="background-color:#ffffff">
  <td align="center"><big>membership</big></td>
  <td align="center"><big>TEXT</td>
  <td align="center"><big>BASIC/SILVER/GOLD/VIP</big></td>
</tr>
  <tr style="background-color:#ffffff">
  <td align="center"><big>created_at</big></td>
  <td align="center"><big>TEXT</td>
  <td align="center"><big>생성일(기본값 now)</big></td>
</tr>
</table>

<br>

### products


<table border=0 style="width:100%">
<tr>
  <th ><big>컬럼</big></th>
  <th><big>타입</big></th>
  <th><big>설명</big></th>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>product_id (PK)</big></td>
  <td align="center"><big>INTEGER</big></td>
  <td align="center"><big>상품 ID</big></td>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>name</big></td>
  <td align="center"><big>TEXT</big></td>
  <td align="center"><big>상품명</big></td>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>price</big></td>
  <td align="center"><big>INTEGER</big></td>
  <td align="center"><big>가격(원)</big></td>
</tr>
  <tr style="background-color:#ffffff">
  <td align="center"><big>image_url</big></td>
  <td align="center"><big>TEXT</big></td>
  <td align="center"><big>이미지 URL</big></td>
</tr>
  <tr style="background-color:#ffffff">
  <td align="center"><big>stock</big></td>
  <td align="center"><big>INTEGER</big></td>
  <td align="center"><big>재고</big></td>
</tr><tr style="background-color:#ffffff">
  <td align="center"><big>added_at</big></td>
  <td align="center"><big>DATETIME</big></td>
  <td align="center"><big>등록일</big></td>
</tr>
</table>


<br>

### cart

<table border=0 style="width:100%">
<tr>
  <th ><big>컬럼</big></th>
  <th><big>타입</big></th>
  <th><big>설명</big></th>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>cart_id (PK)</big></td>
  <td align="center"><big>INTEGER</td>
  <td align="center"><big>장바구니 ID</big></td>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>user_id (FK) </big></td>
  <td align="center"><big>TEXT</big></td>
  <td align="center"><big>users.user_id 참조</big></td>
</tr>
<tr style="background-color:#ffffff">
  <td align="center"><big>product_id (FK)</big></td>
  <td align="center"><big>INTEGER</big></td>
  <td align="center"><big>products.product_id 참조</big></td>
</tr>
  <tr style="background-color:#ffffff">
  <td align="center"><big>quantity</big></td>
  <td align="center"><big>INTEGER</big></td>
  <td align="center"><big>수량</big></td>
</tr>
  <tr style="background-color:#ffffff">
  <td align="center"><big>added_at</big></td>
  <td align="center"><big>DATETIME</big></td>
  <td align="center"><big>담은 시각</big></td>
</tr>
</table>

<br>

## 💳 주문 가격 정책 요약

- 멤버십 할인율: BASIC 0%, SILVER 5%, GOLD 10%, VIP 20%

- 추가 할인: 총 주문 금액 ≥ 150,000원 → 5,000원

- 배송비: 일반 0원 / 빠른 3,000원

- 최종 주문 금액 : 
final = subtotal − membershipDiscount − extraDiscount + shippingFee

<br>

## ✅ 빠른 실행

### backend

```
# 가상환경 실행
cd backend
python -m venv ../.venv
source ../.venv/bin/activate

# requirements 다운로드
pip install -r requirements.txt

# DB 초기화
sqlite3 shopping.db < db/schema.sql
sqlite3 shopping.db < db/seed.sql

# 서버 실행 (포트 8000)
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

```


### curl 확인


```
curl http://127.0.0.1:8000/healthz         # {"status":"ok"}
curl http://127.0.0.1:8000/products
curl 'http://127.0.0.1:8000/users/alice%40example.com'
curl 'http://127.0.0.1:8000/cart/alice%40example.com'

```


### frontend

```
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
# http://127.0.0.1:5173
```

<br>

## 🟠 API 요약

`GET /healthz` → {"status":"ok"}

`GET /users` → 전체 사용자

`GET /users/{user_id}` → 단일 사용자 (예: alice%40example.com)

`POST /users` → 사용자 생성

`GET /products` → 상품 리스트

`POST /products` → 상품 생성

`GET /cart/{user_id}` → 장바구니 항목

`POST /cart` → 장바구니 담기
