import MyHeader from "./components/Header";
import PageRecettes from "./components/PageRecettes";
import MyFooter from "./components/Footer";
import "./styles/App.css";

function App() {
  console.log(<MyHeader />);
  return (
    <div>
      <MyHeader />
      <PageRecettes />
      <MyFooter />
    </div>
  );
}

export default App;
