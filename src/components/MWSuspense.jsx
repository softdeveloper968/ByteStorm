import Image from "next/image"

export default function MWSuspense(props) {
  return (
    <main style={{
      display: "flex",
      position: "absolute",
      width: "100vw",
      height: "100vh",
      background: "#000",
      top: 0,
      left: 0
    }}>
      <h1>Loading...</h1>
      <Image
        src={"/images/logos-must-wants/must-wants-logo.png"}
        alt={"MustWants is loading..."}
        style={{width: "100%", objectFit: "contain"}}
      />
    </main>)
}