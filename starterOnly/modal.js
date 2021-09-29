function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");
const closeConfirm = document.querySelector("#confirm-message > span");
const buttonConfirm = document.querySelector(".validation-message > button");

// const confirmation = document.querySelector(".confirm-message");
// document.querySelector(".confirm-message").style.display = "none";

// launch modal event
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal);
});

// launch modal form
function launchModal() {
  modalbg.classList.remove("close");
  modalbg.style.display = "block";
}

// CLose modal form
closeModal.addEventListener("click", () => {
  modalbg.style.display = "none";
  modalbg.classList.add("close");
});

closeConfirm.addEventListener("click", () => {
  const confirmModal = document.getElementById("confirm-message");
  confirmModal.classList.remove("confirm-message");
});

//validation submit
buttonConfirm.addEventListener("click", () => {
  const confirmModal = document.getElementById("confirm-message");
  confirmModal.classList.remove("confirm-message");
});

// check fields
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="number"], input[type="date"]'
);

//Check fields

let firstname, lastname, email, quantity, birthdate;
let cities = [];

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const firstNameChecker = (value) => {
  if (value.length > 0 && value.length <= 2) {
    errorDisplay("firstname", "Le prénom doit contenir plus de 2 caractères");
    firstname = null;
  } else {
    errorDisplay("firstname", "", true);
    firstname = value;
  }
};

const lastNameChecker = (value) => {
  if (value.length > 0 && value.length <= 2) {
    errorDisplay(
      "lastname",
      "Le nom de famille doit contenir plus de 2 caractères"
    );
    lastname = null;
  } else {
    errorDisplay("lastname", "", true);
    lastname = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const birthdateChecker = (value) => {
  const dateInput = document.getElementById("birthdate").value;
  const inputDate = new Date(
    dateInput.split("-")[0],
    dateInput.split("-")[1] - 1,
    dateInput.split("-")[2]
  );
  let actualDate = new Date();

  console.log(inputDate.getTime());
  console.log(actualDate.getTime());

  if (!value) {
    errorDisplay("birthdate", "Veuillez rentrer une date de naissance!");
    birthdate = null;
  } else if (inputDate.getTime() > actualDate.getTime()) {
    errorDisplay("birthdate", "Vous n'êtes pas né dans le futur!");
    birthdate = null;
  } else {
    errorDisplay("birthdate", "", true);
    birthdate = value;
  }
};

const quantityChecker = (value) => {
  if (isNaN(value)) {
    errorDisplay("quantity", "Veuillez rentrer un nombre!");
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};

const addCities = document.querySelectorAll(
  'div.city-container > input[type="checkbox"]'
);
addCities.forEach((city) => {
  city.addEventListener("input", (e) => {
    if (city.checked == true) {
      cities.push(city.value);
    } else {
      cities = cities.filter((e) => e !== city.value);
    }
  });
});
if (cities.length > quantity) {
  errorDisplay("city", "Ne cochez pas plus de villes que de participations!");
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstname":
        firstNameChecker(e.target.value);
        break;
      case "lastname":
        lastNameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "birthdate":
        birthdateChecker(e.target.value);
        break;
      case "quantity":
        quantityChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

//Submit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!firstname) {
    errorDisplay("firstname", "Le prénom doit contenir plus de 2 caractères");
    document.getElementById("firstname").focus();
  } else if (!lastname) {
    errorDisplay(
      "lastname",
      "Le nom de famille doit contenir plus de 2 caractères"
    );
    document.getElementById("lastname").focus();
  } else if (!email) {
    errorDisplay("email", "Le mail n'est pas valide");
    document.getElementById("email").focus();
  } else if (!birthdate) {
    errorDisplay("birthdate", "Veuillez rentrer une date de naissance!");
    document.getElementById("birthdate").focus();
  } else if (!quantity) {
    errorDisplay("quantity", "Veuillez rentrer un nombre!");
    document.getElementById("quantity").focus();
  } else if (cities.length === 0) {
    errorDisplay("city", "Veuillez choisir au moins une ville!");
  } else if (cities.length > quantity) {
    errorDisplay(
      "city",
      "Il ne peut pas y avoir plus de villes que de participations!"
    );
  } else if (!checkbox1.checked) {
    // errorDisplay("cgv", "Veuillez accepter les CGV!");
    document.getElementById("cgv-span").classList.remove("cgv-span");
    document.getElementById("cgv-span").textContent =
      "Veuillez accepter les CGV!";
  } else {
    const validationMessage = document.getElementById("confirm-message");
    modalbg.style.display = "none";
    modalbg.classList.add("close");
    validationMessage.classList.add("confirm-message");
  }
});
