import React, { useState, useEffect } from "react";
import axios from "axios";

/* 
    Component Life Cycle
      1. Mounting (Birth)
      2. Update (growth)
      3. Unmount (Death of component)

    Methods in LC
      1. render() - used to render HTML of comp in reactJS. Invoked during mounting/updating. One can't modify state inside it.
      2. componentDidMount() : After render() rendered to the DOM.
      3. componentDidUpdate(): invoked as soon as updating happens. prop/state changes
      4. componentWillMount() : is called just before the component is unmount and destroyed. Perform cleanups.
    
    Notes:
      1. constructor is a part of JS. called before render()
      2. Update can have new page, new prop, forceUpdate()

    React HOOKs
      - Feature of RCC in RFC.
      - allows to use readt feature w/o a class.
      - Hooks are the functions which "hook into" React state and LC features from function components.

    Commonly used react hooks
      1. useState : 
      2. useEffect : performs side effects when component updates
      3. useContext : context API makes props available in the children components.
      4. useRef : mutuable object. DOm element exists in .current. Useful to tag JSX

*/
const MyComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make the API request inside the useEffect hook
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((response) => {
        console.log(response);
        setData(response.data.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to execute the effect only once

  return (
    <div>
      {/* Render the fetched data */}
      Hello
      {console.log(">>> ", data)}
      {data.length > 0 && data.map((item) => <p key={item.first_name}>{item.last_name}</p>)}
    </div>
  );
};

export default MyComponent;
