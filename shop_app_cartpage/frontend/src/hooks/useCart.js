// src/hooks/useCart.js
// 장바구니 비용 계산 로직 (선택된 아이템만 합산)
// - 멤버십 할인: BASIC 0%, SILVER 5%, GOLD 10%, VIP 20%
// - 추가 할인: 총 주문 금액이 150,000원 이상이면 5,000원 할인
// - 배송비: 일반 0원 / 빠른 3,000원

import { useMemo, useState } from "react";

const MEMBER_RATE = { BASIC: 0, SILVER: 0.05, GOLD: 0.1, VIP: 0.2 };
const EXTRA_DISCOUNT_THRESHOLD = 150000;
const EXTRA_DISCOUNT_AMOUNT = 5000;

export function useCart({ items = [], membership = "BASIC" }) {
  // 배송 방식 상태 (UI에서 변경)
  const [shipping, setShipping] = useState("normal"); // "normal" | "fast"
  const shippingFee = shipping === "fast" ? 3000 : 0;

  const totals = useMemo(() => {
    // 총 주문 금액(=선택된 아이템들의 상품가*수량 합)
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    // 멤버십 할인 (소숫점 절삭)
    const memberRate = MEMBER_RATE[membership] ?? 0;
    const memberDiscount = Math.floor(subtotal * memberRate);

    // 추가 할인 (조건: "총 주문 금액" 기준)
    const extraDiscountEligible = subtotal >= EXTRA_DISCOUNT_THRESHOLD;
    const extraDiscount = extraDiscountEligible ? EXTRA_DISCOUNT_AMOUNT : 0;

    // 최종 결제 금액
    const payable = subtotal - memberDiscount - extraDiscount + shippingFee;

    return {
      subtotal,
      memberDiscount,
      extraDiscount,
      extraDiscountEligible,
      shippingFee,
      payable,
    };
  }, [items, membership, shippingFee]);

  return { shipping, setShipping, totals };
}
