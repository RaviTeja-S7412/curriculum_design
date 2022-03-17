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
import { get_subcategoryLinks, add_subcategoryLinks } from "actions/sub-sub-category.actions";

import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
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
        label: element.category_name,
        value: element.id,
      });
    });
  }

  const subjects_data = [];
  if (all_subjects) {
    all_subjects.forEach((element) => {
      subjects_data.push({ id: element.id, subject_name: element.subject_name });
    });
  }

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

  const [ref, setRef] = useState("add");
  const handleSubmit = () => {
    const add_data = new FormData();
    add_data.append("subject_category", cid);
    add_data.append("subjects", JSON.stringify(sids));
    add_data.append("ref", ref);
    dispatch(add_subcategoryLinks(add_data));
    setCid("");
    setSids([]);
    setRef("add");
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
                  <InputLabel id="demo-simple-select-label">Subject Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Subject Category"
                    value={cid}
                    onChange={(event) => {
                      setCid(event.target.value);
                      setAttributes({ ...attribute_values, subCategory: event.target.value });
                    }}
                    sx={{ minHeight: 42 }}
                    MenuProps={MenuProps}
                  >
                    {subcategories_data.map((name) => (
                      <MenuItem
                        key={name.value}
                        value={name.value}
                        style={getStyles(name.label, name.label, theme)}
                      >
                        {name.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">Subjects</InputLabel>
                  <Select
                    multiple
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    label="Subjects"
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
                    {subjects_data.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={`${name.subject_name}-${name.id}`}
                        style={getStyles(name.subject_name, name.subject_name, theme)}
                      >
                        {name.subject_name}
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
                    editable={{
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            const delete_data = new FormData();
                            delete_data.append("subject_category", oldData.id);
                            delete_data.append("ref", "delete");
                            dispatch(add_subcategoryLinks(delete_data));
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
                          setSids(rowData.subject_ids);
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

export default Displaysubcategorylinks;
