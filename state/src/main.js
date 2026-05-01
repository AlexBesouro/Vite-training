import { createStore } from "./store.js";

document.querySelector("#app").innerHTML = `
    <p>Compteur : <span id="count">0</span></p>
    <button id="incc">+</button>
    <button id="decrease">-</button>
    <hr>
    <input id="nameInput" placeholder="Votre nom">
    <button id="setName">Changer</button>
    <p>Bonjour, <span id="name">Visiteur</span> !</p>
`;

const inc = document.querySelector("#incc");
const dec = document.querySelector("#decrease");
const setName = document.querySelector("#setName");

const store = createStore({ count: 0, name: "Vsitor" });

store.subscribe(() => {
    const state = store.getState();
    document.querySelector("#count").textContent = state.count;
    document.querySelector("#name").textContent = state.name;
});

inc.addEventListener("click", () => {
    store.setState({ count: store.getState().count + 1 });
});
dec.addEventListener("click", () => {
    store.setState({ count: store.getState().count - 1 });
});
setName.addEventListener("click", () => {
    const name = document.querySelector("#nameInput").value;
    if (name) {
        store.setState({ name });
    }
});
