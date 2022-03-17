/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { get_programLinks, add_programLinks } from "actions/program-course.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";

/**
 * @author
 * @function Programs
 * */

const Displayprogramlinks = (props) => {
  const dispatch = useDispatch();
  const get_all_programLinks = useSelector((state) => state.programLinks);
  const get_all_courses = useSelector((state) => state.courses);
  const get_all_programs = useSelector((state) => state.programs);

  const all_courses = get_all_courses && get_all_courses.courses;
  const all_programLinks = get_all_programLinks && get_all_programLinks.programLinks;
  const all_programs = get_all_programs !== "" ? get_all_programs.programs : "";

  const program_data = [];
  if (all_programs) {
    all_programs.forEach((element) => {
      program_data.push({
        program_name: element.program_name,
        id: element.id,
      });
    });
  }

  const courses_data = [];
  if (all_courses) {
    all_courses.forEach((element) => {
      courses_data.push({ id: element.id, course_name: element.course_name });
    });
  }

  const programLinks_data = [];
  if (all_programLinks) {
    all_programLinks.forEach((element) => {
      programLinks_data.push({
        program_name: element.program_name,
        courses: element.courses,
        course_ids: element.course_ids,
        id: element.id,
      });
    });
  }

  const [cid, setCid] = useState("");
  const [sids, setSids] = useState([]);

  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_programLinks.get_data) {
      dispatch(get_programLinks());
    } else {
      setData(programLinks_data);
    }
  }, [get_all_programLinks]);

  const [ref, setRef] = useState("add");
  const handleSubmit = () => {
    const add_data = new FormData();
    add_data.append("program", cid);
    add_data.append("course", JSON.stringify(sids));
    add_data.append("ref", ref);
    dispatch(add_programLinks(add_data));
    setCid("");
    setSids([]);
    setRef("add");
  };
  const [columns, setColumns] = useState([
    {
      title: "Program Name",
      field: "program_name",
    },
    {
      title: "Courses",
      field: "courses",
    },
    { field: "hidden", editable: "never" },
    { field: "hidden", editable: "never" },
  ]);

  const ITEM_HEIGHT = 80;
  const ITEM_PADDING_TOP = 15;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 300,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Card sx={{ mb: 5, mt: 0, p: 2 }}>
            <CardHeader title="Create Link" />
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Program</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Program"
                    value={cid}
                    onChange={(event) => {
                      setCid(event.target.value);
                    }}
                    sx={{ minHeight: 42 }}
                    MenuProps={MenuProps}
                  >
                    {program_data.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.id}
                        style={getStyles(name.program_name, name.program_name, theme)}
                      >
                        {name.program_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">Course</InputLabel>
                  <Select
                    multiple
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    label="Course"
                    value={sids}
                    sx={{ minHeight: 42 }}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setSids(
                        // On autofill we get a stringified value.
                        typeof value === "string" ? value.split(",") : value
                      );
                    }}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {courses_data.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={`${name.course_name}-${name.id}`}
                        style={getStyles(name.course_name, name.course_name, theme)}
                      >
                        {name.course_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <Button variant="contained" size="medium" onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Course To Program Links Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    options={{
                      exportButton: true,
                    }}
                    editable={{
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            const delete_data = new FormData();
                            delete_data.append("program", oldData.id);
                            delete_data.append("ref", "delete");
                            dispatch(add_programLinks(delete_data));
                            resolve();
                          }, 1000);
                        }),
                    }}
                    actions={[
                      {
                        icon: "edit",
                        tooltip: "Edit",
                        onClick: (event, rowData) => {
                          // eslint-disable-next-line no-restricted-globals
                          // scrollTo("top");
                          window.scrollTo({ behavior: "smooth", top: 0 });
                          setCid(rowData.id);
                          setSids(rowData.course_ids);
                          setRef("update");
                        },
                      },
                    ]}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
};

export default Displayprogramlinks;
