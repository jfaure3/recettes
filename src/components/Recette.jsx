import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/PageRecettes.css";

function Recette({ liste, setListe, recette }) {
  useEffect(() => {
    setTitre(recette.titre);
    setIngredients(recette.ingredients);
    setEtapes(recette.etapes);
    setModeCuisson(recette.cuisson);
  }, [recette]);

  // Définir les states pour chaque champ du formulaire
  const [titre, setTitre] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [etapes, setEtapes] = useState("");
  const [cuisson, setModeCuisson] = useState("");

  // Gestion des changements dans chaque input
  const handleTitreChange = (event) => setTitre(event.target.value);
  const handleIngredientsChange = (event) => setIngredients(event.target.value);
  const handleEtapesChange = (event) => setEtapes(event.target.value);
  const handleCuissonChange = (event) => setModeCuisson(event.target.value);

  // Gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    if (titre !== "") {
      // Création de l'objet recette avec les données du formulaire
      const nouvelleRecette = { titre, ingredients, etapes, cuisson };
      // Sauvegarde de la nouvelle recette
      const nouvelleListe = [...liste, nouvelleRecette];
      setListe(nouvelleListe); //Asynchrone donc pas à jour la ligne d'après
      localStorage.setItem("recettes", JSON.stringify(nouvelleListe));
    }
  };
  const supprimer = () => {
    const nouvelleListe = liste.filter(
      (r) => r.titre.toLowerCase() !== titre.toLowerCase()
    );
    setListe(nouvelleListe); // attention : asynchrone
    localStorage.setItem("recettes", JSON.stringify(nouvelleListe));
    // Réinitialiser les champs du formulaire
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

      <button onClick={supprimer} className="input-champ">
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
