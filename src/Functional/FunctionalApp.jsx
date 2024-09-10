import { useState, useEffect } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [selectedFilter, setSelectedFilter] = useState("allDogs");
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const favDogList = allDogs.filter((dog) => dog.isFavorite);
  const unfavDogList = allDogs.filter((dog) => !dog.isFavorite);

  const refetchData = () => {
    return Requests.getAllDogs()
      .then((fetchedDogs) => {
        setAllDogs(fetchedDogs);
      })
      .catch((error) => {
        console.error("Failed to fetch dogs: ", error);
        toast.error("Failed to fetch dogs: ", error);
      });
  };

  const dogsList = {
    allDogs: allDogs,
    favorited: favDogList,
    unfavorited: unfavDogList,
  };

  useEffect(() => {
    refetchData();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        favCount={favDogList.length}
        unfavCount={unfavDogList.length}
      >
        {selectedFilter !== "create dog" && (
          <FunctionalDogs
            refetchData={refetchData}
            dogsList={dogsList[selectedFilter]}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {selectedFilter === "create dog" && (
          <FunctionalCreateDogForm
            refetchData={refetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
