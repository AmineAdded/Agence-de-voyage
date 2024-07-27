// Variables globales

// Parent
var parent = document.getElementById("parent");

// Champs du formulaire
var nameInput = document.getElementById("Name");
var numberInput = document.getElementById("Number");
var guestsInput = document.getElementById("Guests");
var dateInput = document.getElementById("Date");
var destinationInput = document.getElementById("Destination");

// Sauvegarder les valeurs par défaut initiales des champs du formulaire
var defaultNameValue = nameInput.value;
var defaultNumberValue = numberInput.value;
var defaultGuestsValue = guestsInput.value;
var defaultDateValue = dateInput.value;
var defaultDestinationValue = destinationInput.value;

// Boutons
var btn = document.getElementById("aa");
var btnSave = document.getElementById("Save");

function createCell(element, text, className) {
    var cell = document.createElement("div");
    cell.className = className;
    var textNode = document.createTextNode(text);
    cell.appendChild(textNode);
    element.appendChild(cell);

    return element;
}

function createButton(element, className1, className2, id = null) {
    var cell = document.createElement("div");
    cell.className = className1;
    const button = document.createElement("a");
    button.className = className2;
    if (id != null)
        button.id = id;
    cell.appendChild(button);
    element.appendChild(cell);

    return element;
}

function Ajout(event) {
    event.preventDefault(); // Empêcher la soumission du formulaire

    var idInput = Math.floor(Math.random() * 101);

    // Créer un objet Traveler
    let traveler = {
        id: idInput,
        name: nameInput.value,
        number: numberInput.value,
        guests: guestsInput.value,
        date: dateInput.value,
        destination: destinationInput.value
    };

    // Stocker le voyageur dans le localStorage
    storedTravelers(traveler);

    // Afficher le voyageur dans la liste
    displayTraveler(traveler);

    // Réinitialiser les champs du formulaire aux valeurs par défaut
    nameInput.value = defaultNameValue;
    numberInput.value = defaultNumberValue;
    guestsInput.value = defaultGuestsValue;
    dateInput.value = defaultDateValue;
    destinationInput.value = defaultDestinationValue;

}

function storedTravelers(traveler) {
    // Récupérer les voyageurs existants depuis le localStorage
    var storedTravelers = JSON.parse(localStorage.getItem("Travelers")) || [];

    // Ajouter le nouvel voyageur à la liste existante
    storedTravelers.push(traveler);

    // Enregistrer la liste mise à jour dans le localStorage
    localStorage.setItem("Travelers", JSON.stringify(storedTravelers));
}

function loadStoredTravelers() {
    var storedTravelers = JSON.parse(localStorage.getItem("Travelers")) || [];
    for (let i = 0; i < storedTravelers.length; i++) {
        displayTraveler(storedTravelers[i]);
    }
}

function displayTraveler(traveler) {
    // Vérifier si l'élément parent existe
    var parent = document.getElementById("parent");
    if (!parent) {
        console.error("Parent element not found");
        return;
    }

    // Créer l'élément li
    var element = document.createElement("li");
    element.className = "row";

    // Ajouter les champs à l'élément
    // ID
    createCell(element, traveler.id, "cell cell-50 text-center");
    // Name
    createCell(element, traveler.name, "cell cell-100 text-center");
    // Number
    createCell(element, traveler.number, "cell cell-100 text-center");
    // Guests
    createCell(element, traveler.guests, "cell cell-100 text-center");
    // Date
    createCell(element, traveler.date, "cell cell-100");
    // Destination
    createCell(element, traveler.destination, "cell cell-100p");
    // Button editer
    var idEditButton = Math.random().toString().substr(100, 200);
    createButton(element, "cell cell-100p", "btnEdit fa fa-pencil bg-1 text-fff", idEditButton);
    // Button supprimer
    var idDeleteButton = traveler.id; // Utilisation de l'ID unique du voyageur comme ID du bouton de suppression
    createButton(element, "cell cell-100p", "btnRemove fa fa-remove bg-1 text-fff", idDeleteButton);

    // Ajouter l'élément li au parent
    parent.appendChild(element);

    // Récupérer les boutons d'édition et de suppression
    var editButton = element.querySelector(".btnEdit");
    var deleteButton = element.querySelector(".btnRemove");

    // Ajouter des écouteurs d'événements uniquement si les boutons existent
    if (editButton) {
        editButton.addEventListener("click", onclickEditButt);
    }
    if (deleteButton) {
        deleteButton.addEventListener("click", onclickDeleteButton);
    }
}

function onclickDeleteButton(event) {
    confirm("Do you really want to delete this traveler?");
    var button = event.target;
    var li = button.closest("li");
    //Voyageur à supprimer
    var id = li.querySelector(".cell.cell-50.text-center").textContent;

    // Supprimer du localStorage
    var storedTravelers = JSON.parse(localStorage.getItem("Travelers")) || [];
    storedTravelers = storedTravelers.filter(function (traveler) {
        return traveler.id != id;
    });
    localStorage.setItem("Travelers", JSON.stringify(storedTravelers));

    // Supprimer de l'affichage
    li.remove(); // Supprime directement l'élément li du DOM
}

function onclickDeleteAll() {
    if (JSON.parse(localStorage.getItem("Travelers")) != undefined)
        confirm("Do you really want to remove all those travelers?");
    else
        confirm("Nothing to be done");
    parent.innerHTML = "";
    localStorage.removeItem('Travelers');
}

