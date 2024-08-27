import { useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Requests } from "../api";

export function FunctionalApp() {
  const [selectedFilter, setSelectedFilter] = useState("allDogs");
  const [favCount, setFavCount] = useState("");
  const [unfavCount, setUnfavCount] = useState("");
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateDogForm, setShowCreateDogForm] = useState(false);

  const refetchData = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((fetchedDogs) => {
        setAllDogs(fetchedDogs);
      })
      .catch((error) => console.error("Failed to fetch dogs:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        setShowCreateDogForm={setShowCreateDogForm}
      >
        <FunctionalDogs
          refetchData={refetchData}
          filter={selectedFilter}
          setFavCount={setFavCount}
          setUnfavCount={setUnfavCount}
          allDogs={allDogs}
          isLoading={isLoading}
        />
        {showCreateDogForm && (
          <FunctionalCreateDogForm refetchData={refetchData} />
        )}
      </FunctionalSection>
    </div>
  );
}
