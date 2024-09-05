import { Link } from "react-router-dom";

export const FunctionalSection = ({
  children,
  favCount,
  filter,
  unfavCount,
  setSelectedFilter,
}) => {
  const switchActive = (newFilter) => {
    const userSelection = newFilter === filter ? "allDogs" : newFilter;
    setSelectedFilter(userSelection);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${filter === "favorited" ? "active" : ""}`}
            onClick={() => {
              switchActive("favorited");
            }}
          >
            favorited ( {favCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${filter === "unfavorited" ? "active" : ""}`}
            onClick={() => {
              switchActive("unfavorited");
            }}
          >
            unfavorited ( {unfavCount} )
          </div>

          {/* This should display the create dog form */}
          <div
            className={`selector ${filter === "create dog" ? "active" : ""}`}
            onClick={() => {
              switchActive("create dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
