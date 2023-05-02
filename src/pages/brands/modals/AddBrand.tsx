import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { configureSlug } from "src/lib/helpers";
import FormContainer from "../utils/FormContainer";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  ContentContainer,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";

type AddBrandProps = {
  openAddBrand: boolean;
  setOpenAddBrand: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBrand = ({ openAddBrand, setOpenAddBrand }: AddBrandProps) => {
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
  const [preview, setPreview] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const { name, slug } = brandData;
  const loadingBrandAction = useTypedSelector(
    (state) => state.brands.loadingBrandAction
  );
  const error = useTypedSelector((state) => state.brands.error);

  const { createNewBrand } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile("");
    setPreview(undefined);
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

  const handleAddBrand = async (
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

    await createNewBrand({
      setBrandData,
      setPreview,
      setSelectedFile,
      setOpen: setOpenAddBrand,
      file: selectedFile,
      name,
      slug: configureSlug(slug),
      icon:
        typeof selectedFile === "object"
          ? selectedFile
          : preview
          ? preview
          : "",
    });
  };

  useEffect(() => {
    setBrandNameError("");
    setBrandSlugError("");
  }, []);

  return (
    <ShowDialog
      openModal={openAddBrand}
      handleClose={() => setOpenAddBrand(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
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
        {!loadingBrandAction && error && (
          <ErrorsList item component="ul">
            <ErrorMsg variant="body1" component="li" color="error">
              {error}
            </ErrorMsg>
          </ErrorsList>
        )}
        <FormContainer
          brandNameError={brandNameError}
          brandSlugError={brandSlugError}
          buttonTitle="Add New Brand"
          loadingBrands={loadingBrandAction}
          name={name}
          onChange={handleChange}
          onClick={handleClick}
          onSubmit={handleAddBrand}
          setOpen={setOpenAddBrand}
          setBrandImageError={setBrandImageError}
          slug={slug}
          onImageChange={handleChangeImage}
          preview={preview}
          selectedFile={selectedFile}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          onRemoveImage={handleRemoveImage}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default AddBrand;
