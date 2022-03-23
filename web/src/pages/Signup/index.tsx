/* eslint-disable react/jsx-no-bind */
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { FiMail, FiLock, FiUser, FiArrowLeft, FiImage } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import getValidationErros from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  user_type: string;
  avatar: FormData;
}

function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [image, setImage] = useState<FormData>();
  const [type, setType] = useState<string>("");
  const [isFocusedOne, setIsFocusedOne] = useState(false);
  const [isFocusedTwo, setIsFocusedTwo] = useState(false);

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleFocusedOne = useCallback(() => {
    setIsFocusedOne(true);
    setIsFocusedTwo(false);
  }, []);

  const handleFocusedTwo = useCallback(() => {
    setIsFocusedTwo(true);
    setIsFocusedOne(false);
  }, []);

  const handleChangeAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append("avatar", e.target.files[0]);
      setImage(data);
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "No mínimo 6 digitos"),
        });

        await schema.validate(data, { abortEarly: false });

        image?.append("name", data.name);
        image?.append("email", data.email);
        image?.append("password", data.password);
        image?.append("user_type", type);

        await api.post("/users", image);

        navigate("/");

        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Você já pode fazer seu Logon",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro no cadastro",
          description: "Ocorreu um erro ao fazer cadastro, tente novamente.",
        });
      }
    },
    [addToast, navigate, image, type],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer
          isFocusedOne={isFocusedOne}
          isFocusedTwo={isFocusedTwo}
        >
          <img src={logoImg} alt="GoBarber" />

          <h1>Faça seu Cadastro</h1>

          <div className="radio" onChange={handleChangeType}>
            <label className="client" htmlFor="rbutton">
              <input
                id="rbutton"
                type="radio"
                name="nametype"
                value="client"
                defaultChecked
                onFocus={handleFocusedOne}
              />
              <i>I am Client</i>
            </label>
            <label className="provider" htmlFor="rbutton2">
              <input
                id="rbutton2"
                type="radio"
                name="nametype"
                value="provider"
                onFocus={handleFocusedTwo}
              />
              <i>I am Provider</i>
            </label>
          </div>

          <Form
            encType="multipart/form-data"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input
              id="oi"
              name="avatar"
              icon={FiImage}
              type="file"
              accept="image/*"
              onChange={handleChangeAvatar}
              placeholder="Picture"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default SignUp;
