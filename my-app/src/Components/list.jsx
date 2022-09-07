import { Typography, Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


const List = () => {
 
 const [student, setStudent] = useState([]);

 useEffect(() => {
  async function getAllStudent() {
   try {
    const student = await axios.get("http://localhost:3000/student")
     console.log(student.data);
    setStudent(student.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllStudent();
 }, [])


 const handleDelete = async id => {
  await axios.delete(`http://localhost:3000/student/${id}`);
  const newstudent = student.filter((item) => {
   console.log(item);
   return item.id !== id;
  })
  setStudent(newstudent);
 }
 useEffect(() => {
    localStorage.setItem('student', JSON.stringify(student));
  }, [student]);

  



 return (
  <>
   <Box textAlign="center" p={2} >
    <Typography variant="h4">Student List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "hotpink" }}>
       <TableCell align="center" >No</TableCell>
       <TableCell align="center" >Name</TableCell>
       <TableCell align="center" >Email</TableCell>
       <TableCell align="center" >Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {
       student.map((student, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <TableCell align="center">{student.stdname}</TableCell>
          <TableCell align="center">{student.email}</TableCell>
          <TableCell align="center">
           <Tooltip title="View">
            <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(student.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default List;





