// src/components/CartSummary.jsx
// - 추가 할인 안내 문구 (적용 전/후)
// - 배송 방식 라디오 버튼 (일반배송 / 빠른배송) 
// - 합계 라인 + "예상 결제 금액 주문하기" 버튼

export default function CartSummary({
  totals,             // {subtotal, memberDiscount, extraDiscount, extraDiscountEligible, shippingFee, payable}
  shipping,           // "normal" | "fast"
  onChangeShipping,   // (value) => void
  onOrder,            // 주문하기 버튼 클릭 콜백
}) {
  const KRW = (n) => `₩${(n || 0).toLocaleString()}`;

  return (
    <aside className="p-4 border rounded-lg space-y-3 sticky top-4">
      {/* 추가 할인 안내 문구 */}
      <p className={`text-sm ${totals.extraDiscountEligible ? "text-blue-600" : "text-gray-600"}`}>
        총 주문 금액이 150,000원 이상이면{" "}
        {totals.extraDiscountEligible ? "추가할인이 적용되었어요!" : "추가할인이 적용되요!"}
      </p>

      {/* 금액 요약 */}
      <div className="space-y-1">
        <Row label="총 주문 금액" value={totals.subtotal} />
        <Row label="회원 멤버십 할인" value={-totals.memberDiscount} />
        <Row label="결제 금액별 할인" value={-totals.extraDiscount} />
        <Row label="배송비" value={totals.shippingFee} />
        <hr />
        <Row label="예상 결제 금액" value={totals.payable} strong />
      </div>

      {/* 배송비 선택 */}
      <div className="space-y-1">
        <div className="font-medium">배송비</div>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="shipping"
            value="normal"
            checked={shipping === "normal"}
            onChange={(e) => onChangeShipping(e.target.value)}
          />
          <span>일반 배송</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="shipping"
            value="fast"
            checked={shipping === "fast"}
            onChange={(e) => onChangeShipping(e.target.value)}
          />
          <span>빠른 배송 (+3,000원)</span>
        </label>
      </div>

      {/* 주문 버튼 */}
      <button
        onClick={onOrder}
        className="w-full py-3 rounded-lg bg-black text-white font-semibold"
      >
        {KRW(totals.payable)} 주문하기
      </button>
    </aside>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={strong ? "font-semibold" : ""}>
        ₩{(value || 0).toLocaleString()}
      </span>
    </div>
  );
}
