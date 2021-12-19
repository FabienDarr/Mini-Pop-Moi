const validate = () => {

  const lastName = document.getElementById("lastName").value;
  const firstName = document.getElementById("firstName").value;
  const adresse = document.getElementById("adresse").value;

  const form = document.getElementById("contentForm");
  form.remove();

  const finish = document.getElementById("contentFinish");
  finish.insertAdjacentHTML(
    "beforeend",
    `
      <div class="w-full flex flex-col content-center items-center bg-blue border">
        <div class="my-text">
          <p class="text-white">Votre commande a été envoyé à l'adresse suivante:</p>
        </div>
        <div class="my-text">
          <p class="text-white">${lastName} ${firstName} ${adresse}</p>
        </div>
        <div class="my-text">
          <a href="../index.html" class="text-white">Créer une nouvelle figurine</p>
        </div>
      </div>
    `
  );

}