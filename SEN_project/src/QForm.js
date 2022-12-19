import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { validateYupSchema } from "formik";

export const QForm = props => {
  var {
    values: { que, o1, o2, o3, o4, ans },
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
          id="que"
          name="que"
          label="Question"
          helperText={touched.que ? errors.que : ""}
          error={touched.que && Boolean(errors.que)}
          onChange={change.bind(null, "que")}
          value={que}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="o1"
          name="o1"
          label="Option 1"
          helperText={touched.o1 ? errors.o1 : ""}
          error={touched.o1 && Boolean(errors.o1)}
          onChange={change.bind(null, "o1")}
          value={o1}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="o2"
          name="o2"
          label="Option 2"
          type="o2"
          helperText={touched.o2 ? errors.o2 : ""}
          error={touched.o2 && Boolean(errors.o2)}
          onChange={change.bind(null, "o2")}
          value={o2}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="o3"
          name="o3"
          label="Option 3"
          type="o3"
          helperText={touched.o3 ? errors.o3 : ""}
          error={touched.o3 && Boolean(errors.o3)}
          onChange={change.bind(null, "o3")}
          value={o3}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="o4"
          name="o4"
          label="Option 4"
          type="o4"
          helperText={touched.o4 ? errors.o4 : ""}
          error={touched.o4 && Boolean(errors.o4)}
          onChange={change.bind(null, "o4")}
          value={o4}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="ans"
          name="ans"
          label="Answer"
          type="ans"
          helperText={touched.ans ? errors.ans : ""}
          error={touched.ans && Boolean(errors.ans)}
          onChange={change.bind(null, "ans")}
          value={ans}
          fullWidth
        />
        <br />
        <br />
        <br />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Add question
        </Button>
      </form>
    </div>
  );
};
