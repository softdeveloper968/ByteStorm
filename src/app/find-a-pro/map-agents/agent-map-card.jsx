import BaseballCard from "@/components/baseball-cards/map-baseball-card";

export default function AgentCard({ agent, setAgent }) {
  return (
    <main className="w-full h-full">
      <BaseballCard
        cardType={"agent"}
        professional={agent}
        setProfessional={setAgent}
      />
    </main>
  );
};
