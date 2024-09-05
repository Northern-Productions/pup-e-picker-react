import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  refetchData,
  isLoading,
  setIsLoading,
  dogsList,
}) => {
  const handleTrashClick = (id) => {
    setIsLoading(true);
    return Requests.deleteDog(id)
      .then(() => refetchData())
      .catch((error) => console.error("Error", error))
      .finally(() => setIsLoading(false));
  };

  const handleHeartClick = (id, bool) => {
    setIsLoading(true);
    return Requests.updateDog(id, { isFavorite: bool })
      .then(() => refetchData())
      .catch((error) => console.error("Error", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {dogsList.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            handleTrashClick(dog.id);
          }}
          onHeartClick={() => {
            handleHeartClick(dog.id, false);
          }}
          onEmptyHeartClick={() => {
            handleHeartClick(dog.id, true);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
