import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useState, useEffect} from 'react'
import Rows from './Rows';


const covid_api_url = process.env.REACT_APP_COVID_API_URL

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function TheTable() {

  const [countries, setCountries] = useState([]);
  const classes = useStyles();

  async function fetchCountries() {
    //create headers
    let httpHeaders = {
      'Accept':'applications/json',
    }

    let headers = new Headers(httpHeaders)

    //create request
    let complete_url = covid_api_url + 'jhu-edu/latest?onlyCountries=true'
    let request = new Request(complete_url, {
      headers: headers,
      method: 'GET',
      mode: 'cors'
    })

    //fetch the news api
    try {
      const res = await fetch(request)
      res.json()
      .then((data) => {
        setCountries(data)
      })

    } catch {
      //@TODO implement catch error
    }
  }


  useEffect(()=>{
    try {
      fetchCountries()
    }catch(err){
      console.log(err.message)
    }

  })

  function sortTableBy(filter){
    let sortedCountries = countries.sort(function (a, b) {
      return b[filter] - a[filter];
    })
    // console.log(filter)
    // console.log(sortedCountries)
    return setCountries(sortedCountries);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell onClick={()=>{sortTableBy("confirmed")}} data-filter="confirmed" align="right">Infected</TableCell>
            <TableCell onClick={()=>{sortTableBy("recovered")}} data-filter="recovered" align="right">Recovered</TableCell>
            <TableCell onClick={()=>{sortTableBy("deaths")}}    data-filter="deaths" align="right">Decease</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Rows countries={countries} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TheTable
