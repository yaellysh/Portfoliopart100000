
import WelcomeAnimation from "./WelcomeAnimation";
import Introduction from "./Introduction";
import Projects from "./Projects";
import NavBar from "./NavBar";

function Home() {
  return (
    <div className="home">
      <NavBar />
      <WelcomeAnimation />
      <Introduction />
      <Projects />
      <section className="footer-gradient" />
    </div>
  );
}

export default Home;
