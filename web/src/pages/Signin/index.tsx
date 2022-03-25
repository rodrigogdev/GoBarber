import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { FormHandles } from "@unform/core";
import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import getValidationErros from "../../utils/getValidationErrors";
import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";

interface SignInFormData {
  email: string;
  password: string;
}

interface ObjectUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  user_type: string;
}

function SignIn() {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Required e-mail")
            .email("Enter an valid e-mail address."),
          password: Yup.string().required("Required password."),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Authenticate error.",
          description:
            "There is an error trying to authenticate, check your credentials.",
        });
      }
    },
    [signIn, addToast, navigate],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Logon</h1>

            <Input name="email" icon={FiMail} placeholder="e-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="password"
            />

            <Button type="submit">Login</Button>

            <Link to="/forgot-password">Forgot my password</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Create Account
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;
