import React from "react";
import { useTransition } from "react-spring";
import { ToastMessage } from "../../hooks/Toast";

import Toast from "./Toast";
import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    keys: (message) => message.id,
    from: { right: "-120%" },
    enter: { right: "0%" },
    leave: { right: "-120%" },
  });
  return (
    <Container>
      {messagesWithTransitions((style, item, t) => (
        <Toast key={t.key} style={style} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
