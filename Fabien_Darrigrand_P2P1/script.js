//Fabien Darrigrand P2P1
// Projet mini pop moi (22/03/2021)

/* Créer un tableau
:: tableau contenant les variables chapeau, haut, bas, chaussure
  ! Non, c'est plutôt: Un tableau qui contiendra des "objects" (basketChoose)
*/
let basket = [];
let basketPrice = 0;

let basketChoose = {
  chapeau: null,
  haut: null,
  bas: null,
  chaussure: null,
};

/* Effectuer un evenement si on clique sur l'evenement en question
:: Si on clique sur ajouter au panier(evenement) alors on appelle la fonction checkAddToBasket()
:: Si on clique sur valider le panier(evenement) alors on appelle la fonction validateBasket()
::return la fonction processItem(e.target.id)
  ! Ajoute un évènement d'écoute, qui écoute les évènements de clic
  ! Puis trie les éléments selon où le clic s'est produit (via l'Id HTML).
*/
addEventListener("click", (e) => {
  if (!e.target.id) return;
  if (e.target.id === "addToBasket") return checkAddToBasket();
  if (e.target.id === "validateBasket") return validateBasket();
  return processItem(e.target.id);
});

/* Fonction qui vérifie si le panier est vide et sinon ajoute les élements séléctionnés au panier
:: Utilisation condition ternaire ( ? = condition vrai et : = condition fausse)
  ! Utilisation d'une condition ternaire pour vérifier si l'objet basketChoose est vide.
*/
const checkAddToBasket = () => {
  basketChoose.chapeau ||
  basketChoose.haut ||
  basketChoose.bas ||
  basketChoose.chaussure
    ? addToBasket()  // Condition ternaire
    : alert("La figurine est vide.");  // Condition ternaire
};

/* Fonction qui associe les prix des accesoires au panier, et qui enleve l'accesoire que l'on veut de la figurine en cliquant dessus
:: Utilisation condition ternaire ( ? = condition vrai et : = condition fausse)
  ! Ou est ce qu'il y a une condition ternaire ?
*/
const addToBasket = () => {
  const itemList = document.getElementById("itemList");
  const counter = basket.length + 1;

  //Système de prix
  // ! NANI, c'est quoi ce commentaire
  // ! Condition qui augmente prix selon les champs dans l'objet basketChoose 
  let price = 25;
  if (basketChoose.chapeau) price = price + 5;
  if (basketChoose.haut) price = price + 5;
  if (basketChoose.bas) price = price + 5;
  if (basketChoose.chaussure) price = price + 5;

  basketPrice = basketPrice + price;
  document.getElementById('counterPrice').innerText = basketPrice;

  // Ajoute d'HTML pour effacer l'element selectionnés ainsi que le prix de l'item selectioné
  // ! Non, insert du HTML dans le DOM pour ajouter la Figurine au panier
  // ! Selon son prix et le counter de la figurine.
  itemList.insertAdjacentHTML(
    "beforeend",
    `<p class="my-text text-white mx-content" id="itemId${counter}" itemPrice="${price}" onclick="removeItem('itemId${counter}')">Fig${counter} ${price} €</p>`
  );

  //Si on clique sur un element du panier alors on effectue la fonction remove de cet element du panier
  // ! Non, remplace par : "Clear l'objet basketChoose (vide le panier)"
  basket.push(basketChoose);
  basketChoose.chapeau = null;
  basketChoose.haut = null;
  basketChoose.bas = null;
  basketChoose.chaussure = null;
  // ! Call les functions qui permet de clear la figurine dans le DOM
  removeChapeauToOrder();
  removeHautToOrder();
  removeBasToOrder();
  removeChaussureToOrder();
};

/* Fonction qui verifie la validité du panier
:: Si le panier est vide affichage du message d'alerte dans une nouvelle fenetre panier vide
  ! Vérifie si le tableau est vide, si oui affiche une alerte.
*/
const validateBasket = () => {
  if (basket.length === 0) return alert("Panier vide.");
  //affichage du message d'alerte panier vide
  window.location.href = "./basket/index.html";
};

