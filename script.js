const config = [
  { name: "Calculadora 1", code: 1 },
  { name: "Calculadora 2", code: 2 },
  { name: "Calculadora 3", code: 3 },
  { name: "Calculadora 4", code: 5 },
];

const calculatorsContainer = document.getElementById("calculators");
const template = document.getElementById("calculatorTemplate");
const gamesSection = document.getElementById("games");

function compute(op, value) {
  switch (op) {
    case "square":
      return value ** 2;
    case "sqrt":
      if (value < 0) return "No existe √ real para negativos";
      return Math.sqrt(value);
    case "sin":
      return Math.sin(value);
    case "cos":
      return Math.cos(value);
    default:
      return "Operación no válida";
  }
}

function showGames() {
  calculatorsContainer.classList.add("hidden");
  gamesSection.classList.remove("hidden");
}

function showCalculators() {
  gamesSection.classList.add("hidden");
  calculatorsContainer.classList.remove("hidden");
}

config.forEach((calc) => {
  const node = template.content.firstElementChild.cloneNode(true);
  const title = node.querySelector("h3");
  const input = node.querySelector(".number-input");
  const result = node.querySelector(".result");
  const hint = node.querySelector(".hint");
  const unlockBtn = node.querySelector(".unlock");

  title.textContent = calc.name;
  hint.textContent = `Código asociado: ${calc.code}`;

  node.querySelectorAll(".ops button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = Number(input.value);
      if (Number.isNaN(num)) {
        result.textContent = "Resultado: ingresa un número válido";
        return;
      }
      const output = compute(btn.dataset.op, num);
      result.textContent = `Resultado: ${output}`;
    });
  });

  unlockBtn.addEventListener("click", () => {
    const num = Number(input.value);
    if (num === calc.code) {
      showGames();
    } else {
      result.textContent = "Resultado: código incorrecto para abrir juegos";
    }
  });

  calculatorsContainer.appendChild(node);
});

document.getElementById("exitGames").addEventListener("click", showCalculators);

document.getElementById("addGame").addEventListener("click", () => {
  const nameInput = document.getElementById("gameName");
  const urlInput = document.getElementById("gameUrl");
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (!name || !url) return;

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = name;
  li.appendChild(a);
  document.getElementById("gameList").appendChild(li);

  nameInput.value = "";
  urlInput.value = "";
});
