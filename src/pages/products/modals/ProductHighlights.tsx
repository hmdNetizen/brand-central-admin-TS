import React, { useState, useEffect, ElementType } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import ShowDialog from "src/utils/ShowDialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useActions } from "src/hooks/useActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { isQuantityInMultiples } from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  initialHighlightCheckedState,
  initialHighlightPriceCodes,
} from "./data";
import {
  InitialHighlightCheckedTypes,
  InitialHighlightPriceCodesTypes,
} from "./data/types";
import ProductHighlightForm from "../utils/ProductHighlightForm";

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
        <ProductHighlightForm />
      </Grid>
    </ShowDialog>
  );
};

export default ProductHighlights;
