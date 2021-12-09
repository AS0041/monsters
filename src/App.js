import './App.css';
import { Component } from 'react';
import { CardList } from './component/card-list/cardList.component'
import { Search } from './component/search/search.component';


class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ""
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      this.setState({ monsters: users })
    }
    catch (e) {
      console.log("Error!", e)
    }
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredmonsters = monsters.filter(monster => (
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    ));
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <Search placeholder="search monsters"
          handleChange={e => this.setState({ searchField: e.target.value })
          } />
        <CardList monsters={filteredmonsters} />
      </div>
    );
  }
}

export default App;
