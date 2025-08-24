import Preamble from "./Preamble";
import "./page.css";
import Works from "./components/works/Works";
import VeiwAllWork from "./VeiwAllWork";

export default function Home() {
  return (
    <main id="home" className="pageType-workCollection">
      <div className="workCollection">
        <div className="content--container workCollection--container">
          <div className="preContent"></div>
          <div className="js-fade__slow">
            <Preamble />
            <Works home={true}  />
            <VeiwAllWork />
          </div>
        </div>
      </div>
    </main>
  );
}
