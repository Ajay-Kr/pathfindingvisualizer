import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export function dijkstra(grid, startNode, finishNode) {
	startNode.distance = 0;
	let unvisitedNodes = getNodes(grid);
	let visitedNodesInOrder = [];
	while (unvisitedNodes.length !== 0) {
		unvisitedNodes.sort((a, b) => a.distance - b.distance);
		let closestNode = unvisitedNodes.shift();
		if (closestNode.isWall) continue;
		if (closestNode.distance === Infinity) return visitedNodesInOrder;
		if (closestNode === finishNode) {
			setTimeout(() => {
				toast.success("Path Found");
				toast(`{Node visited: ${visitedNodesInOrder.length}`);
			}, 2000);
			return visitedNodesInOrder;
		}
		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);
		updateUnvisitedNeighbours(closestNode, grid);
	}
	toast.warning("Path Not Found");
}

function getNodes(grid) {
	let nodes = [];
	for (let row of grid) {
		for (let node of row) {
			nodes.push(node);
		}
	}
	return nodes;
}

function updateUnvisitedNeighbours(node, grid) {
	let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
	for (let unvisitedNeighbour of unvisitedNeighbours) {
		unvisitedNeighbour.distance = node.distance + 1;
		unvisitedNeighbour.previousNode = node;
	}
}

function getUnvisitedNeighbours(node, grid) {
	let neighbours = [];
	let { row, col } = node;
	if (row !== 0) neighbours.push(grid[row - 1][col]);
	if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
	if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
	if (col !== 0) neighbours.push(grid[row][col - 1]);
	return neighbours
		.filter((neighbour) => !neighbour.isWall)
		.filter((neighbour) => !neighbour.isVisited);
}
