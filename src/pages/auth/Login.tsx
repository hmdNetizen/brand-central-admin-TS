import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import CustomOutlinedInput from "src/utils/CustomOutlinedInput";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTitle from "src/hooks/useTitle";
import {
  Container,
  Heading,
  LoginBox,
  StyledButton,
  ErrorMsg,
  ErrorsList,
  StyledCircularProgress,
  SuccessMsg,
  SuccessMsgWrapper,
} from "src/components/auth/styles/LoginStyles";

export type CredentialProps = {
  email: "";
  password: "";
};

const Login = () => {
  useTitle("Admin : Login");

  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  //   MEDIA QUERIES
  const matchesSM = useMediaQuery(theme.breakpoints.only("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [credentials, setCredentials] = useState<CredentialProps>({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = credentials;

  const { loading, loginSuccess, error, accessToken } = useTypedSelector(
    (state) => state.auth
  );

  const { login } = useActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleToggleShowPassword = (): void => {
    setShowPassword((prev: React.SetStateAction<boolean>) => !prev);
  };

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!email && !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      return;
    }

    const path = location.state?.from?.pathname || "/dashboard";

    login({
      navigate,
      path,
      setCredentials,
      Email: email,
      password,
    });
  };

  if (accessToken && !loginSuccess) return <Navigate to="/dashboard" />;

  return (
    <Container
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <LoginBox item component="form" onSubmit={handleLogin}>
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            style={{ marginBottom: "2rem" }}
          >
            <Grid item>
              <Heading variant="h2">Login</Heading>
            </Grid>
          </Grid>
          {!loading && error && (
            <ErrorsList item>
              <ErrorMsg variant="body1" component="p" color="error">
                {error}
              </ErrorMsg>
            </ErrorsList>
          )}
          {!loading && loginSuccess && (
            <SuccessMsgWrapper item>
              <SuccessMsg variant="body2" align="center">
                {loginSuccess}
              </SuccessMsg>
            </SuccessMsgWrapper>
          )}
          <Grid item container style={{ marginBottom: "2rem" }}>
            <CustomOutlinedInput
              placeholder="abc@example.com"
              name="email"
              type="email"
              formControlWidth={matchesXS ? "100%" : matchesSM ? 400 : 500}
              value={email}
              onChange={handleChange}
              label="Email Address"
              labelId="email"
              error={emailError}
            />
          </Grid>
          <Grid item container style={{ marginBottom: "3rem" }}>
            <CustomOutlinedInput
              placeholder="xxxxxxxxxxx"
              type={showPassword ? "text" : "password"}
              name="password"
              formControlWidth={matchesXS ? "100%" : matchesSM ? 400 : 500}
              value={password}
              onChange={handleChange}
              label="Password"
              labelId="password"
              error={passwordError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleToggleShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item container>
            <StyledButton
              type="submit"
              variant="contained"
              disableRipple
              disabled={loading}
            >
              {loading && (
                <StyledCircularProgress style={{ height: 25, width: 25 }} />
              )}{" "}
              Login
            </StyledButton>
          </Grid>
        </Grid>
      </LoginBox>
    </Container>
  );
};

export default Login;
