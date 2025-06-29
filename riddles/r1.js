export default {
    id: 1,
    num1:0,
    num2:0,
    name: "Easy Math",
    getTaskDescription: (num1, num2) => `What is ${num1} + ${num2}?`,
    getCorrectAnswer: (num1, num2) => num1 + num2
};