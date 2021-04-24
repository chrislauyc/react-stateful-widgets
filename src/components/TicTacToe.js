import React,{useState} from 'react';



export default function TicTacToe(){
	const defaultGrid = [0,0,0,0,0,0,0,0,0];
	const [grid, setGrid] = useState(defaultGrid);
	const [turns, setTurns] = useState(0);
	const [win, setWin] = useState(0);
	function checkWinner(grid){
		//conditions
		//[r1,r2,r3,c1,c2,c3,x1,x2]
		let conditions = [0,0,0,0,0,0,0,0];
		conditions[0] = grid[0]+grid[1]+grid[2];
		conditions[1] = grid[3]+grid[4]+grid[5];
		conditions[2] = grid[6]+grid[7]+grid[8];
		conditions[3] = grid[0]+grid[3]+grid[6];
		conditions[4] = grid[1]+grid[4]+grid[7];
		conditions[5] = grid[2]+grid[5]+grid[8];
		conditions[6] = grid[0]+grid[4]+grid[8];
		conditions[7] = grid[6]+grid[4]+grid[2];
		const result = conditions.reduce((acc,element)=>{
			if(element === 3){
				return 1;
			}
			else if(element === -3){
				return -1;
			}
			else{
				return acc;
			}
		},0);
		return result;
	}
	function checkClicked(event){
		const {id} = event.target;
		if(grid[id] === 0){
			takeTurn(grid,id,-1);
			if(win === -1 || turns >= 9){
				return;
			}
			else{
				const tree = computeTree(grid);
				takeTurn(grid,tree.index,1);
			}
		}
	}
	const updateGrid = (grid, move)=>{
		return grid.map((g,i)=>{
			if(i===move){
				if(isMyMove){
					return 1;
				}
				else{
					return -1;
				}
			}
			else{
				return g;
			}
		});
	}
	const buildNode = (grid,move,availableMoves,isMyMove)=>{
		return{
			value:move,
			grid:updateGrid(grid, move),
			availableMoves:availableMoves.filter((m)=>m!==move),
			childNodes:[],
			isMyMove: isMyMove,
			numWins: 0,
			numLosses: 0,
			round:0
		};
	};
	function computeTree(node){
		//node contains:
		//availableMoves, childNodes, isMyMove, numWins, numLosses
		//check win conditions
		const winner = checkWinner(grid);
		if(winner===1){
			node.numWins += 1;
		}
		else if(winner===-1){
			node.numLosses += 1;
		}
		else{
			//do nothing
		}
		// build childNodes
		node.childNodes = node.availableMoves.map((move)=>buildNode(node.grid,move,availableMoves,!(node.isMyMove)));
		//recursively compute tree on childNodes
		node.childNodes = node.childNodes.map((child)=>computeTree(child));
		//sort childNodes based on win/lose ratio
		node.childNodes.sort((first,second)=>{
			const firstR = first.numWins/first.numLosses;
			const secondR = second.numWins/second.numLosses;
			if(firstR > second R){
				return 1;
			}
			else if(firstR < secondR){
				return -1;
			}
			else{
				return 0;
			}
		});
		// sum all the wins and losses
		node.childNodes.forEach((child)=>{
			node.numWins += child.numWins;
			node.numLosses += child.numLosses;
		});
		return node;
	}
	function getNextMove(node){
		//pick the best node
		return node.children[0];
	}
	function takeTurn(grid,index,value){
		grid[index] = value;
		setTurns(turns+1);
		setWin(checkWinner(grid));
	}
	return(
		<div className='widget-ttt container'>
			<h2>Tic Tac Toe</h2>
			<div className='ttt'>
			{
				grid.map((box,i)=>{
					<div id={i} className='box' onclick={checkClicked}>
						<div className=`${}`></div>
					</div>
				});
			}
			</div>	
		</div>
	);
}