import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue, purple } from "@material-ui/core/colors";

const useStyles = makeStyles({
  // to make it  dainamic = change the colors in card by the not catg
  avatar: {
    backgroundColor: (student) => {
      if (student.whereFindJob == "Facebook") {
        return yellow[700];
      }
      if (student.whereFindJob == "LinkedIn") {
        return green[500];
      }
      if (student.whereFindJob == "Friend") {
        return pink[500];
      }
      if (student.whereFindJob == "Company website") {
        return purple[500];
      }
      return blue[500];
    },
  },
});

export default function PostCard({ student }) {
  const classes = useStyles(student);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {student.studentName[0].toUpperCase()}
            </Avatar>
          }
          //   action={<DeleteOutlined />}
          title={student.studentName}
          subheader={student.email}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Company Name: {student.companyName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Role: {student.role}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Location: {student.location}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
