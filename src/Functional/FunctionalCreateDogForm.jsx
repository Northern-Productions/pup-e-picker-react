import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { Requests } from "../api";
import { toast, Toaster } from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({ refetchData }) => {
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogPicture, setDogPicture] = useState(defaultSelectedImage);

  const handleSubmit = (e) => {
    e.preventDefault();

    Requests.postDog(dogName, dogPicture, dogDescription)
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
      .then(() => refetchData())
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

    setDogName("");
    setDogDescription("");
    setDogPicture(defaultSelectedImage);
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        id="name"
        name="name"
        disabled={false}
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        cols={80}
        rows={10}
        disabled={false}
        value={dogDescription}
        onChange={(e) => setDogDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="dogPicture"
        value={dogPicture}
        onChange={(e) => setDogPicture(e.target.value)}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
      <Toaster />
    </form>
  );
};

// When submitted make the data refetch and display a success message.
