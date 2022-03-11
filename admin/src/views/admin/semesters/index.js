/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import {
  get_semesters,
  update_semester,
  add_semester,
  delete_semester,
} from "actions/semesters.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
/**
 * @author
 * @function Programs
 * */

const Displaysemesters = () => {
  const dispatch = useDispatch();
  const get_all_semesters = useSelector((state) => state.semesters);

  const all_semesters = get_all_semesters !== "" ? get_all_semesters.semesters : "";
  const semester_data = [];
  if (all_semesters) {
    all_semesters.forEach((element) => {
      semester_data.push({
        semester_name: element.semester_name,
        id: element.id,
      });
    });
  }

  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_semesters.get_data) {
      dispatch(get_semesters());
    } else {
      setData(semester_data);
    }
  }, [all_semesters]);
  const [columns, setColumns] = useState([
    { title: "Semester Name", field: "semester_name" },
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
                    Semesters Table
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
                            add_data.append("semester_name", newData.semester_name);

                            dispatch(add_semester(add_data));
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;

                            const update_data = new FormData();
                            update_data.append("semester_name", newData.semester_name);
                            update_data.append("id", newData.id);
                            dispatch(update_semester(update_data));
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
                            dispatch(delete_semester(delete_data));
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

export default Displaysemesters;
