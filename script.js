// tout le code HTML est chargé, on peut maintenant manipuler le DOM
document.addEventListener("DOMContentLoaded", () => {
    /************* 1. CHANGEMENT D'APPARENCE DE LA NAVBAR AU SCROLL***************/
    const nav = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        // Si la page est scrollée de plus de 50px, on ajoute la classe "scrolled" à la navbar
        if (window.scrollY > 70) {
            nav.classList.add("scrolled");

            nav.style.color = "white"; // Change la couleur du texte en blanc
            nav.style.backgroundColor = "rgb(116, 155, 219)"; // Change la couleur de fond en rouge
            nav.style.borderBottom = "2px solid rgb(255, 255, 255)"; // Ajoute une bordure blanche en bas
            nav.style.borderRadius = "0 0 10px 10px"; // Ajoute un rayon de bordure pour les coins inférieurs
        } else {
            nav.classList.remove("scrolled");
            nav.style.color = "rgb(140, 136, 136)"; // Restaure la couleur du texte
        }
    });

    /************* 2. SYSTEME DU FILTRAGE MENU ***************/
    const filterButtons = document.querySelectorAll(".btn-filter");
    // 1. On sélectionne TOUTES les cartes de plats maintenant
    const menuItems = document.querySelectorAll(".menu-item");
    console.log("Menu items trouvés :", menuItems.length);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // chercher le bouton qui a la classe 'active' actuellement et on lui enlève
            const boutonActifPrecedent = document.querySelector(".btn-filter.active");
            if (boutonActifPrecedent) {
                boutonActifPrecedent.classList.remove("active");
            }
            // On ajoute la classe 'active' sur le bouton sur lequel on vient de cliquer
            button.classList.add("active");

            const categorieCible = button.getAttribute("data-category");
            // 2. On parcourt chaque plat pour décider s'il faut l'afficher ou le masquer
            menuItems.forEach(plat => {
                const categoriePlat = plat.getAttribute("data-category");
                if (categorieCible === "all" || categoriePlat === categorieCible) {
                    plat.style.display = "block"; // Affiche le plat
                } else {
                    plat.style.display = "none"; // Masque le plat
                }
            });
            console.log("Bouton cliqué pour la catégorie :", categorieCible);
        });
    })


    /************* FORMULAIRE DE RESERVATION ***************/
    const form = document.getElementById("res-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche l'envoi du formulaire pour traitement personnalisé
        const nom = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date");
        const idguests = document.getElementById("guests");
        const message = document.getElementById("message").value.trim();

        // Utilisation des variables de message existantes
        const erreurMessage = document.getElementById("erreur");
        const successMessage = document.getElementById("success-message");

        console.log("Tentative de réservation :", { nom, email, date: date.value, guests: idguests.value, message });

        // Réinitialise les affichages à chaque tentative
        erreurMessage.textContent = "";
        erreurMessage.style.display = "none";
        successMessage.style.display = "none";

        // 1. Vérification des champs obligatoires 
        if (!nom || !email || !date.value || !idguests.value) {
            erreurMessage.style.display = "block";
            erreurMessage.textContent = "Veuillez remplir tous les champs obligatoires ! ";
            erreurMessage.style.color = "crimson";
            erreurMessage.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            erreurMessage.style.border = "1px solid crimson";
            erreurMessage.style.font = "700 18px Arial, sans-serif";
            erreurMessage.style.marginTop = "10px";
            erreurMessage.style.textAlign = "center";
            erreurMessage.style.padding = "10px";
            erreurMessage.style.borderRadius = "5px";
            return;
        }

        // 2. Vérifier le format de l'email 
        const emailRegex = /^[^\s@]+@(?!.*@)(?!.*\.{2,})[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            erreurMessage.style.display = "block";
            erreurMessage.textContent = "Veuillez entrer un email valide !";
            erreurMessage.style.color = "crimson";
            erreurMessage.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            erreurMessage.style.border = "1px solid crimson";
            erreurMessage.style.font = "500 18px Arial, sans-serif";
            erreurMessage.style.marginTop = "10px";
            erreurMessage.style.textAlign = "center";
            erreurMessage.style.padding = "10px";
            erreurMessage.style.borderRadius = "5px";
            return;
        }

        // 3. Vérifier la date (ne peut pas être dans le passé)
        const dateChoisie = new Date(date.value);
        const dateActuelle = new Date();

        // Réinitialiser heure, minutes et secondes pour comparer uniquement les dates
        dateActuelle.setHours(0, 0, 0, 0);
        dateChoisie.setHours(0, 0, 0, 0);

        if (dateChoisie < dateActuelle) {
            erreurMessage.style.display = "block";
            erreurMessage.textContent = "La date choisie ne peut pas être dans le passé !";
            erreurMessage.style.color = "crimson";
            erreurMessage.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            erreurMessage.style.border = "1px solid crimson";
            erreurMessage.style.font = "500 18px Arial, sans-serif";
            erreurMessage.style.marginTop = "10px";
            erreurMessage.style.textAlign = "center";
            erreurMessage.style.padding = "10px";
            erreurMessage.style.borderRadius = "5px";
            return;
        }

        // 4. On affiche et on stylise le SUCCÈS si toutes les étapes précédentes ont réussi
        successMessage.style.display = "block";
        successMessage.textContent = `Réservation réussie pour ${nom} !`;
        successMessage.style.color = "seagreen";
        successMessage.style.backgroundColor = "rgba(0, 128, 0, 0.1)";
        successMessage.style.border = "1px solid seagreen";
        successMessage.style.font = "700 18px Arial, sans-serif";
        successMessage.style.marginTop = "10px";
        successMessage.style.textAlign = "center";
        successMessage.style.padding = "10px";
        successMessage.style.borderRadius = "5px";
        successMessage.style.margin = "10px auto";

        // On vide le formulaire
        form.reset();
    });
});

// new Date () footer 
const footerDate = document.getElementById("year");
const currentYear = new Date().getFullYear();
footerDate.textContent = currentYear;