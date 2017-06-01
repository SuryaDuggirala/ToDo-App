import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Time from 'react-time';

class Elements extends React.Component {
    constructor() {
        super();
        this.state = {
            done: true,
        }
    }
    switchPriority() {
        this.setState({done: !this.state.done})
    }
    render() {

        if (this.state.done) {
            return (
                <div>
                    <button onClick={this.props.onSwitch}> Finished </button>
                    <li id="finished"> {this.props.whatToDo} </li>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.props.onSwitch}> Finished </button>
                    <li id="unFinished"> {this.props.whatToDo} </li>
                </div>
            )
        }
    }
}

var removed = [];
var elementsList = [];


class ToDoList extends React.Component {
    constructor() {
        super();
        this.state = {
            toDoElements: [],
            numElements: 0,
            today: new Date(),
            days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            elementToAdd: '',
            elementAdded: true,
            elementRemoved: false,
            numberToRemove: '',
            done: false,
        };
    }
    

    render() {
        // YOUR CODE HERE
        if (this.state.today.getTime() === 0) {
            this.setState({toDoElements: []});
        }
        const markOpposite = () => {
            return;
        }
        const itemMap = (item) => {
            return <Elements whatToDo={properCapitalize(item)} onSwitch={() => this.setState({done: !this.state.done})} />
        }

        const properCapitalize = (str) => {
            var lst = str.split(' ');
            var len = lst.length;
            var finalString = '';
            for (var i = 0; i < len; i++) {
                var word = lst[i];
                if (i === 0) {
                    word = word[0].toUpperCase() + word.slice(1);
                } else {
                    word = word.toLowerCase();
                }
                finalString += word + " ";
            }
            finalString = finalString.trim();
            return finalString + ".";
        }
        /** Inspired by Facebook tutorial. */
        const handleSubmit = (event) => {
            event.preventDefault();
                if (this.state.elementToAdd === "") {
                    return;
                } else {
                    let lst = this.state.toDoElements.slice();
                    lst.push(this.state.elementToAdd);
                    this.setState({toDoElements: lst});
                }
            this.setState({elementToAdd: ''});
        }
        const handleChange = (inp) => {
            this.setState({elementToAdd: inp.target.value});
        }

        const handleRemove = (e) => {
            e.preventDefault();
           // alert("i is: ", i);
           // i = Number(i);
            console.log("e is: ", e, e.target, e.target.value, " and typeof: ", typeof(e));
            console.log(this.state.numberToRemove);
            let i = this.state.numberToRemove;
            i -= 1;
            var lst = [];
            if (i >= 0
            && i < this.state.toDoElements.length) {
                for (var index = 0; index < this.state.toDoElements.length; index++) {
                    if (index != i) {
                        lst.push(this.state.toDoElements[index]);
                    }
            }
            this.setState({toDoElements: lst});
            console.log(lst);
            }
            this.setState({numberToRemove: ''});
        }

        let dayNumber;
        let monthNumber;
        let date;
        let year;

        dayNumber = this.state.today.getDay();
        monthNumber = this.state.today.getMonth();
        date = this.state.today.getDate();
        year = this.state.today.getFullYear();

        let dayString = this.state.days[dayNumber];
        let monthString = this.state.months[monthNumber];
        let addedElement = false;

        return (
            <div> 
                <div>
                <h1>
                    {dayString} {monthString} {date} {year}            
                </h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Todo:<br/>
                        <input type="text" value={this.state.elementToAdd} onChange={handleChange} placeholder="TODO"/>
                    </label>
                    <input type="submit" value="Create Event" />
                </form>
                <form onSubmit={handleRemove}> 
                    <label> 
                        <br/>Remove Item<br/>
                        <input type="number" value={this.state.numberToRemove} onChange={(e) => {this.setState({numberToRemove: e.target.value})}} placeholder="Remove" />
                    </label>
                    <input type="submit" value="Remove" />
                </form>
                </div>
                <ol>
                    {(this.state.toDoElements.map(itemMap))}
                </ol>
            </div>
        );
    }
}

ReactDOM.render(
    <ToDoList />,
    document.getElementById("root")
)
