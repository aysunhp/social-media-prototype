import React, { memo } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };
const Login = ({
  users,
  user,
  dispatch,
  email,
  password,
  authenticated,
  setAuthenticated,
}) => {
  const navigate = useNavigate();
  console.log(user);
  console.log(users);
  console.log(email);
  console.log(password);
  console.log(authenticated);
  return (
    <>
      <div className="container">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
            paddingRight: "160px",
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                dispatch({ email: e.target.value, type: "checkEmail" });
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
            ]}
          >
            <Input.Password
              onChange={(e) => {
                dispatch({ password: e.target.value, type: "checkPass" });
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
              style={{ display: "block", margin: "0px auto", width: "30%" }}
              htmlType="submit"
              onClick={() => {
                let found = users.find(
                  (item) => item.email == email && item.password == password
                );
                console.log(found);
                dispatch({ user: found, type: "getUser" });

                {
                  found
                    ? (localStorage.setItem("user", JSON.stringify(found)),
                      setAuthenticated(true),
                      navigate("/"))
                    : alert("Invalid email or password!");
                }
              }}
            >
              Sign in
            </Button>
            <p style={{ textAlign: "center" }}>
              Don't you have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Create an account
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default memo(Login);
