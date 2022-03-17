/* eslint-disable react/prop-types */
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
  get_subcategoryLinks,
  update_subcategoryLinks,
  add_subcategoryLinks,
} from "actions/sub-sub-category.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function Programs
 * */

const Displaysubcategorylinks = (props) => {
  const dispatch = useDispatch();
  const get_all_subcategoryLinks = useSelector((state) => state.subcategorylinks);
  const get_all_subjects = useSelector((state) => state.subjects);
  const get_all_subcategories = useSelector((state) => state.subcategories);

  const all_subjects = get_all_subjects && get_all_subjects.subjects;
  const all_subcategoryLinks =
    get_all_subcategoryLinks && get_all_subcategoryLinks.subcategorylinks;
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
  const subcategories = {
    options: subcategories_data,
    getOptionLabel: (option) => (option ? option.category_name : ""),
  };

  const subjects_data = [];
  if (all_subjects) {
    all_subjects.forEach((element) => {
      subjects_data.push({ id: element.id, subject_name: element.subject_name });
    });
  }
  const subjects = {
    options: subjects_data,
    getOptionLabel: (option) => (option ? option.subject_name : ""),
  };

  const subcategoryLinks_data = [];
  if (all_subcategoryLinks) {
    all_subcategoryLinks.forEach((element) => {
      subcategoryLinks_data.push({
        subject_category: element.subject_category,
        subjects: element.subjects,
        subject_ids: element.subject_ids,
        id: element.id,
      });
    });
  }

  const [cid, setCid] = useState("");
  const [sids, setSids] = useState([]);

  const [data, setData] = useState([]);
  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!get_all_subcategoryLinks.get_data) {
      dispatch(get_subcategoryLinks());
    } else {
      setData(subcategoryLinks_data);
    }
  }, [get_all_subcategoryLinks]);

  const [attribute_values, setAttributes] = useState();
  const history = useNavigate();

  const timer = () => {
    window.location.reload();
  };
  const [ref, setRef] = useState("add");
  const handleSubmit = () => {
    const add_data = new FormData();
    add_data.append("subject_category", attribute_values.subCategory);
    add_data.append("subjects", JSON.stringify(attribute_values.subjects));
    add_data.append("ref", ref);
    dispatch(add_subcategoryLinks(add_data));
    // setTimeout(() => {
    //   timer();
    // }, 2000);
    // setAttributes({ subCategory: "", subjects: [], ref: "" });
  };

  const [columns, setColumns] = useState([
    {
      title: "Category Name",
      field: "subject_category",
    },
    {
      title: "Subjects",
      field: "subjects",
    },
    { field: "hidden", editable: "never" },
    { field: "hidden", editable: "never" },
  ]);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Card sx={{ display: "flex", mb: 5, mt: 0, p: 2 }}>
            <CardHeader title="Create Link" />
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} xl={4}>
                <Autocomplete
                  {...subcategories}
                  id="tags-standard1"
                  value={cid}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  disableCloseOnSelect
                  onChange={(event, value) =>
                    setAttributes({ ...attribute_values, subCategory: value.id })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Subject Category"
                      placeholder="Select Subject Category"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <Autocomplete
                  {...subjects}
                  multiple
                  id="tags-standard"
                  value={sids}
                  isOptionEqualToValue={(option, value) => option === value}
                  disableCloseOnSelect
                  onChange={(event, value) =>
                    setAttributes({ ...attribute_values, subjects: value })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Subjects"
                      placeholder="Select Subjects"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4} sx={{ mt: 1 }}>
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
                    Subject To Subject Category Links Table
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
                    actions={[
                      {
                        icon: "edit",
                        tooltip: "Edit",
                        onClick: (event, rowData) => {
                          // eslint-disable-next-line no-restricted-globals
                          // scrollTo("top");
                          setCid({ category_name: rowData.subject_category, id: rowData.id });
                          setSids(rowData.subject_ids);
                          setAttributes({ ...attribute_values, subCategory: rowData.id });
                          setAttributes({ ...attribute_values, subjects: rowData.subject_ids });
                          setRef("update");
                          // console.log(rowData);
                          // history("/sub-sub-category-links");
                        },
                      },
                    ]}
                    /* editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            // setData([...data, newData]);
                            console.log(newData);
                            // setColumns(...columns);
                            // const add_data = new FormData();
                            // add_data.append("subject_category", newData.subject_category);
                            // add_data.append("subjects", newData.subjects);

                            // dispatch(add_subcategoryLinks(add_data));
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
                            update_data.append("id", newData.id);
                            dispatch(update_subcategoryLinks(update_data));
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            // setColumns([...columns]);

                            resolve();
                          }, 1000);
                        }),
                    }} */
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

export default Displaysubcategorylinks;
