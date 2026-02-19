import Compass from "./Compass";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "min(2vh, 24px)",
        background: "#0b0b0c",
        color: "white",
      }}
    >
      <Compass />
    </main>
  );
}