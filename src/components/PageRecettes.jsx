import { useEffect, useState } from "react";
import Recette from "./Recette";
import ListeRecettes from "./ListeRecettes";
import "../styles/PageRecettes.css";

function PageRecettes() {
  const [liste, setListe] = useState([]);
  const [recette, setRecette] = useState({
    titre: "",
    ingredients: "",
    etapes: "",
    cuisson: "",
  });
  useEffect(() => {
    const chaine = localStorage.getItem("recettes");
    if (chaine) {
      const data = JSON.parse(chaine);
      setListe(data);
    }
  }, []);

  return (
    <div className="container">
      <ListeRecettes liste={liste} recette={recette} setRecette={setRecette} />
      <Recette
        liste={liste}
        setListe={setListe}
        recette={recette}
        setRecette={setRecette}
      />
    </div>
  );
}

export default PageRecettes;
