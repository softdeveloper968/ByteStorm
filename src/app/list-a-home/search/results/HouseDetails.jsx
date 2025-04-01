import { CloseButton } from "@/app/list-a-home/search/results/CloseButton";
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore";
import { HouseDescription } from "@/app/list-a-home/search/results/HouseDescription";
import { PicturesComponent } from "@/app/list-a-home/search/results/PicturesComponent";
import { config } from "@/app/usignup/config";

function HouseDetailsMaps() {
  const useStore = useHomeResultsStore();
  return (
    <div
      className={"absolute w-full h-full"}
      style={{
        backgroundColor: config.colors.background,
        color: config.colors.black,
        zIndex: 2,
      }}
    >
      <div className={"relative w-full h-full flex flex-wrap"}>
        <PicturesComponent
          photos={useStore.houseDetails.photos}
          className={
            "lg:w-[50%] w-full lg:h-[calc(100%-5rem)] h-[calc(50%-2.5rem)]"
          }
        />
        <HouseDescription
          house={useStore.houseDetails}
          className={
            "lg:w-[50%] w-full lg:h-[calc(100%-5rem)] h-[calc(50%-2.5rem)] pb-8"
          }
        />
        <CloseButton
          color={config.colors.brandGreen}
          className={"absolute top-3 right-3 cursor-pointer shadow-mw_black"}
          onClick={() => useStore.changeHouseDetails(null)}
        />
      </div>
    </div>
  );
}

export default HouseDetailsMaps;
