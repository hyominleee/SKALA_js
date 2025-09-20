// src/pages/CartPage.jsx
// - API로 user/products/cart 로드 후 품목 병합
// - 전체선택/개별선택 (기본: 전체 선택 ON)
// - 수량 변경(재고 초과 시 팝업)
// - useCart로 합계 계산
// - 주문 완료 팝업

import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import CartItems from "../components/CartItems";
import CartSummary from "../components/CartSummary";
import { useCart } from "../hooks/useCart";
import Modal from "../components/Modal";

const USER_ID = "alice@gmail.com"; // 프로토타입: 고정 사용자

const KRW = (n) => `₩${(n || 0).toLocaleString()}`;

export default function CartPage() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // 체크 상태/팝업 상태
  const [stockAlert, setStockAlert] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  // 1) 데이터 로딩
  useEffect(() => {
    (async () => {
      const [u, p, c] = await Promise.all([
        api.getUser(USER_ID),
        api.getProducts(),
        api.getCart(USER_ID),
      ]);
      setUser(u);
      setProducts(p);
      // 장바구니 데이터를 로드할 때 "기본 전체 선택" ON
      setCart(c.map((ci) => ({ ...ci, selected: true })));
    })().catch(console.error);
  }, []);

  // 2) cart + products 병합 (가격/이름/이미지/재고를 cart 아이템에 붙임)
  const merged = useMemo(() => {
    const byId = new Map(products.map((p) => [p.product_id, p]));
    return cart
      .map((ci) => {
        const p = byId.get(ci.product_id);
        if (!p) return null;
        return {
          product_id: p.product_id,
          name: p.name,
          price: p.price,
          image_url: p.image_url,
          stock: p.stock,
          quantity: ci.quantity,
          selected: ci.selected,
        };
      })
      .filter(Boolean);
  }, [products, cart]);

  // 3) 선택/수량 조작 핸들러
  const allSelected = merged.length > 0 && merged.every((it) => it.selected);
  const selectedCount = merged.filter((it) => it.selected).length;

  const toggleAll = (checked) => {
    setCart((prev) => prev.map((ci) => ({ ...ci, selected: checked })));
  };

  const toggleItem = (product_id, checked) => {
    setCart((prev) =>
      prev.map((ci) => (ci.product_id === product_id ? { ...ci, selected: checked } : ci))
    );
  };

  const changeQty = (product_id, nextQty) => {
    setCart((prev) =>
      prev.map((ci) => (ci.product_id === product_id ? { ...ci, quantity: nextQty } : ci))
    );
  };

  // 4) 합계 계산은 "선택된 아이템"만 넘긴다
  const selectedItems = merged.filter((it) => it.selected);
  const { shipping, setShipping, totals } = useCart({
    items: selectedItems,
    membership: user?.membership ?? "BASIC",
  });

  // 5) 주문 버튼
  const handleOrder = () => {
    // 프로토타입: 서버 호출 없이 완료 팝업만
    setOrderDone(true);
  };

  return (
    <div className="max-w-md mx-auto max-w-3xl lg:max-w-4xl p-4 space-y-4" >
      <h1 className="text-xl font-semibold mb-2">장바구니</h1>

      {/* 아이템 목록 (체크/수량/재고처리) */}
      <CartItems
        items={merged}
        selectedCount={selectedCount}
        totalCount={merged.length}
        allSelected={allSelected}
        onToggleAll={toggleAll}
        onToggleItem={toggleItem}
        onChangeQty={changeQty}
        onExceedStock={() => setStockAlert(true)}
      />

      {/* 요약/배송/주문 버튼 */}
      <CartSummary
        totals={totals}
        shipping={shipping}
        onChangeShipping={setShipping}
        onOrder={handleOrder}
      />

      {/* 재고 부족 팝업 */}
      <Modal
        open={stockAlert}
        title="재고가 부족해요"
        message="입력한 수량이 재고보다 많아요."
        onClose={() => setStockAlert(false)}
      />

      {/* 주문 완료 팝업 */}
      <Modal
        open={orderDone}
        title="주문이 완료되었어요!"
        message={`결제 금액은 ${KRW(totals.payable)} 입니다.`}
        onClose={() => setOrderDone(false)}
      />
    </div>
  );
}
