import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React base styles
import typography from "assets/theme/base/typography";
import Toolbar from "@mui/material/Toolbar";
import { navbarContainer } from "examples/Navbars/DashboardNavbar/styles";

function Footer() {
  const { size } = typography;

  return (
    <Toolbar
      sx={(theme) => navbarContainer(theme)}
      style={{
        backdropFilter: "saturate(200%) blur(1.875rem)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        color: "#344767",
        borderRadius: "0.75rem",
        zIindex: "1100",
      }}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}
      </MDBox>
    </Toolbar>
  );
}

export default Footer;
