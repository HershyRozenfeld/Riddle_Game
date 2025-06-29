export default {
    id: 3,
    num1:0,
    num2:0,
    name: "Multiplication Time",
    getTaskDescription: (num1, num2) => `What is ${num1} * ${num2}?`,
    getCorrectAnswer: (num1, num2) => num1 * num2
};
