//פונקציה מקבלת מיקום במטריצה ובודקת אם המקום פנוי שולחת לפונקציה checkCube
function main(i, j) {
    if (matrixData.matrix[i][j] == -1) {
        checkCube(i, j)
        if (flag == 1) {
            flag = 0
            checkActionsOverC()
            contin()
            console.log(matrixData.matrix)
        }
    }
}
// //  לאחר עדכון הנקודות בסוף המשחק
// function saveData() {
//     localStorage.setItem('players', JSON.stringify(player));

// }
// // לבתחילת המשחק
// function getData() {
//     player = JSON.parse(localStorage.getItem('players'));


// }
//פונקציה שצובעת את הקוביה ומסמנת את זה במטריצה
function put(i, j) {
    matrixData.matrix[i][j] = currentUser.userName;
    document.querySelector('#m_' + i + "_" + j).style.backgroundColor = player.color
   

    
}

//בודקת איזה צבע יש יותר אחרי שהלוח ניגמר מחזירה את השחקן המנצח
function checkMoreColor(flag) {
    let color1 = 0, color2 = 0
    for (let i = 0; i < matrixData.row; i++) {
        for (let j = 0; j < matrixData.column; j++) {
            if (matrixData.matrix[i][j] == currentUser.userName) {
                color1++
            }
            else if (matrixData.matrix[i][j] == 'c') {
                color2++
            }
        }
    }
    // document.body.innerHTML = ''
    var largeTextElement = document.createElement('h1');
    largeTextElement.style.fontSize = '36px';
    largeTextElement.style.textTransform = 'uppercase';
    largeTextElement.id = 'win'
    if (color1 > color2) {
        currentUser.points += color1
        let users = JSON.parse(localStorage.getItem("users")) || {};
        users[currentUser.userName].points += color1;
        localStorage.setItem("users", JSON.stringify(users));
        // saveData()
        if (flag == 1)
            largeTextElement.textContent = "הלוח התמלא " + currentUser.userName + " ניצחה🥳 ונוספו לה " + color1 + " נקודות"
        else
            largeTextElement.textContent = "נגמרו המהלכים " + currentUser.userName + " ניצחה🥳 ונוספו לה " + color1 + " נקודות"
    }

    else if (color2 > color1) {
        currentUser.points -= 10
        let users = JSON.parse(localStorage.getItem("users")) || {};
        users[currentUser.userName].points -= 10;
        localStorage.setItem("users", JSON.stringify(users));

        // saveData()
        if (flag == 1)
            largeTextElement.textContent = "הלוח התמלא והפסדת 10 נקודות😞"
        else
            largeTextElement.textContent = "נגמרו המהלכים והפסדת 10 נקודות😞"
    }
    else
        largeTextElement.textContent = "אין מנצח"
    document.body.appendChild(largeTextElement)
}

//לבדוק האם לשחקן נותרו מהלכים חוקיים. אם לא נגמר המשחק.
function checkActionsOverP() {
    let FullBoard = 1;

    for (let i = 0; i < matrixData.row; i++) {
        for (let j = 0; j < matrixData.column; j++) {
            // Skip non-empty cells
            if (matrixData.matrix[i][j] !== -1) continue;
            FullBoard = 0;

            for (let k = 0; k < 8; k++) {
                const dir = ArrayOfDirections[k];
                let ii = i + dir[0];
                let jj = j + dir[1];

                // First cell must be opponent
                if (!inBounds(ii, jj) || matrixData.matrix[ii][jj] !== 'c') continue;

                // Keep moving in the same direction while encountering opponent pieces
                while (inBounds(ii, jj) && matrixData.matrix[ii][jj] === 'c') {
                    ii += dir[0];
                    jj += dir[1];
                }

                // If player piece is found after at least one opponent piece — valid move exists
                if (inBounds(ii, jj) && matrixData.matrix[ii][jj] === currentUser.userName) {
                    return; // Player still has a move, no need to check further
                }
            }
        }
    }

    // If we get here, player has no valid moves
    checkMoreColor(FullBoard);
}
//לבדוק האם למחשב נותרו מהלכים חוקיים. אם לא נגמר המשחק.
function checkActionsOverC() {
    let FullBoard = 1;

    for (let i = 0; i < matrixData.row; i++) {
        for (let j = 0; j < matrixData.column; j++) {
            if (matrixData.matrix[i][j] !== -1) continue;
            FullBoard = 0;

            for (let k = 0; k < 8; k++) {
                const dir = ArrayOfDirections[k];
                let ii = i + dir[0];
                let jj = j + dir[1];

                if (!inBounds(ii, jj) || matrixData.matrix[ii][jj] !== currentUser.userName) continue;

                while (inBounds(ii, jj) && matrixData.matrix[ii][jj] === currentUser.userName) {
                    ii += dir[0];
                    jj += dir[1];
                }

                if (inBounds(ii, jj) && matrixData.matrix[ii][jj] === 'c') {
                    return; // המחשב יכול לשחק
                }
            }
        }
    }

    checkMoreColor(FullBoard);
}

