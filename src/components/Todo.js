import React, {useState} from 'react'

export default function Todo(){
	let defaultItem = {
		checked:false,
		content:''
	};
	let [items,setItems] = useState([defaultItem]);
	let [activeIndex, setActiveIndex] = useState(null);

	const style = {
		fontSize: '1.5em',
		marginBottom: '0.3em',
		color: 'royalblue',
		textDecoration: 'none'
	};
	function updateContent(event){
		const {value, id} = event.target;
		if(value.includes('\n')){
			value = value.replace('\n','');
			setActiveIndex(null);
			items.push(Object.assign({},defaultItem));
		}
		items[id]['content'] = value;
		setItems(items);
	}
	function isChecked(index){
		if(items[index]['checked']){
			style['textDecoration'] = 'line-through';
		}
		else{
			style['textDecoration'] = 'none';
		}
	}
	function isActiveItem(index){
		if(index === activeIndex){
			return(
				<input id={index} type='input' style={style} value={items[index]['content']} onChange={updateContent}>
			);
		}
		else{
			return(
				<label id={index} style={style} onclick={()=>activeIndex=id}>{items[index][content]}</label>
			);
		}
	}

	return(
		<div className='widget-todo container'>
			<h2>Todo List</h2>
			<div className='todo'>
			{
				items.map((item,i)=>{
					<div>
						<input id={i} type="checkbox" onclick={checked}>
						{isChecked()}
						{isActiveItem(i)}
					</div>
				});
			}
			</div>
		</div>
	);
}
