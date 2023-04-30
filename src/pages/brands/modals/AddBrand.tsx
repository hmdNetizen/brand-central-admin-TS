import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowModal from "utils/ShowModal";
import CustomFormInput from "utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles, useTheme } from "@mui/styles";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import FileUploadBox from "components/uploads/FileUploadBox";
import { useActions } from "hooks/useActions";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { configureSlug } from "lib/helpers";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    paddingBottom: "3rem",
  },
  errorsList: {
    "&.MuiGrid-root": {
      padding: "2rem 2rem 2rem 3rem",
      background: theme.palette.common.lightRed,
      alignSelf: "center",
      marginTop: "1rem",
      borderRadius: 5,
      listStyle: "none",
    },
  },
  errorMsg: {
    "&.MuiTypography-root": {
      fontSize: "1.5rem",
      "&:not(:first-of-type)": {
        paddingTop: ".5rem",
      },
    },
  },
  formContainer: {
    "&.MuiGrid-root": {
      padding: "2rem",
    },
  },
  submitButton: {
    "&.MuiButton-root": {
      minWidth: 180,
      fontSize: "1.6rem",
      fontWeight: 400,
      textTransform: "none",
      borderRadius: 0,

      "&:hover": {
        background: theme.palette.secondary.light,
      },

      "&:active": {
        background: theme.palette.secondary.dark,
      },

      "&:disabled": {
        cursor: "not-allowed",
        pointerEvents: "all !important",
        background: theme.palette.secondary.light,
        color: "#fff",
        // color: (props) => (props.loading ? "#fff" : "inherit"),
      },
    },
  },
  loader: {
    marginRight: "1rem",
    "&.MuiCircularProgress-root": {
      color: "#f2f2f2",
    },
  },
  cancelButton: {
    "&.MuiButton-root": {
      fontSize: "1.5rem",
      textTransform: "none",
      padding: ".5rem 2rem",
      borderRadius: 0,
      color: theme.palette.error.main,
      background: theme.palette.common.lightRed,
    },
  },
  chip: {
    "&.MuiChip-root": {
      marginTop: ".5rem",
      borderRadius: 0,
      height: 25,
      fontSize: "1rem",
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.dark,
      display: "flex",
      width: 100,
      textAlign: "center",
    },
  },
  iconButton: {
    "&.MuiIconButton-root": {
      background: theme.palette.error.main,
      maxWidth: 42,

      "&:hover": {
        background: theme.palette.error.light,
      },

      "&:active": {
        background: theme.palette.error.dark,
      },

      "& .MuiSvgIcon-root": {
        color: "#fff",
      },
    },
  },
}));

const AddBrand = ({ openAddBrand, setOpenAddBrand }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [brandData, setBrandData] = useState({
    name: "",
    slug: "",
  });

  const [brandNameError, setBrandNameError] = useState("");
  const [brandSlugError, setBrandSlugError] = useState("");
  const [brandImageError, setBrandImageError] = useState("");

  const { name, slug } = brandData;

  const { loadingBrands, uploadedFile, error } = useSelector(
    (state) => state.common
  );
  const { createNewBrand, clearUploadedImages, uploadFile } = useActions();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBrandData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        if (!value) {
          setBrandNameError("Please enter brand name");
        } else {
          setBrandNameError("");
        }
        break;
      case "slug":
        if (!value) {
          setBrandSlugError("Please enter brand slug");
        } else {
          setBrandSlugError("");
        }
        break;
      default:
        setBrandNameError("");
        setBrandSlugError("");
    }
  };

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    uploadFile({
      file,
    });
  };

  const handleClick = () => {
    if (!name.trim()) {
      setBrandNameError("Please enter brand name");
      setBrandData({ ...brandData, slug: "" });
    } else {
      setBrandData({
        ...brandData,
        slug: configureSlug(name),
      });
      setBrandNameError("");
      setBrandSlugError("");
    }
  };

  const handleAddBrand = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!name.trim() && !slug.trim()) {
      setBrandNameError("Please enter brand name");
      setBrandSlugError("Please enter brand slug");
      return;
    }

    if (!name.trim()) {
      setBrandNameError("Please enter brand name");
      return;
    }

    if (!slug.trim()) {
      setBrandSlugError("Please enter brand slug");
      return;
    }

    if (brandNameError || brandSlugError) return;

    createNewBrand({
      setBrandData,
      setOpenAddBrand,
      name,
      slug: configureSlug(slug),
      icon: uploadedFile ? uploadedFile.url : "",
    });
  };

  useEffect(() => {
    setBrandNameError("");
    setBrandSlugError("");
  }, []);

  return (
    <ShowModal
      openModal={openAddBrand}
      setOpenModal={setOpenAddBrand}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <Grid container direction="column" className={classes.contentContainer}>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item alignSelf="center">
            <Typography
              variant="h4"
              style={{ marginBottom: 0 }}
              color="secondary"
            >
              Add New Brand
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                setOpenAddBrand(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingBrands && error && (
          <Grid item component="ul" className={classes.errorsList}>
            <Typography
              variant="body1"
              component="li"
              color="error"
              className={classes.errorMsg}
            >
              {error}
            </Typography>
          </Grid>
        )}
        {/* Form Container */}
      </Grid>
    </ShowModal>
  );
};

export default AddBrand;
