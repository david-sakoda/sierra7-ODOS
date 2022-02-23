import { Collapse, Fab as FabComponent } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { motion } from "framer-motion";
type Props = {
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "default"
    | "success"
    | "error"
    | "info"
    | "warning";
  label: string;
  onClick: MouseEventHandler;
  text?: string;
  children: JSX.Element;
};

export const Fab = ({ color, label, onClick, text, children }: Props) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div animate={"show"} style={{display:"flex", justifyContent: "flex-end", marginRight: "24px"}}
    
    whileHover={{transition:{duration:1}}}
    transition={{ duration: 0.5 }}>
      <FabComponent
        color={color}
        aria-label={label}
        variant={hover ? "extended" : "circular"}
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        sx={{ transition: "" }}
      >
        {children} {hover && text}
      </FabComponent>
    </motion.div>
  );
};
