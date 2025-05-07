
//הפונקציה מציגה את הטופס רישום הראשון
function CreateSignInForm() {
    document.body.style.display = 'flex'
    document.body.style.justifyContent = 'center'
    document.body.style.alignItems = 'center'


    document.body.style.backgroundColor = 'rgb(214, 245, 245)'

    let form = document.createElement('form')

    form.classList.add('user-form')

    let labelUserName = document.createElement('label');
    labelUserName.for = "userName";
    labelUserName.innerHTML = "שם משתמש"

    form.appendChild(labelUserName)


    let inputUserName = document.createElement('input');
    inputUserName.type = 'text'
    inputUserName.id = 'userName'
    inputUserName.placeholder = 'הכנס שם משתמש'
    inputUserName.classList.add('form-control');
    inputUserName.required = true;

    form.appendChild(inputUserName)

    let labelPassword = document.createElement('label');
    labelPassword.for = "password";
    labelPassword.innerHTML = "סיסמא"

    form.appendChild(labelPassword)


    let inputPassword = document.createElement('input');
    inputPassword.type = 'password'
    inputPassword.id = 'password'
    inputPassword.placeholder = 'הכנס סיסמא'
    inputPassword.classList.add('form-control');
    inputPassword.required = true;

    form.appendChild(inputPassword)

    let inputButton = document.createElement('input');
    inputButton.type = 'submit'
    inputButton.value = 'התחבר'
    inputButton.classList.add('btn');
    inputButton.classList.add('btn-primary');

    form.appendChild(inputButton)

    form.addEventListener('submit',
        function (event) {
            event.preventDefault();//לעצור התנהגות ברירת מחדל
            let userName = document.querySelector('#userName').value
            let password = document.querySelector('#password').value;
            

            // let user = checkUserNameAndPassword(removeSpaces(userName), removeSpaces(password))
            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[userName]) {
                if (users[userName].password !== password) {
                    return
                }
            } else {
                // New user
                users[userName] = { password: password, points: 0 };
                localStorage.setItem("users", JSON.stringify(users));
            }

            currentUser.userName = userName
            currentUser.password = users[userName].password
            currentUser.points = Number(users[userName].points)
            document.body.innerHTML = "";
            createWebPage2()

        })

    document.querySelector('#myFrom').appendChild(form)

}
console.log(matrixData.matrix)
//יוצרת את המשחק עצמו את המטריצה ומיכנה את הכלים הראשונים קוראל לפונקציות המתאימות מה script
function createGame() {

    //ליצור מטריצה
    let matrix = document.createElement('div')
    matrix.id = "my_matrix"
    matrix.style.display = 'grid';
    matrix.style.gridTemplateColumns = 'repeat(' + matrixData.column + ',100px)';
    matrix.style.gridTemplateRows = 'repeat(' + matrixData.row + ',100px)';
    matrix.style.justifyContent = 'ceneter';
    matrix.style.alignItems = 'center';

    for (let i = 0; i < matrixData.row; i++) {
        let newBoard = []
        for (let j = 0; j < matrixData.column; j++) {
            let item = document.createElement('div')
            item.id = "m_" + i + "_" + j;
            item.style.width = 100 + "px";
            item.style.height = 100 + "px";

            item.addEventListener('click', () => {
                if (turn == 'p')
                    main(i, j)
            })
            matrix.appendChild(item)
            newBoard.push(-1)
        }
        matrixData.matrix.push(newBoard)
    }
    document.body.appendChild(matrix)
    //ליצור כותרת
    let titleElement = document.createElement("h1")
    titleElement.innerHTML = "התור שלך"

    titleElement.id = "myTitle"
    document.body.appendChild(titleElement)

    //ליצור כפתור חזור
    let inputButton = document.createElement('input');
    inputButton.type = 'submit'
    inputButton.value = '🔙'
    inputButton.id = 'return'
    inputButton.addEventListener('click',
        function (event) {
            document.body.innerHTML = "";


            createWebPage2()
        })

    document.body.appendChild(inputButton)
    let center = matrixData.column / 2;
    matrixData.matrix[center][center - 1] = currentUser.userName;
    document.querySelector('#m_' + center + '_' + (center - 1)).style.backgroundColor = player.color;

    matrixData.matrix[center - 1][center] = currentUser.userName;
    document.querySelector('#m_' + (center - 1) + '_' + center).style.backgroundColor = player.color;

    matrixData.matrix[center - 1][center - 1] = 'c';
    document.querySelector('#m_' + (center - 1) + '_' + (center - 1)).style.backgroundColor = computer.color;

    matrixData.matrix[center][center] = 'c';
    document.querySelector('#m_' + center + '_' + center).style.backgroundColor = computer.color;
}
//מראה כמה נקודות הצתברו לשחקן צריך לסדר מהלוקאל סטוראג
function createMoney() {
    let div = document.createElement('div')
    // div.classList.add('user-form')
    div.id = 'myPoints'
    div.innerHTML = currentUser.points
    document.body.appendChild(div)
    // const img = document.createElement('img');
    // img.src = 'תמונה1.png';
    // img.id = 'imgMoney'
    // document.body.appendChild(img)

    let Button = document.createElement('input');
    Button.type = 'submit'
    Button.value = '🔙'
    Button.id = 'return'
    Button.addEventListener('click',
        function (event) {
            document.body.innerHTML = "";


            createWebPage2()
        })

    document.body.appendChild(Button)


}
//מסדרת את תפריט מס]פר 2 שמציג לאיפה אתה רותה להכנס 3 אפשרויות
function createWebPage2() {

    document.body.style.display = 'flex'

    let form = document.createElement('form')
    form.classList.add('user-form')
    form.id = 'from'
    let inputButton = document.createElement('input');
    inputButton.type = 'button'
    inputButton.value = 'התחלת המשחק'
    inputButton.id = 'startGame'
    inputButton.addEventListener('click',
        () => {
            document.body.innerHTML = ''
            createGame()
        })

    form.appendChild(inputButton)


    let inputButton1 = document.createElement('input');
    inputButton1.type = 'button'
    inputButton1.value = 'צפיה בנקודות שלך'
    inputButton1.id = 'pointView'
    inputButton1.addEventListener('click',
        function (event) {
            document.body.innerHTML = ""
            createMoney()
        })
    form.appendChild(inputButton1)

    let inputButton2 = document.createElement('input');
    inputButton2.type = 'button'
    inputButton2.value = 'הוראות המשחק'
    inputButton2.id = 'GameInstructions'
    inputButton2.addEventListener('click',
        function (event) {
            document.body.innerHTML = "";
            createGameInstructions()
        })
    form.appendChild(inputButton2)
    document.body.appendChild(form)

}
//מסדרת את הוראות המשחק
function createGameInstructions() {
    document.body.style.display = 'block'
    let h = document.createElement('h1')
    h.id = 'hh'
    h.innerHTML = "הוראות המשחק"
    let p = document.createElement('p')
    p.innerHTML = "מטרת המשחק: להפוך את צבעם של כלי היריב לצבע שלך, באמצעות סגירתם בכלים בצבע שלך. סגירה פירושה תחימת שורה, טור או אלכסון של שחקנים בצבע היריב משני קצותיה בשחקנים מהצבע שלך. לדוגמה: אם ישנו שחקן אדום ולידו שחקן כחול, השחקן האדום בתורו יוכל להניח שחקן אדום לצד הכחול (כך שתיווצר שורה בת 3 עיגולים), ולהופכו לאדום."
    p.appendChild(document.createElement('br'))
    p.innerHTML += "כללי המשחק: המשחק מתנהל בתורות. עמדת הפתיחה היא 4 שחקנים במרכז, 2 לכל אחד. כל שחקן רשאי להניח את הצבע שלו איפה שיש צמוד אליו צבע של השחקן הנגדי או כמה מהם העיקר שאחריהם יהיה צבע שלו"
    p.appendChild(document.createElement('br'))
    p.innerHTML += "סיום המשחק: המשחק נגמר באחד משלושה מצבים:    "
    p.appendChild(document.createElement('br'))
    p.innerHTML += "1.כאשר כל הלוח מתמלא"
    p.appendChild(document.createElement('br'))
    p.innerHTML += "2.כאשר כל הכלים המונחים על הלוח הם באותו צבע, גם אם הלוח אינו מלא, השחקן בצבע זה הוא המנצח."
    p.appendChild(document.createElement('br'))
    p.innerHTML += "3.כשאין מהלכים אפשריים נוספים לשחקן הנוכחי  "
    p.appendChild(document.createElement('br'))
    p.innerHTML += "המנצח הוא מי שיש יותר שחקנים בצבע שלו"
    document.body.appendChild(h)
    document.body.appendChild(p)
    let Button = document.createElement('input');
    Button.type = 'submit'
    Button.value = '🔙'
    Button.id = 'return'
    Button.addEventListener('click',
        function (event) {
            document.body.innerHTML = "";


            createWebPage2()
        })

    document.body.appendChild(Button)
}

function contin() {
    turn = 'c'
    let h = document.querySelector('#myTitle')
    h.innerHTML = "...תור המחשב"
    setTimeout(function () {
        computerPlay()
    }, 1000);

}
//פונקציה הרושמת של מי התור הנוכחי
function next() {
    let h = document.querySelector('#myTitle')
    h.innerHTML = "התור שלך"
    turn = 'p'
}

CreateSignInForm()