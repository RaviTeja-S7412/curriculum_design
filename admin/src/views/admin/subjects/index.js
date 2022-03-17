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
  get_subjects,
  update_subject,
  add_subject,
  delete_subject,
} from "actions/subjects.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
/**
 * @author
 * @function Programs
 * */

const Displaysubjects = () => {
  const dispatch = useDispatch();
  const get_all_subjects = useSelector((state) => state.subjects);

  const all_subjects = get_all_subjects !== "" ? get_all_subjects.subjects : "";
  const subject_data = [];
  if (all_subjects) {
    all_subjects.forEach((element) => {
      subject_data.push({
        subject_name: element.subject_name,
        ideal_credits: element.ideal_credits,
        id: element.id,
      });
    });
  }

  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_subjects.get_data) {
      dispatch(get_subjects());
    } else {
      setData(subject_data);
    }
  }, [all_subjects]);
  const [columns, setColumns] = useState([
    { title: "Subject Name", field: "subject_name" },
    { title: "Ideal Credits", field: "ideal_credits" },
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
                    Subjects Table
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
                            add_data.append("subject_name", newData.subject_name);
                            add_data.append("ideal_credits", newData.ideal_credits);

                            dispatch(add_subject(add_data));
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;

                            const update_data = new FormData();
                            update_data.append("subject_name", newData.subject_name);
                            update_data.append("ideal_credits", newData.ideal_credits);
                            update_data.append("id", newData.id);
                            dispatch(update_subject(update_data));
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
                            dispatch(delete_subject(delete_data));
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

export default Displaysubjects;
