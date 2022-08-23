import React from "react";

class ClassCounter extends React.Component{
	constructor(props) {
		super(props)
		this.state ={
			count:0
		}
		//Метод bind() создаёт новую функцию,
		// которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение.
		// В метод также передаётся набор аргументов,
		// которые будут установлены перед переданными в привязанную функцию аргументами при её вызове.
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}
	increment(){
		this.setState({count:this.state.count + 1})
	}
	decrement(){
		this.setState({count:this.state.count - 1})
	}
	render() {
		return (
			<div>
				<h1>{this.state.count}</h1>
				<button onClick={this.increment}>Increment</button>
				<button onClick={this.decrement}>Decrement</button>
			</div>
		)
	}
}

export default ClassCounter;