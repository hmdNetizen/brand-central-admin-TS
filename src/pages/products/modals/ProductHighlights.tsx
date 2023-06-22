import React, { useState, useEffect, ElementType } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import ShowDialog from "src/utils/ShowDialog";
import CloseIcon from "@mui/icons-material/Close";
import CustomLabelSwitch from "src/utils/CustomLabelSwitch";
import IconButton from "@mui/material/IconButton";
import { useActions } from "src/hooks/useActions";
import CustomFormInput from "src/utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { isQuantityInMultiples } from "src/lib/helpers";
import {
  SubmitButton,
  CancelButton,
  StyledCircularProgress,
} from "src/utilityStyles/pagesUtilityStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  initialHighlightCheckedState,
  initialHighlightPriceCodes,
} from "./data";
import {
  InitialHighlightCheckedTypes,
  InitialHighlightPriceCodesTypes,
} from "./data/types";

const HighlightContainer = styled(Grid)<{ component: ElementType }>(
  ({ theme }) => ({
    padding: "1rem 5rem 2rem",

    [theme.breakpoints.down("md")]: {
      padding: "1rem 2rem 2rem",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "1rem 1rem 2rem",
    },
  })
);

const CloseIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    "& .MuiSvgIcon-root": {
      color: theme.palette.error.main,
    },
  },
}));

