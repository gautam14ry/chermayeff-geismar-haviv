import Preamble from "./Preamble";
import "./page.css";

export default function Home() {
  return (
    <main id="home" className="pageType-workCollection">
      <div className="workCollection">
        <div className="content--container workCollection--container">
          <div className="preContent"></div>
          <div className="js-fade__slow">
            <Preamble />
          </div>
        </div>
      </div>
    </main>
  );
}
