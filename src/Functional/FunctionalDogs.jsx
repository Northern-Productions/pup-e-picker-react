import { useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  allDogs,
  isLoading,
  filter,
  setFavCount,
  setUnfavCount,
  refetchData,
}) => {
  useEffect(() => {
    refetchData();
  }, []);

  useEffect(() => {
    const favoriteCount = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavoriteCount = allDogs.filter((dog) => !dog.isFavorite).length;
    setFavCount(favoriteCount);
    setUnfavCount(unfavoriteCount);
  }, [allDogs, setFavCount, setUnfavCount]);

  const filteredDogs = allDogs.filter((dog) => {
    if (filter === "favorited") {
      return dog.isFavorite;
    } else if (filter === "unfavorited") {
      return !dog.isFavorite;
    } else if (filter === "allDogs") {
      return dog;
    }
  });

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id).then(() => refetchData());
          }}
          onHeartClick={() => {
            Requests.updateDog(dog.id, { isFavorite: false }).then(() =>
              refetchData()
            );
          }}
          onEmptyHeartClick={() => {
            Requests.updateDog(dog.id, { isFavorite: true }).then(() =>
              refetchData()
            );
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
