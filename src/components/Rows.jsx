import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {useState, useEffect} from 'react'

export default function Rows(props){



  useEffect(()=>{
    // console.log('updated');
  });



  return (
    <React.Fragment>
    {props.countries.map(row => (
      <TableRow key={row.countryregion}>
        <TableCell component="th" scope="row">
          {row.countryregion}
        </TableCell>
        <TableCell align="right">{row.confirmed}</TableCell>
        <TableCell align="right">{row.recovered}</TableCell>
        <TableCell align="right">{row.deaths}</TableCell>
      </TableRow>
      ))}
    </React.Fragment>
  )
}