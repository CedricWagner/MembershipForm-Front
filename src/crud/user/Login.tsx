import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import PageTitle from "../../components/PageTitle/PageTitle";
import Waiting from "../../components/Waiting/Waiting";
import useLogin from "../../hooks/login";
import { useAuth } from "../../provider/AuthProvider";
import { TError } from "../../utils/types";
import Form from "./Form";
import TResource from "./type";

interface LoginViewProps {
  token: string | null;
  login: (item: Partial<TResource>) => any;
  error: TError;
  reset: () => void;
  loading: boolean;
}

const LoginView: FC<LoginViewProps> = ({ login, error, reset, loading }) => {
  return (
    <div data-testid="Login">
      <Container>
        <PageTitle>Se connecter</PageTitle>

        {loading && <Waiting isInline={false} />}
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

        <Form onSubmit={login} error={error} reset={reset} />
      </Container>
    </div>
  );
};

const Login = () => {
  const { token, loading, error, reset, login } = useLogin<TResource>();
  const navigate = useNavigate();

  const { token: authToken, setToken } = useAuth();

  useEffect(() => {
    if (token) {
      setToken(token);
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (authToken) {
      navigate("/");
    }
  }, [authToken]);

  return (
    <LoginView
      token={token}
      loading={loading}
      error={error}
      reset={reset}
      login={login}
    />
  );
};

export default Login;
