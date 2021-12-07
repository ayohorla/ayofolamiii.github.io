import React from 'react';

function Dashboard(props) {
    const handleLogout = () =>{
        props.history.push('/login');
    }
    return (
       <div>
           Welcome Admin!<br /><br/>
           <input type = "button" onClick = {handleLogout} value = "Logout" />
        </div> 
    );
}

export default Dashboard;