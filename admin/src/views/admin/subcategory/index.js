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
  get_subcategories,
  update_subcategory,
  add_subcategory,
  delete_subcategory,
} from "actions/subCategory.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
/**
 * @author
 * @function Programs
 * */

const Displaysubcategories = () => {
  const dispatch = useDispatch();
  const get_all_subcategories = useSelector((state) => state.subcategories);

  const all_subcategories = get_all_subcategories !== "" ? get_all_subcategories.subcategories : "";
  const subcategories_data = [];
  if (all_subcategories) {
    all_subcategories.forEach((element) => {
      subcategories_data.push({
        category_name: element.category_name,
        id: element.id,
      });
    });
  }

  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_subcategories.get_data) {
      dispatch(get_subcategories());
    } else {
      setData(subcategories_data);
    }
  }, [all_subcategories]);
  const [columns, setColumns] = useState([
    { title: "Subject Category Name", field: "category_name" },
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
                    Subject Categories Table
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
                            add_data.append("category_name", newData.category_name);

                            dispatch(add_subcategory(add_data));
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;

                            const update_data = new FormData();
                            update_data.append("category_name", newData.category_name);
                            update_data.append("id", newData.id);
                            dispatch(update_subcategory(update_data));
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
                            dispatch(delete_subcategory(delete_data));
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

export default Displaysubcategories;
