import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "allDogs",
      favCount: "",
      unfavCount: "",
      showCreateDogForm: false,
      allDogs: [],
      isLoading: false,
    };
  }

  setSelectedFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  setFavCount = (count) => {
    this.setState({ favCount: count });
  };

  setUnfavCount = (count) => {
    this.setState({ unfavCount: count });
  };

  setShowCreateDogForm = (show) => {
    this.setState({ showCreateDogForm: show });
  };

  setAllDogs = (dogs) => {
    this.setState({ allDogs: dogs });
  };

  setIsLoading = (loading) => {
    this.setState({ isLoading: loading });
  };

  refetchData = () => {
    this.setIsLoading(true);
    Requests.getAllDogs()
      .then((fetchedDogs) => {
        this.setAllDogs(fetchedDogs);
      })
      .catch((error) => console.error("Failed to fetch dogs:", error))
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  render() {
    const {
      showCreateDogForm,
      selectedFilter,
      favCount,
      unfavCount,
      allDogs,
      isLoading,
    } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          selectedFilter={selectedFilter}
          setSelectedFilter={this.setSelectedFilter}
          setShowCreateDogForm={this.setShowCreateDogForm}
          favCount={favCount}
          unfavCount={unfavCount}
        >
          <ClassDogs
            selectedFilter={selectedFilter}
            favCount={favCount}
            unfavCount={unfavCount}
            setFavCount={this.setFavCount}
            setUnfavCount={this.setUnfavCount}
            refetchData={this.refetchData}
            allDogs={allDogs}
            isLoading={isLoading}
          />
          {showCreateDogForm && (
            <ClassCreateDogForm refetchData={this.refetchData} />
          )}
        </ClassSection>
      </div>
    );
  }
}