/* Fonction qui supprime un element
:: param (itemname) : prend le nom de l'item ainsi que son prix
:: enleve au panier le prix de l'item et l'item en lui-même
*/
const removeItem = (itemName) => {
  const element = document.getElementById(itemName);
  const price = element.getAttribute("itemPrice");

  basketPrice = basketPrice - price;
  document.getElementById("counterPrice").innerText = basketPrice;
  element.remove();
}

/* Fonction qui associe l'item à son action
:: param (itemname) : prend le nom de l'item ainsi que son prix
:: effectue la fonction que retourne la valeur de la variable
:: voir fonction itemfilter() pour comprendre
*/
const processItem = (itemName) => {
  const itemType = itemFilter(itemName);
  if (itemType === 1) return addChapeauToOrder(itemName);
  if (itemType === 2) return addHautToOrder(itemName);
  if (itemType === 3) return addBasToOrder(itemName);
  if (itemType === 4) return addChaussureToOrder(itemName);
  if (itemType === 5) return removeChapeauToOrder();
  if (itemType === 6) return removeHautToOrder();
  if (itemType === 7) return removeBasToOrder();
  if (itemType === 8) return removeChaussureToOrder();
  return;
};

/* Fonction qui ajoute le chapeau à la figurine
:: param (itemname) : prend le nom de l'item
:: Sa valeur prend vrai
*/
const addChapeauToOrder = (itemName) => {
  const chapeau = document.getElementById(itemName);
  const basket = document.getElementById("orderChapeau");

  basket.setAttribute("src", chapeau.getAttribute("src"));
  basketChoose.chapeau = true;
};

/* Fonction qui ajoute le haut à la figurine
:: param (itemname) : prend le nom de l'item
:: Sa valeur prend vrai
*/
const addHautToOrder = (itemName) => {
  const chapeau = document.getElementById(itemName);
  const basket = document.getElementById("orderHaut");

  basket.setAttribute("src", chapeau.getAttribute("src"));
  basketChoose.haut = true;
};

/* Fonction qui ajoute le bas à la figurine
:: param (itemname) : prend le nom de l'item
:: Sa valeur prend vrai
*/
const addBasToOrder = (itemName) => {
  const chapeau = document.getElementById(itemName);
  const basket = document.getElementById("orderBas");

  basket.setAttribute("src", chapeau.getAttribute("src"));
  basketChoose.bas = true;
};

/* Fonction qui ajoute les  chaussures à la figurine
:: param (itemname) : prend le nom de l'item
:: Sa valeur prend vrai
*/
const addChaussureToOrder = (itemName) => {
  const chapeau = document.getElementById(itemName);
  const basket = document.getElementById("orderChaussure");

  basket.setAttribute("src", chapeau.getAttribute("src"));
  basketChoose.chaussure = true;
};

/* Fonction qui supprime le chapeau à la figurine
:: Sa valeur prend faux
*/
const removeChapeauToOrder = () => {
  const basket = document.getElementById("orderChapeau");

  basket.removeAttribute("src");
  basketChoose.chapeau = false;
};

/* Fonction qui supprime le haut à la figurine
:: Sa valeur prend faux
*/
const removeHautToOrder = () => {
  const basket = document.getElementById("orderHaut");

  basket.removeAttribute("src");
  basketChoose.haut = false;
};

/* Fonction qui supprime le bas à la figurine
:: Sa valeur prend faux
*/
const removeBasToOrder = () => {
  const basket = document.getElementById("orderBas");

  basket.removeAttribute("src");
  basketChoose.bas = false;
};

/* Fonction qui supprime les  chaussures à la figurine
:: Sa valeur prend faux
*/
const removeChaussureToOrder = () => {
  const basket = document.getElementById("orderChaussure");

  basket.removeAttribute("src");
  basketChoose.chaussure = false;
};

/* Fonction qui associe un item à une valeur 
:: param (itemname) : prend le nom de l'item et l'associe à une valeur
*/
const itemFilter = (itemName) => {
  if (itemName.startsWith("chapeau")) return 1;
  if (itemName.startsWith("haut")) return 2;
  if (itemName.startsWith("bas")) return 3;
  if (itemName.startsWith("chaussure")) return 4;
  if (itemName.startsWith("orderChapeau")) return 5;
  if (itemName.startsWith("orderHaut")) return 6;
  if (itemName.startsWith("orderBas")) return 7;
  if (itemName.startsWith("orderChaussure")) return 8;
  return 0;
};
