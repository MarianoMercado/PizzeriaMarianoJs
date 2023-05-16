const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

/* Al apretar el botón , deberán capturar el valor ingresado en el input (Que será un número) mediante el evento "submit" si están usando un formulario o bien el evento "click" si quieren manejarlo desde el botón.* */

//Capturar html

const BtnBuscar = document.getElementById("BtnBuscar");
const InpTxt = document.getElementById("InpTxt");
const cardContainer = document.querySelector(".card-container");
const FooterContainer = document.querySelector(".footer-container");
const searchContainer = document.querySelector(".search-container");

let CardPedido = JSON.parse(localStorage.getItem("card")) || [];

const saveLocalStorage = () => {
  localStorage.setItem("card", JSON.stringify(CardPedido));
};

const createCard = (cardpedido) => {
  return `
   <div class="card">
          
          <div class="card-header">
            <h3>${cardpedido.nombre}</h3>
          </div>
          
          <div class="card-body">
            <img src="${cardpedido.imagen}" alt="" class="card-img" />

             ${CardPedido.forEach((ing) => {
               return `
               <div class="card-ingredientes">${ing.id} </div>;             
             
             `;
             })}


              
           
                    
              
          
          </div>
          
          <div class="card-footer">
            <span>$${cardpedido.precio}</span>
          </div>
 </div> 

  `;
};

const MsjError = (message) => {
  searchContainer.classList.remove("success");
  searchContainer.classList.add("error");
  const error = document.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

const renderPedido = () => {
  cardContainer.innerHTML = CardPedido.map((card) => createCard(card));
};

const BuscarId = () => {
  const ExistId = pizzas.some((pizza) => pizza.id == InpTxt.value);
  return ExistId;
};

const FiltrarPizza = () => {
  CardPedido = pizzas.filter((pizza) => pizza.id == InpTxt.value);
  console.log(CardPedido);
  return CardPedido;
};

const limpiar = () => {
  limpiarInpt();
  limpiarPizza();
};

const limpiarPizza = () => {
  localStorage.clear();
};

const limpiarInpt = () => {
  debugger;
  searchContainer.classList.remove("error");
  const error = document.querySelector("small");
  error.style.display = "none";
  error.textContent = "";
};
BuscarPizza = () => {
  limpiar();

  if (InpTxt.value == "") {
    MsjError("Ingrese un Número del menú");
  } else if (BuscarId()) {
    FiltrarPizza();
    renderPedido(CardPedido);
    saveLocalStorage();
  } else {
    MsjError(
      "No se encuentra en el menu. Por Favor reingrese un núevo pedido!"
    );
  }
};

let ingredientesPedidio = pizzas.filter((ingredinte) => {
  console.log(InpTxt.value);
  console.log(ingredinte);
  if (ingredinte.id == InpTxt.value) {
    return ingredinte.ingredientes;
  }
});
console.log(ingredientesPedidio);

// Fn inicializadora

const init = () => {
  document.addEventListener("DOMContentLoaded", renderPedido);
  BtnBuscar.addEventListener("click", () => BuscarPizza());
};

init();
