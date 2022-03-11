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
  get_programs,
  update_program,
  add_program,
  delete_program,
} from "actions/programs.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
/**
 * @author
 * @function Programs
 * */

const Displayprograms = () => {
  const dispatch = useDispatch();
  const get_all_programs = useSelector((state) => state.programs);

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

  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_programs.get_data) {
      dispatch(get_programs());
    } else {
      setData(program_data);
    }
  }, [all_programs]);
  const [columns, setColumns] = useState([
    { title: "Program Name", field: "program_name" },
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
                    Programs Table
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
                            add_data.append("program_name", newData.program_name);

                            dispatch(add_program(add_data));
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;

                            const update_data = new FormData();
                            update_data.append("program_name", newData.program_name);
                            update_data.append("id", newData.id);
                            dispatch(update_program(update_data));
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
                            dispatch(delete_program(delete_data));
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

export default Displayprograms;