// Edition
function onclickEditButt(event) {
    confirm("Do you really want to edit this traveler?");
    var button = event.target;
    var li = button.closest("li");
    var id = li.querySelector(".cell.cell-50.text-center").textContent;

    // Récupérer les informations du voyageur à partir du localStorage
    var storedTravelers = JSON.parse(localStorage.getItem("Travelers")) || [];
    var traveler = storedTravelers.find(function (item) {
        return item.id == id;
    });

    // Pré-remplir les champs du formulaire avec les informations du voyageur
    nameInput.value = traveler.name;
    numberInput.value = traveler.number;
    guestsInput.value = traveler.guests;
    dateInput.value = traveler.date;
    destinationInput.value = traveler.destination;

    // Mettre à jour le bouton de sauvegarde pour qu'il agisse comme un bouton de mise à jour lorsqu'il est cliqué
    btn.removeEventListener("click", Ajout);
    btnSave.addEventListener("click", function saveHandler(event) {
        event.preventDefault();
        updateTraveler(traveler, li);
        // Remove this event listener to prevent multiple bindings
        btnSave.removeEventListener("click", saveHandler);
    });
}

function updateTraveler(traveler, li) {
    // Mettre à jour les informations du voyageur avec les nouvelles valeurs du formulaire
    traveler.name = nameInput.value;
    traveler.number = numberInput.value;
    traveler.guests = guestsInput.value;
    traveler.date = dateInput.value;
    traveler.destination = destinationInput.value;

    // Mettre à jour le localStorage
    var storedTravelers = JSON.parse(localStorage.getItem("Travelers")) || [];
    storedTravelers = storedTravelers.map(function (item) {
        if (item.id == traveler.id) {
            return traveler;
        } else {
            return item;
        }
    });
    localStorage.setItem("Travelers", JSON.stringify(storedTravelers));

    // Mettre à jour l'affichage du voyageur
    // Correction de la sélection des cellules pour la mise à jour
    var cells = li.getElementsByClassName("cell");
    cells[1].textContent = traveler.name;
    cells[2].textContent = traveler.number;
    cells[3].textContent = traveler.guests;
    cells[4].textContent = traveler.date;
    cells[5].textContent = traveler.destination;

    // Réinitialiser les champs du formulaire
    nameInput.value = defaultNameValue;
    numberInput.value = defaultNumberValue;
    guestsInput.value = defaultGuestsValue;
    dateInput.value = defaultDateValue;
    destinationInput.value = defaultDestinationValue;

    // Réajouter l'écouteur d'événement pour l'ajout de voyageur
        // Réajouter l'écouteur d'événement pour l'ajout de voyageur
    btn.addEventListener("click", Ajout);
}

// Ajouter un écouteur d'événement sur le bouton "Book"
btn.addEventListener("click", Ajout);

// Charger les voyageurs au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    loadStoredTravelers();
});

// Ajouter un écouteur d'événement sur le bouton "Delete All"
document.getElementById("DeleteAll").addEventListener("click", onclickDeleteAll);

//Recherche
function reloadAllTravelers() {
    parent.innerHTML = ""; // Effacer le contenu actuel
    loadStoredTravelers(); // Recharger tous les voyageurs depuis le localStorage
}

document.getElementById("searchInput").addEventListener("input", function(event) {
    // Vérifier si le champ de recherche est vide
    if (this.value.trim()=== "") {
        reloadAllTravelers(); // Si le champ de recherche est vide, recharger tous les voyageurs
    }
});


document.querySelector(".btnSearch").addEventListener("click", function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre

    // Récupérer la valeur saisie dans le champ de recherche
    var searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
    // Parcourir la liste des voyageurs
    var travelerItems = parent.getElementsByTagName("li");
    for (var i = 0; i < travelerItems.length; i++) {
        var travelerName = travelerItems[i].querySelector(".cell.cell-100.text-center").textContent.toLowerCase();

        // Comparer le nom de chaque voyageur avec la valeur de recherche
        if (travelerName.includes(searchTerm)) {
            // Afficher la ligne du voyageur si son nom correspond à la recherche
            travelerItems[i].style.display = "";
        } else {
            // Masquer la ligne du voyageur sinon
            travelerItems[i].style.display = "none";
        }
    }
});


// Fonction pour gérer le flottant des labels
function floatLabel(inputType) {
    document.querySelectorAll(inputType).forEach(function (input) {
        input.addEventListener('focus', function () {
            if (input.nextElementSibling) { // Check if nextElementSibling is not null
                input.nextElementSibling.classList.add("active");
            }
        });

        input.addEventListener('blur', function () {
            if ((input.value === '' || input.value === 'blank') && input.nextElementSibling) { // Check if nextElementSibling is not null
                input.nextElementSibling.classList.remove("active");
            }
        });
    });
}

// Appliquer le flottant des labels aux éléments avec la classe "floatLabel"
floatLabel(".floatLabel");

// Fonction pour gérer le menu et sous-menu
function elm(x) {
    var target = x.substring(1);
    var type = x.charAt(0);
    if (type == '#') {
        return document.getElementById(target);
    } else if (type == '.') {
        return document.getElementsByClassName(target);
    } else {
        return document.getElementsByTagName(x);
    }
}

// Gestion des sous-menus
if (elm(".has-submenu")) {
    for (var i = 0, len = elm(".has-submenu").length; i < len; i++) {
        elm(".has-submenu")[i].onclick = function (e) {
            e.stopPropagation();
            toggle(this.nextElementSibling);
        }
    }
}

// Gestion du clic sur l'icône du menu
if (elm(".menuIcon")) {
    elm(".menuIcon")[0].onclick = function () {
        elm(".container")[0].classList.toggle("is-click");
    };
}

// Fonction pour basculer l'affichage des éléments
function toggle(x) {
    var css = window.getComputedStyle(x, null);
    if (css.getPropertyValue("display") == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

