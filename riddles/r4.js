export default {
    id: 4,
    num1:0,
    num2:0,
    name: "Quick Division",
    getTaskDescription: (num1, num2) => `What is ${num1} / ${num2}?`,
    getCorrectAnswer: (num1, num2) => Math.floor(num1 / num2)
};