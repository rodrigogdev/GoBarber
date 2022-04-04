import React, { useCallback, useRef, useState } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
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

interface ForgotPasswordFormData {
  email: string;
}

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
        });

        await schema.validate(data, { abortEarly: false });

        // recuperacao de senha

        await api.post("/password/forgot", {
          email: data.email,
        });

        addToast({
          type: "success",
          title: "Recovery Password Email send.",
          description:
            "We send an email to confirm the password recovery. Check your mail box",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na recuperação de senha",
          description:
            "Ocorreu um erro ao tentar recuperar a senha, tente novamente.",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Back to Login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default ForgotPassword;
