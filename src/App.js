import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Input } from '@mui/joy';



import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [data1, setData1] = useState([]);

  useEffect(() => {
    // setData(1);
    fetch("https://openlibrary.org/search.json?author=tolkien&sort=new")
      .then((res) => res.json())
      .then((mm) => setData(mm.docs));
  }, []);
  // console.log(data);

  const handle = (e) => {
    const inputSearch = e.target.value;
    setVal(inputSearch);

    console.log(data[0]);
  };
  const submitInput = (e) => {
    e.preventDefault();
    setData1([]);
    if (data.length > 0) {
      data.filter((data) => {
        if (
          Object.values(data).join("").toLowerCase().includes(val.toLowerCase())
        ) {
          console.log(data);

          setData1((data1) => [...data1, data]);
        } else {
          console.log("data does not get");
        }
      });
    }
  };
  

  return (
    <div className="App">
      {/* <div className="container ">
  <form className="d-flex" onSubmit={submitInput}>
    <input
      type="text"
      className="form-control me-2"
      placeholder="Enter search term"
      onChange={handle}
    />
    <button type="submit" className="btn btn-primary">
      Search
    </button>
  </form>
</div> */}

      <div className="input-div pl p-5 input-div">
        <form className="p-3" onSubmit={submitInput}>
          {/* <input type="text" className="  mb-3 me-3" onChange={handle} /> */}
          <Input
          className="input"
          onChange={handle}
  placeholder="search your book"
  sx={{  width: 700, bgcolor: "#b1aaa1a8",color:"white" }}
/>
          <button type="submit" className=" p-2 bt  btn btn-primary">
            Enter
          </button>
        </form>
      </div>

      
       {/* {
        data.length > 0 &&(
          <>
          <div className="box d-flex">
            <h2>{data[0].title}</h2>
            </div>
            <div className="box">
            <h2>{data[0].title}</h2>
            </div></>
        )
       } */}
       
     
       <div className="container-fluid">
  <div className="row">
    {data1.length > 0 &&
      data1.map((data, index) => (
        <div
          className=" col-12 col-md-6 d-flex align-items-center justify-content-center mb-3"
          key={index}
        >
          <div className="box p-3">
            <h2>{data.title ? data.title : "No Data"}</h2>
            {/* Uncomment if you want to display authors */}
            {/* <p>{data.author_name && data.author_name.join(", ")}</p> */}
          </div>
        </div>
      ))}
  </div>
</div>


     
    </div>
  );
}

export default App;
