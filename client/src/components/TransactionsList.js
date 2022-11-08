import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
export default function TransactionsList({transactions,fetchTransactions,setEditTransaction}) {
  async function remove(_id){
    if(!window.confirm("Are You Sure")) return;
    const res=await fetch(`http://localhost:4000/transaction/${_id}`,{
      method:"DELETE",
    });
    if(res.ok){
      fetchTransactions();
      window.alert("Deleted Successfully");
    }
  };
  function  formatDate(date){
    return dayjs(date).format("DD-MMM,YYYY");
  }
  return (
    <>
    <Typography sx={{marginTop:10}} variant="h6">List of All Transactions</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow> 
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.amount}
              </TableCell> 
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{formatDate(row.date)}</TableCell>
              <TableCell align="center">
              <IconButton color="primary" component="label" onClick={()=>setEditTransaction(row)}>
        <EditSharpIcon/>
      </IconButton>
      <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
        <DeleteForeverSharpIcon  />
      </IconButton>
       
      </TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
