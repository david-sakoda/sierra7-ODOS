import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { MouseEventHandler, SetStateAction } from "react";

type DialogButtonType = {
  text: string;
  autoFocus: boolean;
  onClickFunction?: MouseEventHandler;
};

type Props = {
  title: string;
  content: string;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  actions: DialogButtonType[];
};

export const ModalDialog = ({
  title,
  content,
  setIsOpen,
  isOpen,
  actions,
}: Props) => {
  const handleClose = () => {
    setIsOpen.call(null, false);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action, index) => {
          const onClick = action.onClickFunction
            ? action.onClickFunction
            : handleClose;
          return action.autoFocus ? (
            <Button onClick={onClick} autoFocus key={index}>
              {action.text}
            </Button>
          ) : (
            <Button onClick={onClick} key={index}>
              {action.text}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
};
