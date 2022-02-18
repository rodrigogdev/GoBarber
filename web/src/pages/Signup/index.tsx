/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useRef } from "react";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
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
}

function SignUp() {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const navigate = useNavigate();

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

				await api.post("/users", data);

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
		[addToast, navigate],
	);
	return (
		<Container>
			<Background />
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />

					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu Cadastro</h1>

						<Input name="name" icon={FiUser} placeholder="Nome" />
						<Input name="email" icon={FiMail} placeholder="E-mail" />

						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="Senha"
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
