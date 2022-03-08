/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-bind */
import React, { ChangeEvent, useCallback, useRef } from "react";
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, AvatarInput } from "./styles";
import getValidationErros from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";
import { useAuth } from "../../hooks/Auth";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

function Profile() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const handleChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          updateUser(response.data);

          addToast({
            type: "success",
            title: "Avatar Updated!",
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Name required"),
          email: Yup.string()
            .required("E-mail required")
            .email("Type a valid email"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val: any) => !!val.lenght,
            then: Yup.string().required("Required field"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val: any) => !!val.lenght,
              then: Yup.string().required("Required field"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password"), null], "Wrong Password Combination"),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put("/profile", formData);

        updateUser(response.data);

        navigate("/dashboard");

        addToast({
          type: "success",
          title: "Updated Profile!",
          description: "Your user profile informations was updated!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Error trying to update.",
          description: "Error trying to update your informations, try again.",
        });
      }
    },
    [addToast, navigate],
  );
  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleChangeAvatar} />
            </label>
          </AvatarInput>

          <h1>My Profile</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Current Password"
          />

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

          <Button type="submit">Confirm Changes</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default Profile;
