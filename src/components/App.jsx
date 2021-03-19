import React,{useState} from "react";
import Header from "./Header";
import StudentTable from "./StudentTable";
import TableFilter from "./TableFilter";
// import StudentDetail from "./StudentDetail"
function App(){
    return(
        <div>
            <Header />
            <TableFilter />
            <StudentTable />
        </div>
    )
}

export default App;