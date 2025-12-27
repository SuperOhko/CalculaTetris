// Write JavaScript code here

const appendToDisplay = (value) => {
  const display = document.getElementById("display");
  display.value += value;
};

const clearDisplay = () => {
    const display = document.getElementById("display");
    display.value = "";
}

const deleteLast = () => {
  let display = document.getElementById('display').value;
  document.getElementById('display').value =
    display.substring(0, display.length - 1);
};

const calculateResult = () => {
  const display = document.getElementById("display");
  display.value = eval(display.value);
};

window.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  bgm.volume = 0.25;

  // tentative d'auto-play au chargement
  bgm.play().catch(() => {
    // si le navigateur bloque, on démarre au premier clic/touche
    const startMusic = () => {
      bgm.play().catch(() => {});
      document.removeEventListener("click", startMusic);
      document.removeEventListener("keydown", startMusic);
    };

    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("keydown", startMusic, { once: true });
  });
});
