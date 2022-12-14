import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useEffect, useState} from 'react'
import { create } from '@mui/material/styles/createTransitions';


 const InitialForm = {
        amount: 0,
        description:"",
        date:new Date(),
      }
export default function TransactionForm({fetchTransactions,editTransaction}) {
   
    const [form, setForm] = useState(InitialForm);

useEffect(() => {
    if(editTransaction.amount!==undefined){
  setForm(editTransaction);
    }
}, [editTransaction])

  function handleDate(newValue){
        setForm({...form,date:newValue})
  }
  async function handleSubmit(e){
    e.preventDefault();
    editTransaction.amount===undefined ? create() : update();
  }
  function reload(res){
    if(res.ok){
      setForm(InitialForm);
       fetchTransactions();
    }
  }
  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  };

    async function create(){
      const res= await fetch("http://localhost:4000/transaction",{
        method:"POST",
        body: JSON.stringify(form),
        headers:{
          'content-type':"application/json"
        }
      });
      reload(res);
    }
    async function update(){
      const res= await fetch(`http://localhost:4000/transaction/${editTransaction._id}`,{
        method:"PATCH",
        body: JSON.stringify(form),
        headers:{
          'content-type':"application/json"
        }
      });
      reload(res);
    }
  return (
    <Card sx={{ minWidth: 275,marginTop:10 }}>
      <CardContent>
         <Typography variant="h6">
          Add New Transaction
        </Typography> 
        <form onSubmit={handleSubmit}>
           
        <TextField sx={{marginRight:5}} name="amount" size="small" value={form.amount} onChange={handleChange} id="outlined-basic" label="Amount" variant="outlined" />
        <TextField sx={{marginRight:5}} name="description" size="small" value={form.description} onChange={handleChange} id="outlined-basic" label="Description" variant="outlined" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Transaction Date"
          inputFormat="MM/DD/YYYY"
          value={form.date} 
          
          onChange={handleDate}
          renderInput={(params) => <TextField size="small" sx={{marginRight:5}} {...params} />}
        />
            </LocalizationProvider>
            {
                editTransaction.amount!==undefined && 
                (<Button type="submit" variant="secondary">Update</Button>                
                )
            }
            {
                editTransaction.amount===undefined &&(
                <Button type="submit" variant="contained">Submit</Button>
                )
            }
        </form>
       
      </CardContent>
    </Card>
  );
}
