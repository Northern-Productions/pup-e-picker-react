import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { toast, Toaster } from "react-hot-toast";

export class ClassCreateDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: "",
      dogDescription: "",
      dogPicture: dogPictures.BlueHeeler,
    };
  }

  setDogName = (name) => {
    this.setState({ dogName: name });
  };

  setDogDescription = (des) => {
    this.setState({ dogDescription: des });
  };

  setDogPicture = (img) => {
    this.setState({ dogPicture: img });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    Requests.postDog(
      this.state.dogName,
      this.state.dogPicture,
      this.state.dogDescription
    )
      .then(() => {
        toast.success("Dog created successfully!", {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#4caf50",
            color: "#fff",
          },
        });
      })
      .then(() => this.props.refetchData())
      .catch((error) => {
        toast.error("Failed to create dog. Please try again.", {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#f44336",
            color: "#fff",
          },
        });
        console.error("Error creating dog:", error);
      });

    this.setState({
      dogName: "",
      dogDescription: "",
      dogPicture: dogPictures.BlueHeeler,
    });
  };

  render() {
    const { dogName, dogDescription, dogPicture } = this.state;

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={dogName}
          onChange={(e) => {
            this.setDogName(e.target.value);
          }}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          cols={80}
          rows={10}
          value={dogDescription}
          onChange={(e) => {
            this.setDogDescription(e.target.value);
          }}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="dogPicture"
          value={dogPicture}
          onChange={(e) => {
            this.setDogPicture(e.target.value);
          }}
          disabled={false}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={false} />
        <Toaster />
      </form>
    );
  }
}
