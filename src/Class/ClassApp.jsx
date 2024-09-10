import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import toast from "react-hot-toast";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "allDogs",
      allDogs: [],
      isLoading: false,
    };
  }

  setSelectedFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  setAllDogs = (dogs) => {
    this.setState({ allDogs: dogs });
  };

  setIsLoading = (loading) => {
    this.setState({ isLoading: loading });
  };

  refetchData = () => {
    Requests.getAllDogs()
      .then((fetchedDogs) => {
        this.setAllDogs(fetchedDogs);
      })
      .catch((error) => {
        console.error("Failed to fetch dogs: ", error);
        toast.error("Failed to fetch dogs: ", error);
      });
  };

  componentDidMount() {
    this.refetchData();
  }

  render() {
    const { selectedFilter, allDogs, isLoading } = this.state;

    const favDogList = allDogs.filter((dog) => dog.isFavorite);
    const unfavDogList = allDogs.filter((dog) => !dog.isFavorite);

    const dogsList = {
      allDogs: allDogs,
      favorited: favDogList,
      unfavorited: unfavDogList,
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          selectedFilter={selectedFilter}
          setSelectedFilter={this.setSelectedFilter}
          favCount={favDogList.length}
          unfavCount={unfavDogList.length}
        >
          {selectedFilter !== "create dog" && (
            <ClassDogs
              refetchData={this.refetchData}
              dogsList={dogsList[selectedFilter]}
              isLoading={isLoading}
              setIsLoading={this.setIsLoading}
            />
          )}

          {selectedFilter === "create dog" && (
            <ClassCreateDogForm
              refetchData={this.refetchData}
              isLoading={this.isLoading}
              setIsLoading={this.setIsLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
