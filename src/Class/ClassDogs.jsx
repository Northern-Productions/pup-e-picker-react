import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  componentDidMount() {
    this.props.refetchData();
  }

  componentDidUpdate(prevState) {
    if (prevState.allDogs !== this.props.allDogs) {
      const favoriteCount = this.props.allDogs.filter(
        (dog) => dog.isFavorite
      ).length;
      const unfavoriteCount = this.props.allDogs.filter(
        (dog) => !dog.isFavorite
      ).length;
      if (
        favoriteCount !== this.props.favCount ||
        unfavoriteCount !== this.props.unfavCount
      ) {
        this.props.setFavCount(favoriteCount);
        this.props.setUnfavCount(unfavoriteCount);
      }
    }
  }

  render() {
    const filteredDogs = this.props.allDogs.filter((dog) => {
      if (this.props.selectedFilter === "favorited") {
        return dog.isFavorite;
      } else if (this.props.selectedFilter === "unfavorited") {
        return !dog.isFavorite;
      } else if (this.props.selectedFilter === "allDogs") {
        return dog;
      }
    });

    return (
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              Requests.deleteDog(dog.id).then(() => this.props.refetchData());
            }}
            onHeartClick={() => {
              Requests.updateDog(dog.id, { isFavorite: false }).then(() =>
                this.props.refetchData()
              );
            }}
            onEmptyHeartClick={() => {
              Requests.updateDog(dog.id, { isFavorite: true }).then(() =>
                this.props.refetchData()
              );
            }}
            isLoading={this.props.isLoading}
          />
        ))}
      </>
    );
  }
}
