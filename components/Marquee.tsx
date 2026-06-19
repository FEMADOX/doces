"use client";

const ITEMS = [
  "BRIGADEIRO GOURMET",
  "BROWNIE",
  "BOLO NO POTE",
  "CHEESECAKE",
  "CUPCAKE",
];

function Sequence() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="contents">
          <span className="px-[26px]">{item}</span>
          <span className="px-[26px] text-honey">✦</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y-[3px] border-caramel-dark bg-caramel py-4">
      <div
        className="flex w-max whitespace-nowrap font-display"
        style={{
          color: "#F6ECDB",
          fontSize: "clamp(22px,3vw,38px)",
          animation: "marquee 28s linear infinite",
        }}
      >
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
