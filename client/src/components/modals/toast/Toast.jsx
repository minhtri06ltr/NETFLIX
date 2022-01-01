import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";

import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
const Toast = ({ info, open, setOpen }) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return info === null ? null : (
    <Snackbar
      open={open}
      TransitionComponent={function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={info.type}
        sx={{ width: "100%" }}
      >
        {info.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
