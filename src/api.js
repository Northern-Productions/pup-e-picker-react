export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    return fetch(`${baseUrl}/dogs`).then((response) => response.json());
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (name, image, description) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        description: description,
      }),
    }).then((response) => response.json());
  },

  // should delete a dog from the database
  deleteDog: (dogId) => {
    return fetch(`${baseUrl}/dogs/${dogId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },

  updateDog: (dogId, dogData) => {
    return fetch(`${baseUrl}/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogData),
    }).then((response) => response.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
