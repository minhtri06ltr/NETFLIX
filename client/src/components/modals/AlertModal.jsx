import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { Close } from "@material-ui/icons";
import { useState } from "react";

const AlertModal = ({ message, type }) => {
  const [isOpen, setIsOpen] = useState(type ? true : false);

  return (
    <>
      <Alert
        style={{ fontWeight: 600, opacity: isOpen ? "1" : "0" }}
        variant="outlined"
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </>
  );
};

export default AlertModal;
