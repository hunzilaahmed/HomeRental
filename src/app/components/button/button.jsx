import React from "react";
import Button from "@mui/material/Button";

export default function button({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      sx={{
        position: "relative",
        px: 4,
        py: 1,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        transition: "all 0.3s ease-out",
        backgroundColor: disabled ? "gray" : "#99915e",
        color: "white", 
        "&:hover": {
          backgroundColor: disabled ? "gray" : "#393623",
        },
        ...(disabled && {
          cursor: "not-allowed",
          opacity: 0.5,
        }),
      }}
    >
      <span>{children}</span>
    </Button>
  );
}
