const readInput = function () {
  const input = document.getElementById("input").value;
  document.getElementById("output").innerHTML = calculator(input);
};

const calculator = function (expression) {
  const array = splitToArray(expression);

  if (checkIfNotValid(array)) {
    return "Incorrect expression!";
  }

  while (array.find((element) => element === "*" || element === "/")) {
    const index = array.findIndex((element) => element === "*" || element === "/");
    let newValue;

    if (array[index] === "*") {
      newValue = array[index - 1] * array[index + 1];
    } else {
      newValue = array[index - 1] / array[index + 1];
    }
    array.splice(index - 1, 3, newValue);
  }

  while (array.find((element) => element === "+" || element === "-")) {
    const index = array.findIndex((element) => element === "+" || element === "-");
    let newValue;

    if (array[index] === "+") {
      newValue = parseInt(array[index - 1]) + parseInt(array[index + 1]);
    } else {
      newValue = array[index - 1] - array[index + 1];
    }
    array.splice(index - 1, 3, newValue);
  }

  return array;
};

const splitToArray = function (string) {
  let array = [];
  let index = 0;
  string = string.replaceAll(" ", "");

  for (let i = 0; i < string.length; i++) {
    if (string[i] === "+" || string[i] === "-" || string[i] === "*" || string[i] === "/") {
      array.push(string.slice(index, i));
      array.push(string[i]);
      index = i + 1;
    }
  }

  array.push(string.slice(index));

  return array;
};

const checkIfNotValid = function (array) {
  let isNotValid = false;

  for (i = 0; i < array.length; i += 2) {
    if (isNaN(array[i]) || array[i] === "") {
      isNotValid = true;
    }
  }

  for (j = 1; j < array.length; j += 2) {
    if (!array[j] === "+" || !array[j] === "-" || !array[j] === "*" || !array[j] === "/") {
      isNotValid = true;
    }
  }

  return isNotValid;
};
