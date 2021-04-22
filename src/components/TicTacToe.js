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
	function computeTree(attr){
		if(!('playerMoves' in attr))){
			attr.playerMoves = [];
		}
		if(!('computerMoves' in attr)){
			attr.computerMoves = [];
		}
		let availableMoves = attr.grid.map((value,index)=>{value,index}).filter((o)=>o.value === 0);
		availableMoves.reduce((acc,o)=>{
			
		},null);
		return{
			index:0,
			children:[]
		};
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