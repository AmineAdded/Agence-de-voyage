window.addEventListener("load", function() {
    // Simulation d'un délai de chargement de 2 secondes avant de cacher le preloader
    setTimeout(function() {
        document.getElementById("js-preloader").style.display = "none";
        document.getElementById("user-choice-form").style.display = "block"; // Afficher le formulaire
    }, 2000); // Délai de 2000 millisecondes (2 secondes)
});

// Gérer la soumission du formulaire
document.getElementById("user-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
    // Récupérer la valeur sélectionnée
    var userType = document.querySelector('input[name="radio"]:checked').id;
    // Rediriger en fonction du type d'utilisateur
    setTimeout(function() {
        if (userType === "radio1") {
            window.location.href = "Formulaire.html"; // Redirection vers la page admin
        } else if (userType === "radio2") {
            window.location.href = "index.html"; // Redirection vers la page client
        }
    }, 1000);
});

// Pour les images des pays
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");

function PermuteDroit() {
    var temp = img1.innerHTML;
    img1.innerHTML = img2.innerHTML;
    img2.innerHTML = img3.innerHTML;
    img3.innerHTML = img4.innerHTML;
    img4.innerHTML = temp;
}

function PermuteGauche() {
    var temp = img1.innerHTML;
    img1.innerHTML = img4.innerHTML;
    img4.innerHTML = img3.innerHTML;
    img3.innerHTML = img2.innerHTML;
    img2.innerHTML = temp;
}

if (img1 && img2 && img3 && img4) {
    img1.classList.add("slide-in");
    img2.classList.add("slide-in");
    img3.classList.add("slide-in");
    img4.classList.add("slide-in");

    setInterval(function() {
        PermuteDroit();
    }, 4000);
}

// Pour les offres
var prix1 = document.getElementById("prix1");
var prix2 = document.getElementById("prix2");
var prix3 = document.getElementById("prix3");
var prix4 = document.getElementById("prix4");

function PermuteDroitPrix() {
    var temp = prix4.innerHTML;
    prix4.innerHTML = prix3.innerHTML;
    prix3.innerHTML = prix2.innerHTML;
    prix2.innerHTML = prix1.innerHTML;
    prix1.innerHTML = temp;
}

function PermuteGauchePrix() {
    var temp = prix3.innerHTML;
    prix3.innerHTML = prix1.innerHTML;
    prix1.innerHTML = prix2.innerHTML;
    prix2.innerHTML = temp;
}

if (prix1 && prix2 && prix3 && prix4) {
    prix1.classList.add("slide-in");
    prix2.classList.add("slide-in");
    prix3.classList.add("slide-in");
    prix4.classList.add("slide-in");

    setInterval(function() {
        PermuteDroitPrix();
    }, 4000);
}


/*
(function () {
    "use strict";

    // Page loading animation
    window.addEventListener('scroll', function () {
        var scroll = window.pageYOffset || document.documentElement.scrollTop;
        var headerText = document.querySelector('.header-text');
        var header = document.querySelector('header');

        if (headerText && header) {
            var boxHeight = headerText.offsetHeight;
            var headerHeight = header.offsetHeight;

            if (scroll >= boxHeight - headerHeight) {
                header.classList.add('background-header');
            } else {
                header.classList.remove('background-header');
            }
        }
    });

    var filters = document.querySelectorAll('.filters ul li');
    var grid = document.querySelector('.grid');

    if (filters.length && grid) {
        filters.forEach(function (filter) {
            filter.addEventListener('click', function () {
                filters.forEach(function (item) {
                    item.classList.remove('active');
                });
                this.classList.add('active');
                var data = this.getAttribute('data-filter');
                var gridItems = document.querySelectorAll('.all');
                gridItems.forEach(function (gridItem) {
                    if (data === 'all' || gridItem.classList.contains(data)) {
                        gridItem.style.display = 'block';
                    } else {
                        gridItem.style.display = 'none';
                    }
                });
            });
        });
    }

    var naccMenu = document.querySelectorAll('.naccs .menu div');
    var naccItems = document.querySelectorAll('.naccs ul li');

    if (naccMenu.length && naccItems.length) {
        naccMenu.forEach(function (menu, index) {
            menu.addEventListener('click', function () {
                if (!menu.classList.contains('active')) {
                    naccMenu.forEach(function (item) {
                        item.classList.remove('active');
                    });
                    naccItems.forEach(function (item) {
                        item.classList.remove('active');
                    });
                    menu.classList.add('active');
                    naccItems[index].classList.add('active');
                    var listItemHeight = naccItems[index].offsetHeight;
                    document.querySelector('.naccs ul').style.height = listItemHeight + 'px';
                }
            });
        });
    }
})();*/
