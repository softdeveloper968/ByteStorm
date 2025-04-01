import { ListHomeButton } from "@/app/list-a-home/common/no-houses/SellingProcess";
import { Container, SectionTitle } from "@/app/list-a-home/common/NoHouses";

const Benefits = (props) => {
  const size = 40;
  return (
    <Container className="px-4 py-5 md:p-10 xl:p-12" style={{ backgroundColor: "#3b3a3a" }}>
      <h2 className="text-center md:text-left text-2xl md:text-3xl font-roboto">{props.content.title}</h2>
      <div className={"flex flex-wrap py-5 md:p-6 xl:p-8 align-items-center justify-center"}>
        {props.content.cards.map((card, index) => (
          <SmallCard
            key={"card" + index}
            label={card.label}
            title={card.title}
            icon={card.icon}
          />
        ))}
      </div>
      {/* <div
        className={"flex max-w-full my-2 justify-center"}
        style={{ color: "black" }}
      >
        <ListHomeButton isRent={props.isRent} />
      </div> */}
    </Container>
  );
};

const SmallCard = ({ icon, title, label }) => {
  const style = {
    backgroundColor: "#272424",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "400px",
    maxHeight: "286",
    width: "100%",
  };
  return (
    <Container
      style={style}
      className={
        "flex column flex-col justify-start p-4 md:p-6 xl:p-8 shadow-2xl mx-3 md:mx-5 xl:mx-8 rounded-xl my-3 md:my-5 xl:my-8"
      }
    >
      <div className={"p-4 items-center flex justify-center flex-col"}>
        {icon}
        <SectionTitle title={title} className={"mt-4"} />
      </div>
      <p style={{ fontFamily: "Roboto" }}>{label}</p>
    </Container>
  );
};
export default Benefits;
