import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import Card from "../Layout/Card";
import { useState } from "react";
import PromptCard from "../Layout/PromptCard";
import { useNavigate } from "react-router";
import { updateUser } from '../Redux/slices/currentUser'
import { useDispatch } from 'react-redux';


export default function SignIn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState();

  const validate = (e) => {
    e.preventDefault();
    const user = props.users.filter((user) => {
      return user.email === e.target.email.value;
    })[0]

    if (user == null) {
      setMsgPrompt("fail");
    } else if (user.failedAttempts >= 3) {
      setMsgPrompt("block", user.name);
    } else if (user.password === e.target.password.value) {
      dispatch(updateUser(user.name));
      setMsgPrompt("success");
    } else {
      user.failedAttempts++;
      props.failedAttempt(user)
      setMsgPrompt("fail");
    }
  }


  const setMsgPrompt = (msgType, user = null) => {
    if (msgType === "success") {
      setMsg(<PromptCard class={"primary"} body={"User successfully logged in."} />)
      setTimeout(() => {
        props.setUserLoginFlag(true);
        navigate('/blogs');
      }
        , 1500);

    } else if (msgType === "fail") {
      setMsg(<PromptCard class={"secondary"} body={"Invalid credentials."} />)
    } else {
      setMsg(<PromptCard class={"danger"} body={user + " has been block due to too many invalid attempts."} />)
    }
  }

  return (
    <>
      <Card title={"Welcome back!"} maxWidth={"50%"}>
        <Form className="text-dark" onSubmit={validate}>
          <Stack>
            <Form.Group>
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="password" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Form.Group>
            <Button className="mt-2" type="submit" variant="dark">Sign in</Button>
          </Stack>
        </Form>
      </Card>
      {msg}
    </>
  );
}
