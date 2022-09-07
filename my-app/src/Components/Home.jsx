import { Typography, Box,Grid, TextField, Button} from '@mui/material';
import List from "./list";
import axios from "axios";
import { useState ,useEffect } from "react";



const Home = () => {
 
 const [student, setStudent] = useState({
  stdname: "",
  email: "",
  
 });
 const [status, setStatus] = useState();


 function onTextFieldChange(e) {
    
        setStudent({
            ...student,
            [e.target.name]: e.target.value
           })



    
//   setStudent({
//    ...student,
//    [e.target.name]: e.target.value
//   })
 }
     
    

 async function onFormSubmit(e) {
  e.preventDefault()
  if(student.stdname!==""&& student.email!==""){
   
   try {
   await axios.post(`http://localhost:3000/student`, student)
   setStatus(true);
  
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 else{
    alert("Input Field cannot be Empty");
 }}
 

 useEffect(() => {
   localStorage.setItem('student', JSON.stringify(student));
 }, [student]);

 
 
 

 if (status) {
  return <Home />
 }
 return (
  <>
   <Box textAlign="center" bgcolor={"pink"} p={2} mb={2}>
    <Typography variant="h2">React CRUD with API Call</Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2}  mb={2}>
      <Typography variant="h4">Add Student</Typography>
     </Box>
     <form noValidate>
      <Grid container spacing={2}>
       <Grid item xs={12} >
        <TextField autoComplete="stdname" name="stdname" variant="outlined" required fullWidth id="stdname" label="Name"  error={student.stdname===""} onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" error={student.email===""} onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
      </Box>
     </form>
    </Grid>

    <Grid item md={6} xs={12}>
     <List />
    </Grid>
   </Grid>
  </>
 )
}

export default Home;