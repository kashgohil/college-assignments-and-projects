import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { validateYupSchema } from "formik";

export const LForm = props => {
  var {
    values: { email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          helperText={touched.email ? errors.email : ""}
          error={touched.email && Boolean(errors.email)}
          onChange={change.bind(null, "email")}
          value={email}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          helperText={touched.password ? errors.password : ""}
          error={touched.password && Boolean(errors.password)}
          onChange={change.bind(null, "password")}
          value={password}
          fullWidth
        />
        <br />
        <br />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
