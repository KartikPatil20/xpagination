import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((e)=> window.alert("‘failed to fetch data", e));
  }, [])


  const prevpage = () => {
    setPage(page - 1);
  }

  const nextpage = () => {
    if( page < data.length/10){
      setPage(page + 1);
    }else{
      setPage(1);
    }
  }

  return (
    <div className="App">
      <h1> Employee Data Table</h1>
      <table>
        <thead className='table_head'>
          <tr className='table_row'>
            <th className='head_data'>ID</th>
            <th className='head_data'>Name</th>
            <th className='head_data'>Email</th>
            <th className='head_data'>Role</th>
          </tr>
        </thead>
        <tbody className='table_body'>
            {
              data.slice(page*10-10,page*10).map((emp,i) => 
                <tr key={i}>
                  <td className='table_body'>{emp.id}</td>
                  <td className='table_body'>{emp.name}</td>
                  <td className='table_body'>{emp.email}</td>
                  <td className='table_body'>{emp.role}</td>
                </tr>
              )
            }
        </tbody>
      </table>
      <div className='pagination'>
        <button type='button' onClick={(e) => prevpage()} disabled = {page === 1 ? true : false}>Previous</button>
        <span className='page_number'>{page}</span>
        <button type='button' onClick={(e)=> nextpage()} disabled = {page === Math.round(data.length/10) ? true : false}>Next</button>
      </div>
    </div>
  );
}

export default App;