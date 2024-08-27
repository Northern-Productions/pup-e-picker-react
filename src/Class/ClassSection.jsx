import { Component } from "react";
import { Link } from "react-router-dom";
import React from "react";

export class ClassSection extends Component {
  switchActive = (e, filter) => {
    const selectors = document.querySelectorAll(".selector");
    selectors.forEach((selector) => {
      selector.classList.remove("active");
    });
    e.target.classList.add("active");
    this.props.setSelectedFilter(filter);
    this.props.setShowCreateDogForm(filter === "create dog");
  };

  render() {
    const { children, selectedFilter, favCount, unfavCount, ...restProps } =
      this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector active ${
                selectedFilter === "favorited" ? "active" : ""
              }`}
              onClick={(e) => {
                this.switchActive(e, "favorited");
              }}
            >
              favorited ( {favCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                selectedFilter === "unfavorited" ? "active" : ""
              }`}
              onClick={(e) => {
                this.switchActive(e, "unfavorited");
              }}
            >
              unfavorited ( {unfavCount} )
            </div>
            <div
              className={`selector ${
                selectedFilter === "create dog" ? "active" : ""
              }`}
              onClick={(e) => {
                this.switchActive(e, "create dog");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { ...restProps });
            }
            return child;
          })}
        </div>
      </section>
    );
  }
}
