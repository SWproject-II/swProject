import React from "react";
import { Button }  from "@mui/material";

const LoanReturn = () => {


  const handleLoan = () => {

    
    

  }

  const handleReturn = () => {
    
  }


  return (
    <div>
      <h1>Loan or return a board game</h1>
      <p>
        You can loan a board game here or return one. 
      </p>
      <Button variant="contained" color="success" onPress={handleLoan}>Loan</Button>
      <Button variant="contained" color="error" onPress={handleReturn}>Return</Button>
    </div>
  );
};

export default LoanReturn;