// עוזר: בודק אם תא נמצא בתוך גבולות הלוח
function inBounds(i, j) {
    return i >= 0 && i < matrixData.row && j >= 0 && j < matrixData.column;
}

//בודקת אם השם משתמש או הסיסמא שמורים במערכת אם כן מחזירה את המשתמש עם כל הנתונים שלו
// function checkUserNameAndPassword(username, password) {
//     const users = JSON.parse(localStorage.getItem("users")) || {};

//     if (users[username]) {
//         if (users[username].password === password) {
//           statusDiv.textContent = `Welcome back, ${username}! Your score is ${users[username].score}.`;
//         } else {
//           statusDiv.textContent = "Incorrect password.";
//         }
//       } else {
//         // New user
//         users[username] = { password: password, score: 0 };
//         localStorage.setItem("users", JSON.stringify(users));
//       }

// }
function removeSpaces(string) {
    return string.replace(/\s/g, "");
}

function computerPlay() {
    let max = 0, imax = -1, jmax = -1, bestFlags = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < matrixData.row; i++) {
        for (let j = 0; j < matrixData.column; j++) {
            if (matrixData.matrix[i][j] !== -1) continue;

            let totalFlips = 0;
            let currentFlags = [0, 0, 0, 0, 0, 0, 0, 0];

            for (let k = 0; k < 8; k++) {
                const dir = ArrayOfDirections[k];
                let ii = i + dir[0], jj = j + dir[1], flips = 0;

                if (!inBounds(ii, jj) || matrixData.matrix[ii][jj] !== currentUser.userName)
                    continue;

                while (inBounds(ii, jj) && matrixData.matrix[ii][jj] === currentUser.userName) {
                    ii += dir[0];
                    jj += dir[1];
                    flips++;
                }

                if (inBounds(ii, jj) && matrixData.matrix[ii][jj] === 'c') {
                    totalFlips += flips;
                    currentFlags[k] = 1;
                }
            }

            if (totalFlips > max) {
                max = totalFlips;
                imax = i;
                jmax = j;
                bestFlags = currentFlags.slice();
            }
        }
    }

    if (imax !== -1 && jmax !== -1) {
        flagOfKMax = bestFlags;
        putComputer(imax, jmax);
    }
}

// פונקציה לבדוק אם תא בגבולות הלוח
function inBounds(i, j) {
    return i >= 0 && i < matrixData.row && j >= 0 && j < matrixData.column;
}
function putComputer(i, j) {
    matrixData.matrix[i][j] = 'c';
    document.querySelector(`#m_${i}_${j}`).style.backgroundColor = computer.color;

    for (let k = 0; k < 8; k++) {
        if (!flagOfKMax[k]) continue;

        let [dx, dy] = ArrayOfDirections[k];
        let ii = i + dx, jj = j + dy;

        while (matrixData.matrix[ii][jj] !== 'c') {
            matrixData.matrix[ii][jj] = 'c';
            document.querySelector(`#m_${ii}_${jj}`).style.backgroundColor = computer.color;
            ii += dx;
            jj += dy;
        }

        flagOfKMax[k] = 0; // reset after use (optional depending on structure)
    }

    checkActionsOverP();
    next();
}

function checkCube(i, j) {
    for (let k = 0; k < 8; k++) {
        const dir = ArrayOfDirections[k];
        let ii = i + dir[0];
        let jj = j + dir[1];

        // דילוג אם מחוץ לתחום או לא כלי של היריב
        if (!inBounds(ii, jj) || matrixData.matrix[ii][jj] !== 'c') continue;

        let count = 0;

        // Traverse in the current direction while finding opponent's pieces
        while (inBounds(ii, jj) && matrixData.matrix[ii][jj] === 'c') {
            ii += dir[0];
            jj += dir[1];
            count++;

            // Stop if out of bounds
            if (!inBounds(ii, jj)) break;
        }

        // If player's piece found after opponent's line — valid move
        if (inBounds(ii, jj) && matrixData.matrix[ii][jj] === currentUser.userName && count > 0) {
            put(i, j); // Place the player's piece
            flag = 1;

            // Flip all opponent pieces in this direction
            let flipI = ii - dir[0];
            let flipJ = jj - dir[1];
            while (count > 0) {
                matrixData.matrix[flipI][flipJ] = currentUser.userName;
                document.querySelector(`#m_${flipI}_${flipJ}`).style.backgroundColor = player.color;
                flipI -= dir[0];
                flipJ -= dir[1];
                count--;
            }
        }
    }
}
