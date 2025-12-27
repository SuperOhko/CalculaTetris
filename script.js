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