type HighlightProps = {
  openHighlight: boolean;
  setOpenHighlight: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductHighlights = (props: HighlightProps) => {
  const theme = useTheme();
  const { openHighlight, setOpenHighlight } = props;

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesXXS = useMediaQuery("(max-width: 340px)");

  const singleProduct = useTypedSelector(
    (state) => state.products.singleProduct
  );
  const loadingProductAction = useTypedSelector(
    (state) => state.products.loadingProductAction
  );

  const { toggleProductHighlight, setCurrentProduct } = useActions();

  const [highlightChecked, setHighlightChecked] =
    useState<InitialHighlightCheckedTypes>(initialHighlightCheckedState);

  const [priceCodesData, setPriceCodesData] =
    useState<InitialHighlightPriceCodesTypes>(initialHighlightPriceCodes);
  const [priceCode1Error, setPriceCode1Error] = useState("");
  const [priceCode2Error, setPriceCode2Error] = useState("");
  const [priceCode3Error, setPriceCode3Error] = useState("");
  const [priceCode4Error, setPriceCode4Error] = useState("");
  const [minQuantityError, setMinQuantityError] = useState("");

  const { inFeatured, inBestSellers, inWeeklyOffer, inPopular } =
    highlightChecked;

  const { priceCode1, priceCode2, priceCode3, priceCode4, minimumQuantity } =
    priceCodesData;

  const handleHighlightChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHighlightChecked({
      ...highlightChecked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleProductHighlight = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    const productName = singleProduct?.productName;

    if (!singleProduct?.productStatus) {
      toast.error(
        `You need to activate ${productName} to perform this action`,
        {
          position: "top-center",
          hideProgressBar: true,
        }
      );

      return;
    }

    if (inWeeklyOffer) {
      if (
        priceCode1 === "" &&
        priceCode2 === "" &&
        priceCode3 === "" &&
        priceCode4 === ""
      ) {
        setPriceCode1Error("Enter price code 1 offer");
        setPriceCode2Error("Enter price code 2 offer");
        setPriceCode3Error("Enter price code 3 offer");
        setPriceCode4Error("Enter price code 4 offer");
        return;
      }

      if (priceCode1 === "") {
        setPriceCode1Error("Enter price code 1 offer");
        return;
      }

      if (priceCode2 === "") {
        setPriceCode2Error("Enter price code 2 offer");
        return;
      }

      if (priceCode3 === "") {
        setPriceCode3Error("Enter price code 3 offer");
        return;
      }

      if (priceCode4 === "") {
        setPriceCode4Error("Enter price code 4 offer");
        return;
      }

      if (
        priceCode1Error ||
        priceCode2Error ||
        priceCode3Error ||
        priceCode4Error ||
        minQuantityError
      ) {
        return;
      }
    }

    toggleProductHighlight({
      setOpenHighlight,
      productId: singleProduct._id,
      fields: {
        inBestSellers,
        inFeatured,
        inWeeklyOffer,
        inPopular,
        newPriceCodeOne: inWeeklyOffer ? parseFloat(priceCode1) : 0,
        newPriceCodeTwo: inWeeklyOffer ? parseFloat(priceCode2) : 0,
        newPriceCodeThree: inWeeklyOffer ? parseFloat(priceCode3) : 0,
        newPriceCodeFour: inWeeklyOffer ? parseFloat(priceCode4) : 0,
        minimumQuantity: inWeeklyOffer ? Number(minimumQuantity) : 0,
      },
    });

    setPriceCode1Error("");
    setPriceCode2Error("");
    setPriceCode3Error("");
    setPriceCode4Error("");
    setMinQuantityError("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPriceCodesData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "priceCode1":
        if (!value.trim()) {
          setPriceCode1Error("Enter price code1 offer");
        } else {
          setPriceCode1Error("");
        }
        break;
      case "priceCode2":
        if (!value.trim()) {
          setPriceCode2Error("Enter price code2 offer");
        } else {
          setPriceCode2Error("");
        }
        break;
      case "priceCode3":
        if (!value.trim()) {
          setPriceCode3Error("Enter price code3 offer");
        } else {
          setPriceCode3Error("");
        }
        break;
      case "priceCode4":
        if (!value.trim()) {
          setPriceCode4Error("Enter price code4 offer");
        } else {
          setPriceCode4Error("");
        }
        break;
      case "minimumQuantity":
        if (!value.trim()) {
          setMinQuantityError("Enter Minmum Quantity or set quantity to 0");
        } else if (
          singleProduct?.units === "EA" &&
          !isQuantityInMultiples(value)
        ) {
          setMinQuantityError(
            "Only quantity in multiples of 6 is allowed for this product"
          );
        } else {
          setMinQuantityError("");
        }
        break;
      default:
        setPriceCode1Error("");
        setPriceCode2Error("");
        setPriceCode3Error("");
        setPriceCode4Error("");
        setMinQuantityError("");
    }
  };

  const handleClose = () => {
    setOpenHighlight(false);
    setCurrentProduct(null);
  };

  useEffect(() => {
    if (Object.keys(singleProduct).length > 0) {
      const productHighlight = { ...initialState };
      const newPriceCodes = { ...initialPriceCodes };

      for (const key in singleProduct.highlight) {
        if (key in productHighlight)
          productHighlight[key] = singleProduct.highlight[key];
        if (key in newPriceCodes) {
          newPriceCodes[key] = singleProduct[key];
          setHighlightChecked(productHighlight);
        }

        if (singleProduct.highlight.inWeeklyOffer) {
          newPriceCodes["priceCode1"] = singleProduct.highlight.newPriceCodeOne;
          newPriceCodes["priceCode2"] = singleProduct.highlight.newPriceCodeTwo;
          newPriceCodes["priceCode3"] =
            singleProduct.highlight.newPriceCodeThree;
          newPriceCodes["priceCode4"] =
            singleProduct.highlight.newPriceCodeFour;
          newPriceCodes["minimumQuantity"] =
            singleProduct.highlight.minimumQuantity;

          setPriceCodesData(newPriceCodes);
        }
      }

      if (!singleProduct.highlight.inWeeklyOffer) {
        for (const key in singleProduct) {
          if (key in newPriceCodes) newPriceCodes[key] = singleProduct[key];
        }
        setPriceCodesData(newPriceCodes);
      }
    }
  }, [singleProduct]);

  return (
    <ShowDialog
      openModal={openHighlight}
      handleClose={handleClose}
      height="65vh"
      width={matchesXS ? "95%" : matchesSM ? 500 : 600}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ paddingBottom: "3rem" }}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ p: matchesXXS ? "1rem" : "1rem 2rem", background: "#f7f7f7" }}
        >
          <Grid item alignSelf="center">
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Product Highlights
            </Typography>
          </Grid>
          <Grid item>
            <CloseIconButton onClick={handleClose}>
              <CloseIcon />
            </CloseIconButton>
          </Grid>
        </Grid>
        <HighlightContainer
          item
          container
          direction="column"
          component="form"
          onSubmit={handleProductHighlight}
        >
          <Grid item style={{ marginBottom: "2rem" }}>
            <CustomLabelSwitch
              label="Highlight in Featured"
              name="inFeatured"
              onChange={handleHighlightChecked}
              checked={inFeatured}
              isActive={inFeatured}
            />
          </Grid>
          <Grid item style={{ marginBottom: "2rem" }}>
            <CustomLabelSwitch
              label="Highlight in Best Sellers"
              name="inBestSellers"
              checked={inBestSellers}
              isActive={inBestSellers}
              onChange={handleHighlightChecked}
            />
          </Grid>
          <Grid item style={{ marginBottom: "2rem" }}>
            <CustomLabelSwitch
              label="Highlight in Popular"
              name="inPopular"
              checked={inPopular}
              isActive={inPopular}
              onChange={handleHighlightChecked}
            />
          </Grid>
          <Grid item container direction="column">
            <Grid item style={{ marginBottom: "2rem" }}>
              <CustomLabelSwitch
                label="Highlight in Weekly Offers"
                name="inWeeklyOffer"
                checked={inWeeklyOffer}
                isActive={inWeeklyOffer}
                onChange={handleHighlightChecked}
              />
            </Grid>
            {inWeeklyOffer && (
              <Grid item container direction="column">
                <Grid
                  item
                  container
                  columnGap={3}
                  rowSpacing={2}
                  sx={{ mb: 2 }}
                >
                  <Grid item sm xs={12}>
                    <CustomFormInput
                      type="number"
                      label="Price Code 1"
                      labelId="priceCode1"
                      name="priceCode1"
                      value={priceCode1}
                      placeholder="Enter Price Code 1"
                      onChange={handleInputChange}
                      error={priceCode1Error}
                    />
                  </Grid>
                  <Grid item sm xs={12}>
                    <CustomFormInput
                      type="number"
                      label="Price Code 2"
                      labelId="priceCode2"
                      name="priceCode2"
                      value={priceCode2}
                      placeholder="Enter Price Code 2"
                      onChange={handleInputChange}
                      error={priceCode2Error}
                    />
                  </Grid>
                </Grid>
                <Grid item container columnGap={3} rowSpacing={2} mb={2}>
                  <Grid item sm xs={12}>
                    <CustomFormInput
                      type="number"
                      label="Price Code 3"
                      labelId="priceCode3"
                      name="priceCode3"
                      value={priceCode3}
                      placeholder="Enter Price Code 3"
                      onChange={handleInputChange}
                      error={priceCode3Error}
                    />
                  </Grid>
                  <Grid item sm xs={12}>
                    <CustomFormInput
                      type="number"
                      label="Price Code 4"
                      labelId="priceCode4"
                      name="priceCode4"
                      value={priceCode4}
                      placeholder="Enter Price Code 4"
                      onChange={handleInputChange}
                      error={priceCode4Error}
                    />
                  </Grid>
                </Grid>
                <Grid item container columnGap={3} rowSpacing={2}>
                  <Grid item sm xs={12}>
                    <CustomFormInput
                      type="number"
                      label="Minimum Quantity"
                      labelId="minimumQuantity"
                      name="minimumQuantity"
                      value={minimumQuantity}
                      placeholder="Enter Minmimum Quantity"
                      onChange={handleInputChange}
                      error={minQuantityError}
                    />
                  </Grid>
                  <Grid item sm xs={12}></Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            columnSpacing={1}
            style={{ marginTop: "5rem" }}
          >
            <Grid item>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
            </Grid>
            <Grid item>
              <SubmitButton
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                disabled={loadingProductAction}
              >
                {loadingProductAction && (
                  <StyledCircularProgress style={{ height: 25, width: 25 }} />
                )}{" "}
                Submit
              </SubmitButton>
            </Grid>
          </Grid>
        </HighlightContainer>
      </Grid>
    </ShowDialog>
  );
};

export default ProductHighlights;
