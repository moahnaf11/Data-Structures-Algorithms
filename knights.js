const direction = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];
class Node {
    constructor(position, path = [], distance = 0) {
        this.row = position[0];
        this.col = position[1];
        this.distance = distance;
        this.path = path;
    }
}

function knightMoves (start, end) {
    let queue = [];
    let visited = new Set();
    const startNode = new Node(start, [start]);
    visited.add(`${startNode.row}, ${startNode.col}`);
    queue.push(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        const {row, col, distance, path} = currentNode;

        if (row === end[0] && col === end[1]) {
            console.log(`You made it in ${distance} moves!`);
            path.forEach((coordinate) => {
                console.log(coordinate);
            })
            return;
        }

        const allPossiblePositions = getallNeighbours(currentNode).filter((coordinate) => (
            coordinate[0] >= 0 && coordinate[0] <= 7 && coordinate[1] >= 0 && coordinate[1] <= 7
        ));

        let index = allPossiblePositions.indexOf(end);
        if (index !== -1) {
            queue.push(new Node(allPossiblePositions[index], [...path, allPossiblePositions[index]], distance + 1));
        }   else {
            allPossiblePositions.forEach((coordinate) => {
                const key = `${coordinate[0]}, ${coordinate[1]}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push(new Node(coordinate, [...path, coordinate], distance + 1));
                }

            });
        }


    }




}


function getallNeighbours ({row, col}) {
    let neighbours = [];
    for (let move of direction) {
        const [rowChange, colChange] = move;
        let x = row + rowChange;
        let y = col + colChange;
        neighbours.push([x, y]);
    }

    return neighbours;
}

knightMoves([3, 3], [4, 3]);