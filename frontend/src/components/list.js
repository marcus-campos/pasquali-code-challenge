import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 0px 10px 0",
    width: "100%",
    maxWidth: "36ch",
    height: "100%",
    maxHeight: "36ch",
    backgroundColor: theme.palette.background.paper,
    overflowY: "scroll"
  },
  inline: {
    display: "inline"
  },
  inlineError: {
    display: "inline"
  }
}));

export default function TweetList(props) {
  const classes = useStyles();
  
  return (
    <List className={classes.root}>
      
      {props["tweets"]["statuses"].length > 0 ? props["tweets"]["statuses"].map(tweet => (
        <Container>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Twitter user" src={tweet.user.profile_image_url_https} />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {tweet.user.name + ": "}
                  </Typography>
                  {tweet.text}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Container>
      )) : 
      <ListItem alignItems="center">
          <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inlineError}
                  >
                    { "Nenhum resultado encontrado..." }
                  </Typography>
                </React.Fragment>
              }
            />
      </ListItem>}
    </List>
  );
}
