import { Component } from "react";
import { Link } from "react-router-dom";
import React from "react";

export class ClassSection extends Component {
  switchActive(newFilter) {
    const userSelection =
      newFilter === this.props.selectedFilter ? "allDogs" : newFilter;
    this.props.setSelectedFilter(userSelection);
  }

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
              className={`selector ${
                selectedFilter === "favorited" ? "active" : ""
              }`}
              onClick={() => {
                this.switchActive("favorited");
              }}
            >
              favorited ( {favCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                selectedFilter === "unfavorited" ? "active" : ""
              }`}
              onClick={() => {
                this.switchActive("unfavorited");
              }}
            >
              unfavorited ( {unfavCount} )
            </div>
            <div
              className={`selector ${
                selectedFilter === "create dog" ? "active" : ""
              }`}
              onClick={() => {
                this.switchActive("create dog");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
