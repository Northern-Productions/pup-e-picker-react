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

  const favCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavCount = allDogs.filter((dog) => !dog.isFavorite).length;

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
    favorited: favCount,
    unfavorited: unfavCount,
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
        filter={selectedFilter}
        favCount={favCount}
        unfavCount={unfavCount}
        setSelectedFilter={setSelectedFilter}
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
