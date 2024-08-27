import { Link } from "react-router-dom";

export const FunctionalSection = ({
  children,
  favCount,
  filter,
  unfavCount,
  setSelectedFilter,
  setShowCreateDogForm,
}) => {
  const switchActive = (e, filter) => {
    const selectors = document.querySelectorAll(".selector");
    selectors.forEach((selector) => {
      selector.classList.remove("active");
    });
    e.target.classList.add("active");
    setSelectedFilter(filter);
    setShowCreateDogForm(filter === "create dog");
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
            onClick={(e) => {
              switchActive(e, "favorited");
            }}
          >
            favorited ( {favCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${filter === "unfavorited" ? "active" : ""}`}
            onClick={(e) => {
              switchActive(e, "unfavorited");
            }}
          >
            unfavorited ( {unfavCount} )
          </div>
          <div
            className={`selector ${filter === "create dog" ? "active" : ""}`}
            onClick={(e) => {
              switchActive(e, "create dog");
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
