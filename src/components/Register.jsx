import React, { memo } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({
  dispatch,
  rEmail,
  rFullName,
  rPassword,
  rPhone,
  rBio,
  newUser,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          style={{
            maxWidth: 1000,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
            paddingRight: "200px",
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
              {
                min: 6,
                message: "Full Name must be at least 6 characters long",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                dispatch({ rFullName: e.target.value, type: "setFullName" });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                dispatch({ rEmail: e.target.value, type: "setEmail" });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
              {
                min: 13,
                message: "Phone number must be at least 13 characters long",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                dispatch({ rPhone: e.target.value, type: "setPhone" });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
              {
                pattern: /(?=.*\d)(?=.*[A-Z])/,
                message:
                  "Password must contain at least one uppercase letter and one number",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                dispatch({ rPassword: e.target.value, type: "setPass" });
              }}
            />
          </Form.Item>

          <Form.Item
            label="About"
            name="bio"
            rules={[
              {
                required: true,
                message: "Please input your Bio!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                dispatch({ rBio: e.target.value, type: "setBio" });
              }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              style={{ display: "block", margin: "auto", width: "15%" }}
              htmlType="submit"
              onClick={() => {
                let obj = {
                  fullName: rFullName,
                  email: rEmail,
                  about: rBio,
                  phoneNumber: rPhone,
                  password: rPassword,
                };
                dispatch({
                  newUser: obj,
                  type: "setNewUser",
                });

                axios.post(" http://localhost:8000/users", obj);

                navigate("/login");
              }}
            >
              Sign up
            </Button>
            <p style={{ textAlign: "center" }}>
              Already have an account?
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default memo(Register);
