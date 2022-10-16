import { useState } from "react";
import { BiShare } from "react-icons/bi";
import Button from "../base/Button";

export default function ShareButton() {
  const [text, setText] = useState("Share");

  return (
    <Button
      style="secondary"
      size="md"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setText("Copied!");
        setTimeout(() => {
          setText("Share");
        }, 2000);
      }}
    >
      <BiShare />
      <span>{text}</span>
    </Button>
  );
}
