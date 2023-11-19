import Image from "next/image";
import Header from "./components/header";
import Main from "./components/main";

export default function Home() {
  return (
    <main>
      <div>
        <Header />
        <Main />
      </div>
    </main>
  );
}
