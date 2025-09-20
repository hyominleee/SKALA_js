// src/components/CartItems.jsx
// - 전체 상품 선택 체크 박스
// - 아이템별 선택 체크박스
// - 수량 증감 (재고 초과면 콜백으로 팝업 오픈)

export default function CartItems({
  items,                 // [{ product_id, name, price, image_url, quantity, stock, selected }]
  selectedCount,         // 선택된 개수
  totalCount,            // 총 개수
  allSelected,           // 전체 선택 여부
  onToggleAll,           // (checked:boolean) => void
  onToggleItem,          // (product_id:number, checked:boolean) => void
  onChangeQty,           // (product_id:number, nextQty:number) => void
  onExceedStock,         // () => void (재고 초과 팝업 open)
}) {
  const KRW = (n) => `₩${(n || 0).toLocaleString()}`;

  return (
    <div className="space-y-3">
      {/* 전체 선택 */}
      <label className="flex items-center gap-2 px-1">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onToggleAll(e.target.checked)}
        />
        <span className="text-sm text-gray-700">
          전체선택 ({selectedCount}/{totalCount})
        </span>
      </label>

      <ul className="divide-y rounded-lg border">
        {items.map((it) => (
          <li key={it.product_id} className="flex items-center gap-3 p-3">
            {/* 개별 선택 */}
            <input
              type="checkbox"
              checked={!!it.selected}
              onChange={(e) => onToggleItem(it.product_id, e.target.checked)}
            />

            {/* 썸네일 */}
            <img
              src={it.image_url}
              alt={it.name}
              className="w-16 h-16 object-cover rounded bg-gray-100"
            />

            {/* 이름/가격 */}
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-gray-500">{KRW(it.price)}</div>
            </div>

            {/* 수량 조절 */}
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                onClick={() => onChangeQty(it.product_id, Math.max(1, it.quantity - 1))}
                aria-label="decrement"
              >
                −
              </button>
              <span className="w-6 text-center">{it.quantity}</span>
              <button
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                onClick={() => {
                  const next = it.quantity + 1;
                  if (it.stock !== undefined && next > it.stock) {
                    onExceedStock?.();
                    return;
                  }
                  onChangeQty(it.product_id, next);
                }}
                aria-label="increment"
              >
                +
              </button>
            </div>

            {/* 라인 합계 */}
            <div className="w-24 text-right font-semibold">
              {KRW(it.price * it.quantity)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
