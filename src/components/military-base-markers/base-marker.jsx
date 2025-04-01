import Image from "next/image";
import { Marker } from "react-map-gl";

export default function BaseMarker({
  mapRef,
  data,
  imagePath,
  setSelectedBase,
  setSelectedArea,
  setHoveredBase,
}) {
  return (
    <>
      {data?.features?.map((base, index) => (
        <Marker
          key={index}
          latitude={base.geometry.coordinates[1]}
          longitude={base.geometry.coordinates[0]}
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setSelectedBase(base);
            setSelectedArea(base);

            mapRef.current?.flyTo({
              center: [
                base.geometry.coordinates[0],
                base.geometry.coordinates[1],
              ],
              zoom: 9,
              duration: 4000,
            });
          }}
        >
          <Image
            className="w-6 h-6 object-contain"
            src={imagePath}
            alt="Branch Icon"
            placeholder="blur"
            blurDataURL={imagePath}
            width={0}
            height={0}
            sizes="100vh"
            onMouseEnter={() => setHoveredBase(base)}
            onMouseLeave={() => setHoveredBase(null)}
          />
        </Marker>
      ))}
    </>
  );
};
