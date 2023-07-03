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
import { initialHighlightState } from "./data";
import ProductHighlightForm from "../utils/ProductHighlightForm";
import { ProductHighlightTypes } from "src/services/products/ProductTypes";

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

  const [highlightData, setHighlightData] = useState<ProductHighlightTypes>(
    initialHighlightState
  );

  const [priceCode1Error, setPriceCode1Error] = useState("");
  const [priceCode2Error, setPriceCode2Error] = useState("");
  const [priceCode3Error, setPriceCode3Error] = useState("");
  const [priceCode4Error, setPriceCode4Error] = useState("");
  const [minQuantityError, setMinQuantityError] = useState("");

  const {
    newPriceCodeOne,
    newPriceCodeTwo,
    newPriceCodeThree,
    newPriceCodeFour,
    minimumQuantity,
    inFeatured,
    inBestSellers,
    inWeeklyOffer,
    inPopular,
  } = highlightData;

  const handleHighlightChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHighlightData((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
    // setHighlightChecked({
    //   ...highlightChecked,
    //   [event.target.name]: event.target.checked,
    // });
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
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
        Number(newPriceCodeOne) === 0 &&
        Number(newPriceCodeTwo) === 0 &&
        Number(newPriceCodeThree) === 0 &&
        Number(newPriceCodeFour) === 0
      ) {
        setPriceCode1Error("Enter price code 1 offer");
        setPriceCode2Error("Enter price code 2 offer");
        setPriceCode3Error("Enter price code 3 offer");
        setPriceCode4Error("Enter price code 4 offer");
        return;
      }

      if (Number(newPriceCodeOne) === 0) {
        setPriceCode1Error("Enter price code 1 offer");
        return;
      }

      if (Number(newPriceCodeTwo) === 0) {
        setPriceCode2Error("Enter price code 2 offer");
        return;
      }

      if (Number(newPriceCodeThree) === 0) {
        setPriceCode3Error("Enter price code 3 offer");
        return;
      }

      if (Number(newPriceCodeFour) === 0) {
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
        newPriceCodeOne: newPriceCodeOne,
        newPriceCodeTwo: newPriceCodeTwo,
        newPriceCodeThree: newPriceCodeThree,
        newPriceCodeFour: newPriceCodeFour,
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

    // setPriceCodesData((prev) => ({ ...prev, [name]: value }));
    setHighlightData((prev) => ({ ...prev, [name]: value }));

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
    if (singleProduct) {
      const newHighlightData = { ...initialHighlightState };

      for (const key in singleProduct.highlight) {
        if (key in newHighlightData) {
          // @ts-ignore
          newHighlightData[key as keyof ProductHighlightTypes] =
            singleProduct.highlight[key as keyof ProductHighlightTypes];
          setHighlightData(newHighlightData);
        }

        if (!singleProduct.highlight.inWeeklyOffer) {
          setHighlightData((prev) => ({
            ...prev,
            newPriceCodeOne: Number(singleProduct.priceCode1),
            newPriceCodeTwo: Number(singleProduct.priceCode2),
            newPriceCodeThree: Number(singleProduct.priceCode3),
            newPriceCodeFour: Number(singleProduct.priceCode4),
          }));
        }
      }
    }
  }, [singleProduct]);

  // useEffect(() => {
  //   if (singleProduct) {
  //     const newHighlightData = { ...initialHighlightState };

  //     for (const key in singleProduct.highlight) {
  //       if (key in newHighlightData)
  //         productHighlight[key] = singleProduct.highlight[key];
  //       // if (key in newPriceCodes) {
  //       //   newPriceCodes[key] = singleProduct[key];
  //       //   setHighlightChecked(productHighlight);
  //       // }

  //       if (singleProduct.highlight.inWeeklyOffer) {
  //         newPriceCodes["priceCode1"] = singleProduct.highlight.newPriceCodeOne;
  //         newPriceCodes["priceCode2"] = singleProduct.highlight.newPriceCodeTwo;
  //         newPriceCodes["priceCode3"] =
  //           singleProduct.highlight.newPriceCodeThree;
  //         newPriceCodes["priceCode4"] =
  //           singleProduct.highlight.newPriceCodeFour;
  //         newPriceCodes["minimumQuantity"] =
  //           singleProduct.highlight.minimumQuantity;

  //         setPriceCodesData(newPriceCodes);
  //       }
  //     }

  //     if (!singleProduct.highlight.inWeeklyOffer) {
  //       for (const key in singleProduct) {
  //         if (key in newPriceCodes) newPriceCodes[key] = singleProduct[key];
  //       }
  //       setPriceCodesData(newPriceCodes);
  //     }
  //   }
  // }, [singleProduct]);

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
        <ProductHighlightForm
          inBestSellers={inBestSellers}
          inFeatured={inFeatured}
          inPopular={inPopular}
          inWeeklyOffer={inWeeklyOffer}
          loading={loadingProductAction}
          minQuantityError={minQuantityError}
          minimumQuantity={minimumQuantity}
          onClose={handleClose}
          newPriceCodeOne={newPriceCodeOne}
          newPriceCodeTwo={newPriceCodeTwo}
          newPriceCodeThree={newPriceCodeThree}
          newPriceCodeFour={newPriceCodeFour}
          priceCode1Error={priceCode1Error}
          priceCode2Error={priceCode2Error}
          priceCode3Error={priceCode3Error}
          priceCode4Error={priceCode4Error}
          onChecked={handleHighlightChecked}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </Grid>
    </ShowDialog>
  );
};

export default ProductHighlights;
