import React, { useCallback, useRef } from "react";
import { FiLock } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { FormHandles } from "@unform/core";
import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import getValidationErros from "../../utils/getValidationErrors";
import { useToast } from "../../hooks/Toast";
import api from "../../services/api";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

function ResetPassword() {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Password Required"),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match",
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const token = location.search.replace("?token=", "");

        if (!token) {
          throw new Error();
        }

        await api.post("/password/reset", {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        navigate("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Error trying to reset your password.",
          description:
            "Occurred an error trying to reset your password, try again.",
        });
      }
    },
    [addToast, navigate, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset password</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New Password"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirm Password"
            />

            <Button type="submit">Change Password</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default ResetPassword;
