<p align="right">

# משחק חידות מתמטי – Riddle Game

---

## תיאור כללי

משחק טריוויה מתמטי אינטראקטיבי בשורת הפקודה, בו השחקן פותר סדרת חידות (חשבוניות) ברמות קושי משתנות.  
המשחק מודד את הזמן שלוקח לפתור כל חידה, מציג ממוצע וזמן כולל, ומנהל סטטיסטיקות על כל שחקן.

---

## התקנה והרצה

```bash
git clone https://github.com/HershyRozenfeld/Riddle_Game.git
cd Riddle_Game
npm install
node app.js
```

*נדרש Node.js.*

---

## מבנה הפרויקט

- **app.js** – קובץ הכניסה הראשי, מנהל את הפלואו של המשחק.
- **exportToApp.js** – מבצע ייצוא של מחלקות, חידות וכלי עזר.
- **classes/** – מחלקות עזר (שחקן, מנהל חידה).
- **riddles/** – קבצי חידות (כל חידה בקובץ משלה).
- **package.json** – הגדרות הפרויקט ותלויות.
- **node_modules/** – ספריות צד שלישי.

---

## לוגיקת המשחק

1. מתבצע ייבוא של כל החידות והמחלקות.
2. השחקן מתבקש להכניס שם.
3. השחקן בוחר רמת קושי (קל/בינוני/קשה) – המשפיעה על המספרים שישולבו בחידות.
4. מוצגות חידות מתמטיות (חיבור, חיסור, כפל, חילוק) בלולאה.
5. עבור כל חידה:
    - מוצג ניסוח החידה.
    - נמדד הזמן עד שהתשובה נכונה.
    - מוצג אם התשובה נכונה או לא, עד שמתקבלת תשובה נכונה.
6. בתום כל החידות:
    - מוצג זמן ממוצע וזמן כולל.
    - מוצגות סטטיסטיקות השחקן.

---

## דוגמה לזרימת משחק

```
  __  __       _   _       _____  _     _     _ _
 |  \/  |     | | | |     |  __ \(_)   | |   | | |
 | \  / | __ _| |_| |__   | |__) |_  __| | __| | | ___  ___
 | |\/| |/ _` | __| '_ \  |  _  /| |/ _` |/ _` | |/ _ \/ __|
 | |  | | (_| | |_| | | | | | \ \| | (_| | (_| | |  __/\__ \
 |_|  |_|\__,_|\__|_| |_| |_|  \_\_|\__,_|\__,_|_|\___||___/



� Welcome to the Advanced Math Riddles Game! �

What is your name? hershy
Hello hershy
What level you Whant? (Easy(1) Medium(2) Hard(3))1
What is 4 + 9?: 13
Your answer is correct!
What is 4 - 9?: 7
Your answer is wrong
What is 4 - 9?:
...
Average time taken to solve a riddle 00:12
Total time of solving riddles 00:48
```

---

## קבצים עיקריים

### app.js

- מייבא את כל הכלים הדרושים.
- מתחיל כל משחק על ידי יצירת שחקן.
- שואל את המשתמש לרמת קושי, בוחר זוג מספרים מתאימים.
- עובר על כל החידות, יוצר עבור כל אחת מופע של RiddleManager, ומנהל הצגתן.
- מחשב זמן ממוצע וסה"כ, ומדפיס אותם.

### exportToApp.js

- מייצא:
    - readlineSync – קלט מהמשתמש.
    - allRiddles – מערך כל החידות.
    - Player, RiddleManager – מחלקות ניהול.
    - getSumAndAverage – חישוב סה"כ וממוצע זמנים.
    - divMinutesAndSeconds – עיצוב תצוגה של זמן.

### classes/Player.js

```js
export default function Player() {
    this.askName = function () {
        this.name = readlineSync.question('What is your name? ');
        console.log(`Hello ${this.name}`);
    }
    this.recordTime = function(start, end) {
        this.time = end - start;
    }
    this.showStats = function() {
        console.log(`Total time: ${this.time}`);
    }
    this.askName();
}
```
- שואל את שם השחקן ומציג ברכה.
- מאפשר מדידת זמן סטטיסטי והצגתו.

### classes/RiddleManager.js

```js
export default function RiddleManager(id, name, taskDescription, correctAnswer) {
    this.id = id;
    this.name = name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
    this.askManager = function() {
        this.start();
        while(!this.check(this.ask())) {
            console.log("Your answer is wrong");
        }
        console.log("Your answer is correct!");
        return this.endAndCalculation();
    }
    this.ask = function() {
        return readlineSync.question(`${this.taskDescription}: `);
    }
    this.check = function(num) {
        return num == this.correctAnswer ? true : false;
    }
    this.start = function() {
        this.startTime = Date.now();
    }
    this.endAndCalculation = function() {
        this.endTime = Date.now();
        const durationMs = this.endTime - this.startTime;
        return Math.floor(durationMs / 1000);
    }
}
```
- מנהל חידה בודדת – הצגה, בדיקה, מדידת זמן.

### riddles/exportRiddles.js

```js
import r1 from './r1.js';
import r2 from './r2.js';
import r3 from './r3.js';
import r4 from './r4.js';

export default [
    r1,
    r2,
    r3,
    r4
];
```
- מייצא מערך עם כל החידות.

### riddles/r1.js – riddles/r4.js

כל חידה היא אובייקט עם שדות:
- id – מזהה ייחודי.
- name – שם החידה.
- getTaskDescription – פונקציה שמחזירה תיאור החידה בהתאם למספרים.
- getCorrectAnswer – פונקציה שמחזירה את הפתרון.

לדוג'
```js
export default {
    id: 1,
    num1:0,
    num2:0,
    name: "Easy Math",
    getTaskDescription: (num1, num2) => `What is ${num1} + ${num2}?`,
    getCorrectAnswer: (num1, num2) => num1 + num2
};
```
---

## תלויות

- readline-sync – קלט סינכרוני מהמשתמש.
- chalk – עיצוב טקסט למסך (נמצא ב-dependencies אך לא נעשה בו שימוש בקוד שמסרת).

---

## הערות

- כל הקוד כתוב בסגנון מודולים של ES6.
- אין בדיקות אוטומטיות (`npm test` מחזיר הודעת שגיאה בלבד).
- ניתן להרחיב את מערך החידות ע"י הוספת קבצים בתיקיית riddles ועדכון הייצוא.

</p>
