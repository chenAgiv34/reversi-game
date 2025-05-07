let matrixData = {
    row: 8,
    column: 8,
    matrix: []
}
/*
let players = [
    {
        userName: 'חן',
        password: '1111',
        points: 0,
        color: 'white'
    },
    {
        userName: 'מיכל',
        password: '2222',
        points: 0,
        color: 'yellow'
    }
]*/
let computer = {
    color: 'black'
}
let player = {
    color: 'white'
}
let flag = 0
let flagOfK = [0, 0, 0, 0, 0, 0, 0, 0]
let flagOfKMax = [0, 0, 0, 0, 0, 0, 0, 0]
let turn = 'p'
let currentUser = {
    userName: '',
    password: '',
    points: 0,

}
let ArrayOfDirections = [[1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]]



// let ArrayOfDirections = [[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]]