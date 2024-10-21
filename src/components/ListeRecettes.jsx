import PropTypes from "prop-types";

function ListeRecettes({ liste, setRecette }) {
  const handleClick = (titre) => {
    setRecette(liste.find((r) => r.titre == titre));
  };

  return (
    <aside className="menu">
      <ul className="liste">
        {liste.map((recette) => (
          <li
            onClick={() => handleClick(recette.titre)}
            key={`${recette.titre}`}
          >
            {recette.titre}
          </li>
        ))}
      </ul>
    </aside>
  );
}

ListeRecettes.propTypes = {
  liste: PropTypes.array.isRequired,
  setRecette: PropTypes.func.isRequired,
};

export default ListeRecettes;
