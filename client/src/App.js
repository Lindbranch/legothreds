import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const api = axios.create({
    baseURL: "http://localhost:4000/threds/",
    //baseURL: "https://jsonplaceholder.typicode.com/posts/",
  });

  const [threds, setThreds] = useState();

  useEffect(() => {
    api.get().then((res) => {
      const responseThreds = res.data;
      setThreds(responseThreds);
    });
  }, []);

  return (
    <div className="App">
      {threds &&
        threds.map((thred) => {
          const { thred_title } = thred;

          return (
            <>
              <p> hej ja ghetar var  </p>
            </>
          );
        })}
    </div>
  );
}

export default App;
