import "./App.css";
import Demo from "./components/Demo";
import MapComponent from "./components/Map";

function App() {
  return (
    <>
      <div>
        <h1>OpenLayers React Example</h1>
        <div>
          <Demo />
        </div>
        <div>
          <MapComponent />
        </div>
      </div>
    </>
  );
}

export default App;
