// import React, { useState } from "react";
// import Checkbox from "./components/Checkbox";
// import hero from "./img/hero.jpg";
// import "./header.scss";
// import "./main.scss";

// function App() {
//   const [checked, setChecked] = useState(false);
//   return (
//     <>
//       <header>
//         <div className="heroImg" alt="hero" src={hero}>
//           <h2 className="TODO__Header">TODO</h2>
//           <form className="TODO__Form">
//             {/* <input className="mx-4 TODO__Checkbox" type="checkbox" name="new" /> */}
//             <Checkbox
//               checked={checked}
//               onChange={(value) => setChecked(value)}
//             />
//             <input
//               className="TODO__New"
//               type="text"
//               placeholder="Create task"
//             />
//           </form>
//         </div>
//       </header>

//       <main className="main container ">
//         <section className="row">
//           <div className="main__todo col col-12">
//             <label>
//               <input className="mx-2" type="checkbox" name="name" />
//               Jog around the park
//             </label>
//           </div>
//           <div className="main__todo col col-12">
//             <label>
//               <input className="mx-4" type="checkbox" name="name" />
//               Jog around the park
//             </label>
//           </div>
//           <div className="main__todo col col-12">
//             <label>
//               <input className="mx-4" type="checkbox" name="name" />
//               Jog around the park
//             </label>
//           </div>
//         </section>
//         <section className="row main__footer">
//           <span>5 items left</span>
//           <div>
//             <button type="button">All</button>
//             <button type="button">Active</button>
//             <button type="button">Completed</button>
//           </div>
//           <button type="button">Clear completed</button>
//         </section>
//       </main>
//     </>
//   );
// }

// export default App;

import React, { Component } from "react";
// import TodoList from "./components/TodoList";
import Checkbox from "./components/Checkbox";
import hero from "./img/hero.jpg";
import "./header.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    // this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  }
  // handleAddTodo(value) {

  // }

  render() {
    const { checked } = this.state;

    return (
      <>
        <header>
          <div className="heroImg" alt="hero" src={hero}>
            <h1 className="TODO__Header">TODO</h1>
            <form>
              <Checkbox handleChange={this.handleChange} checked={checked} />
            </form>
          </div>
        </header>

        {/* <TodoList todos={todos} /> */}
      </>
    );
  }
}

export default App;
