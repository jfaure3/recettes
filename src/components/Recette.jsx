import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/PageRecettes.css";
import Dexie from "dexie";

// Initialisez Dexie et créez la base de données
const db = new Dexie("recettesDB");
db.version(1).stores({
  recettes: "titre", // Utilisez le titre comme clé primaire
});

function Recette({ liste, setListe, recette }) {
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [etapes, setEtapes] = useState("");
  const [cuisson, setModeCuisson] = useState("");

  useEffect(() => {
    setTitre(recette.titre);
    setIngredients(recette.ingredients);
    setEtapes(recette.etapes);
    setModeCuisson(recette.cuisson);

    // Charger les recettes depuis Dexie
    (async () => {
      const recettes = await db.recettes.toArray();
      setListe(recettes);
    })();
  }, [recette, setListe]);

  const handleTitreChange = (event) => setTitre(event.target.value);
  const handleIngredientsChange = (event) => setIngredients(event.target.value);
  const handleEtapesChange = (event) => setEtapes(event.target.value);
  const handleCuissonChange = (event) => setModeCuisson(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const existeDeja = liste.some((r) => r.titre === titre);
    if (existeDeja) {
      alert("Cette recette existe déjà !");
      return;
    }

    if (titre !== "" && !existeDeja) {
      const nouvelleRecette = { titre, ingredients, etapes, cuisson };
      await db.recettes.put(nouvelleRecette); // Ajout avec Dexie

      const recettes = await db.recettes.toArray(); // Récupération des recettes
      setListe(recettes);
    }
  };

  const supprimer = async () => {
    await db.recettes.delete(titre); // Suppression avec Dexie
    const recettes = await db.recettes.toArray(); // Mise à jour de la liste
    setListe(recettes);

    setTitre("");
    setIngredients("");
    setEtapes("");
    setModeCuisson("");
  };

  return (
    <form onSubmit={handleSubmit} className="formulaireRecette">
      <div>
        <input
          type="text"
          value={titre}
          onChange={handleTitreChange}
          placeholder="titre"
          className="input-champ"
          required
        />
      </div>

      <div>
        <textarea
          value={ingredients}
          onChange={handleIngredientsChange}
          placeholder="ingrédients"
          className="input-champ"
        />
      </div>

      <div>
        <textarea
          value={etapes}
          onChange={handleEtapesChange}
          placeholder="étapes"
          className="input-champ"
        />
      </div>

      <div>
        <input
          type="text"
          value={cuisson}
          onChange={handleCuissonChange}
          placeholder="cuisson"
          className="input-champ"
        />
      </div>

      <button type="submit" className="input-champ">
        Soumettre la recette
      </button>

      <button type="button" onClick={supprimer} className="input-champ">
        Supprimer cette recette
      </button>
    </form>
  );
}

Recette.propTypes = {
  liste: PropTypes.array.isRequired,
  setListe: PropTypes.func.isRequired,
  recette: PropTypes.object.isRequired,
};

export default Recette;
