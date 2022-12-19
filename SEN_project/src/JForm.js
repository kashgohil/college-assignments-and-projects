import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { validateYupSchema } from "formik";
import "./JForm.css";

export const JForm = props => {
  var {
    values: {
      title,
      salary,
      cpi,
      skills,
      experience,
      work,
      hires,
      perks,
      wcpi,
      wskills,
      wtest,
      wexperience,
      deadline,
      startdate,
      starttime,
      enddate,
      endtime
    },
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
          id="title"
          name="title"
          label="Job title"
          helperText={touched.title ? errors.title : ""}
          error={touched.title && Boolean(errors.title)}
          onChange={change.bind(null, "title")}
          value={title}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="salary"
          name="salary"
          label="What is the annual salary for this job?(in $)"
          helperText={touched.salary ? errors.salary : ""}
          error={touched.salary && Boolean(errors.salary)}
          onChange={change.bind(null, "salary")}
          value={salary}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="cpi"
          name="cpi"
          label="What is the minimum CPI the candidate must have?"
          helperText={touched.cpi ? errors.cpi : ""}
          error={touched.cpi && Boolean(errors.cpi)}
          onChange={change.bind(null, "cpi")}
          value={cpi}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="skills"
          name="skills"
          label="Describe the skills you want in your employee."
          helperText={touched.skills ? errors.skills : ""}
          error={touched.skills && Boolean(errors.skills)}
          onChange={change.bind(null, "skills")}
          value={skills}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="experience"
          name="experience"
          label="Describe the experience the candidate should have."
          helperText={touched.experience ? errors.experience : ""}
          error={touched.experience && Boolean(errors.experience)}
          onChange={change.bind(null, "experience")}
          value={experience}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="work"
          name="work"
          label="Describe the work the candidate is supposed to perform."
          helperText={touched.work ? errors.work : ""}
          error={touched.work && Boolean(errors.work)}
          onChange={change.bind(null, "work")}
          value={work}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="hires"
          name="hires"
          label="How many hires?"
          helperText={touched.hires ? errors.hires : ""}
          error={touched.hires && Boolean(errors.hires)}
          onChange={change.bind(null, "hires")}
          value={hires}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="perks"
          name="perks"
          label="Perks and benefits"
          helperText={touched.perks ? errors.perks : ""}
          error={touched.perks && Boolean(errors.perks)}
          onChange={change.bind(null, "perks")}
          value={perks}
          fullWidth
        />
        <br />
        <br />
        <h4 id="yet">Describe the weightage you want for each section.</h4>
        <div id="heno">
          <div id="nomoret1">
            <TextField
              id="wcpi"
              name="wcpi"
              label="CPI"
              helperText={touched.wcpi ? errors.wcpi : ""}
              error={touched.wcpi && Boolean(errors.wcpi)}
              onChange={change.bind(null, "wcpi")}
              value={wcpi}
            />
          </div>
          <div id="nomoret2">
            <TextField
              id="wskills"
              name="wskills"
              label="Skills"
              helperText={touched.wskills ? errors.wskills : ""}
              error={touched.wskills && Boolean(errors.wskills)}
              onChange={change.bind(null, "wskills")}
              value={wskills}
            />
          </div>
          <div id="nomoret3">
            <TextField
              id="wtest"
              name="wtest"
              label="Test-score"
              helperText={touched.wtest ? errors.wtest : ""}
              error={touched.wtest && Boolean(errors.wtest)}
              onChange={change.bind(null, "wtest")}
              value={wtest}
            />
          </div>
          <div id="nomoret4">
            <TextField
              id="wexperience"
              name="wexperience"
              label="Experience"
              helperText={touched.wexperience ? errors.wexperience : ""}
              error={touched.wexperience && Boolean(errors.wexperience)}
              onChange={change.bind(null, "wexperience")}
              value={wexperience}
            />
          </div>
        </div>
        <br />
        <h4 id="yet">
          Describe when you want to conduct the test and also the deadline for
          the application.
        </h4>

        <br />
        <div>
          <div id="ll1">
            <TextField
              id="deadline"
              label="Deadline"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
              helperText={touched.deadline ? errors.deadline : ""}
              error={touched.deadline && Boolean(errors.deadline)}
              onChange={change.bind(null, "deadline")}
              value={deadline}
            />
          </div>
          <div id="ll2">
            <TextField
              id="startdate"
              label="Start-date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
              helperText={touched.startdate ? errors.startdate : ""}
              error={touched.startdate && Boolean(errors.startdate)}
              onChange={change.bind(null, "startdate")}
              value={startdate}
            />
          </div>
          <div id="ll3">
            <TextField
              id="starttime"
              label="Start-time"
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              defaultValue="07:30"
              helperText={touched.starttime ? errors.starttime : ""}
              error={touched.starttime && Boolean(errors.starttime)}
              onChange={change.bind(null, "starttime")}
              value={starttime}
            />
          </div>
          <div id="ll4">
            <TextField
              id="enddate"
              label="End-date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
              helperText={touched.enddate ? errors.enddate : ""}
              error={touched.enddate && Boolean(errors.enddate)}
              onChange={change.bind(null, "enddate")}
              value={enddate}
            />
          </div>
          <div id="ll5">
            <TextField
              id="endtime"
              label="End-time"
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              defaultValue="07:30"
              helperText={touched.endtime ? errors.endtime : ""}
              error={touched.endtime && Boolean(errors.endtime)}
              onChange={change.bind(null, "endtime")}
              value={endtime}
            />
          </div>
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
            Post job
          </Button>
        </div>
      </form>
    </div>
  );
};
