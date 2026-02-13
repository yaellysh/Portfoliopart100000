
import WelcomeAnimation from "./WelcomeAnimation";
import Introduction from "./Introduction";
import NavBar from "./NavBar";

function Home() {
  return (
    <div className="home">
      <NavBar />
      <WelcomeAnimation />
      <Introduction />
    </div>
  );
}

export default Home;
