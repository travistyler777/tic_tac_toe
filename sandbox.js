const Gameboard = () => {

    let gameboard = [1,2,3,4,5];

    return {
        get gameboard() { return gameboard },
    }

}

console.log(gameboard)