import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    marginTop: "30px",
    padding: "10px 0px 10px 0",
    width: "100%",
    maxWidth: "36ch",
    height: "100%",
    maxHeight: "36ch"
  }
});

export default function TweetInsight(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      {Object.keys(props["tweets"]["insights"]).length > 0
        ? Object.keys(props["tweets"]["insights"]).map(value => (
            <Table
              className={classes.table}
            >
              <TableHead>
                <TableRow>
                  <TableCell>{ value }</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                      Object.keys(props["tweets"]["insights"][value]).map(deep_value => (
                        <TableRow>
                            <TableCell align="left">{deep_value}</TableCell>
                            <TableCell align="right">{props["tweets"]["insights"][value][deep_value]}</TableCell>
                        </TableRow>
                      ))
                  }
              </TableBody>
            </Table>
          ))
        : null}
    </TableContainer>
  );
}
