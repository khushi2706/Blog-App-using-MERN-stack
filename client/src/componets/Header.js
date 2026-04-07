import React, { useEffect,useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTab !== null) {
      setValue(parseInt(savedTab, 10));
    }
    if (savedTheme !== null) {
      dispatch(setDarkmode(JSON.parse(savedTheme))); 
    }
  }, [dispatch]);
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/blogs/add")) {
      setValue(2);
    } else if (path.startsWith("/myBlogs")) {
      setValue(1);
    } else if (path.startsWith("/blogs")) {
      setValue(0);
    } else {
      setValue(0); 
    }
  }, [location.pathname]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue); 
  };

  const handleDarkModeToggle = () => {
    const newTheme = !isDark;
    localStorage.setItem("isDarkMode", newTheme); 
    dispatch(setDarkmode(newTheme)); 
  }

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: isDark
          ? "linear-gradient(135deg, rgba(20,24,36,0.92), rgba(15,17,21,0.72))"
          : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,244,255,0.7))",
        backdropFilter: "blur(12px)",
        borderBottom: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(15,17,21,0.08)",
      }}
    >
      <Toolbar
        sx={{
          width: "min(1200px, 94%)",
          mx: "auto",
          py: { xs: 1, md: 1.2 },
          gap: { xs: 1.2, md: 2 },
          flexDirection: "column",
          alignItems: "center",
          minHeight: { xs: 88, md: 72 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              color: "var(--title)",
              fontSize: { xs: "1.05rem", sm: "1.2rem", md: "2.125rem" },
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            BlogsApp
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              gap: { xs: 0.5, md: 1 },
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {!isLoggedIn && (
              <>
                <Button
                  onClick={handleLoginClick}
                  size="small"
                  sx={{
                    px: { xs: 1, md: 2 },
                    py: { xs: 0.75, md: 1 },
                    fontWeight: "bold",
                    color: "var(--title)",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    minWidth: { xs: 64, md: 80 },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignupClick}
                  size="small"
                  sx={{
                    px: { xs: 1, md: 2 },
                    py: { xs: 0.75, md: 1 },
                    fontWeight: "bold",
                    color: "var(--title)",
                    borderRadius: 999,
                    background:
                      "linear-gradient(135deg, rgba(110,231,255,0.3), rgba(255,106,213,0.3))",
                    border: "1px solid var(--border)",
                    minWidth: { xs: 76, md: 90 },
                  }}
                >
                  SignUp
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/login"
                variant="contained"
                size="small"
                sx={{
                  px: { xs: 1.2, md: 2 },
                  py: { xs: 0.75, md: 1 },
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, rgba(110,231,255,0.3), rgba(255,106,213,0.3))",
                  border: "1px solid var(--border)",
                  color: "var(--title)",
                  minWidth: { xs: 72, md: 92 },
                }}
                color="warning"
              >
                Logout
              </Button>
            )}
            <div
              onClick={handleDarkModeToggle}
              style={{
                alignContent: "center",
                padding: "10px 0",
                cursor: "pointer",
                color: isDark ? "white" : "#0f1115",
              }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </div>
          </Box>
        </Box>
        {isLoggedIn && (
          <Box
            display="flex"
            alignItems="center"
            sx={{
              width: "100%",
              justifyContent: "center",
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Tabs
              textColor="inherit"
              value={value}
              onChange={handleTabChange}
              variant="scrollable"
              allowScrollButtonsMobile
              sx={{
                color: isDark ? "white" : "#0f1115",
                minHeight: { xs: 40, md: 48 },
                "& .MuiTabs-flexContainer": {
                  gap: { xs: 0.5, md: 1 },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: isDark ? "#6ee7ff" : "#0ea5e9",
                  height: 3,
                  borderRadius: 999,
                },
                "& .MuiTab-root": {
                  color: isDark ? "white" : "#0f1115",
                  minHeight: { xs: 40, md: 48 },
                  minWidth: { xs: 92, sm: 96, md: 100 },
                  px: { xs: 1, md: 2 },
                  fontSize: { xs: "0.72rem", sm: "0.8rem", md: "0.875rem" },
                  textTransform: "none",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
