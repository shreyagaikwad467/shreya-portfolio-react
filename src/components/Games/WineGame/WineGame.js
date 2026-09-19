const grapePositions = [
    { x: 15, y: 25 },
    { x: 34, y: 18 },
    { x: 54, y: 28 },
    { x: 76, y: 20 },

    { x: 25, y: 55 },
    { x: 47, y: 48 },
    { x: 67, y: 58 },
    { x: 84, y: 45 }
];


export function createGrapes() {

    return grapePositions
        .map((position, index) => ({

            id: index + 1,

            x: position.x,

            y: position.y,

            picked: false

        }))
        .sort(() => Math.random() - 0.5);

}