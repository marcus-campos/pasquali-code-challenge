import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    minWidth: '36ch',
    maxWidth: "36ch",
    maxHeight: "36ch",
  },
  tableWrapper: {
    width: '100%',
    margin: '20px 0',
  }
});

export default function TweetInsight(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      {Object.keys(props["tweets"]["insights"]).length
        ? Object.keys(props["tweets"]["insights"]).map(value => (
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{value}</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(props["tweets"]["insights"][value]).map(
                    deep_value => (
                      <TableRow>
                        <TableCell align="left">{deep_value}</TableCell>
                        <TableCell align="right">
                          {props["tweets"]["insights"][value][deep_value]}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          ))
        : null}
    </TableContainer>
  );
}
