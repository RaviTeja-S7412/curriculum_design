/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { get_courses, update_course, add_course, delete_course } from "actions/courses.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
/**
 * @author
 * @function Programs
 * */

const Displaycourses = () => {
  const dispatch = useDispatch();
  const get_all_courses = useSelector((state) => state.courses);

  const all_courses = get_all_courses !== "" ? get_all_courses.courses : "";
  const course_data = [];
  if (all_courses) {
    all_courses.forEach((element) => {
      course_data.push({
        course_name: element.course_name,
        course_short_code: element.course_short_code,
        min_credits: element.min_credits,
        max_credits: element.max_credits,
        id: element.id,
      });
    });
  }
  console.log("in");
  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_courses.get_data) {
      dispatch(get_courses());
    } else {
      setData(course_data);
    }
  }, [all_courses]);
  const [columns, setColumns] = useState([
    { title: "Course Name", field: "course_name" },
    { title: "Course Short Code", field: "course_short_code" },
    { title: "Min Credits", field: "min_credits" },
    { title: "Max Credits", field: "max_credits" },
    { field: "hidden", editable: "never" },
  ]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
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
                    Courses Table
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
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            setData([...data, newData]);
                            // setColumns(...columns);
                            const add_data = new FormData();
                            add_data.append("course_name", newData.course_name);
                            add_data.append("course_short_code", newData.course_short_code);
                            add_data.append("min_credits", newData.min_credits);
                            add_data.append("max_credits", newData.max_credits);

                            dispatch(add_course(add_data));
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;

                            const update_data = new FormData();
                            update_data.append("course_name", newData.course_name);
                            update_data.append("course_short_code", newData.course_short_code);
                            update_data.append("min_credits", newData.min_credits);
                            update_data.append("max_credits", newData.max_credits);
                            update_data.append("id", newData.id);
                            dispatch(update_course(update_data));
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            // setColumns([...columns]);

                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            const delete_data = new FormData();

                            delete_data.append("id", oldData.id);
                            dispatch(delete_course(delete_data));
                            resolve();
                          }, 1000);
                        }),
                    }}
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

export default Displaycourses;
