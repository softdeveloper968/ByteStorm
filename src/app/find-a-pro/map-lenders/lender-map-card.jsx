import BaseballCard from "@/components/baseball-cards/map-baseball-card";

export default function LenderCard({ lender, setLender }) {
  return (
    <main className="w-full h-full">
      <BaseballCard
        cardType={"lender"}
        professional={lender}
        setProfessional={setLender}
      />
    </main>
  );
};
