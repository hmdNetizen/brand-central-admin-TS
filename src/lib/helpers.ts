import { EmailList, MailDataTypes } from "src/components/messages/types";
import {
  ProductsBulkUpdatePayload,
  ProductTypes,
} from "src/services/products/ProductTypes";
import { SalespersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";

export const capitalizeFirstLetters = (sentence: string) => {
  const lowerCaseSentence = sentence.toLowerCase();
  let splitSentence = lowerCaseSentence.split(" ");

  for (let i = 0; i < splitSentence.length; i++) {
    splitSentence[i] =
      splitSentence[i].charAt(0).toUpperCase() + splitSentence[i].slice(1);
  }

  return splitSentence.join(" ");
};

// export const lastThirtyDaysCustomers = (datasets: DatasetProps[]): number => {
//   let lastThirtyDaysCount = 0;
//   const currentDate = new Date();
//   const currentDateTime = currentDate.getTime();
//   const last30DaysDate = new Date(
//     currentDate.setDate(currentDate.getDate() - 30)
//   );
//   const last30DaysDateTime = last30DaysDate.getTime();

//   const last30DaysList =
//     datasets.length > 0 &&
//     datasets
//       .filter((dataset) => {
//         const elementDateTime = new Date(dataset.createdAt).getTime();
//         if (
//           elementDateTime <= currentDateTime &&
//           elementDateTime > last30DaysDateTime
//         ) {
//           return true;
//         }
//         return false;
//       })
//       .sort((a, b) => {
//         return (
//           new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
//         );
//       });

//   if (!last30DaysList) {
//     lastThirtyDaysCount = 0;
//   } else {
//     lastThirtyDaysCount = last30DaysList.length;
//   }

//   return lastThirtyDaysCount;
// };

export const configureSlug = (name: string) =>
  name
    .split(" ")
    .join("%20")
    .split(" / ")
    .join("%20or%20")
    .split("/")
    .join("-or-")
    .toLowerCase();

export function generateCode() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text.toUpperCase();
}

export const emailRegex =
  /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const validateEmail = (value: string) => {
  if (emailRegex.test(value)) {
    return true;
  } else {
    return false;
  }
};

// Checks if an email already exist in the emailList array
export const inMailList = (mailList: EmailList[], newEmail: string) =>
  mailList.some((mail) => mail.email === newEmail);

export const constructContent = (content: string) => {
  return content.replace(/%0A/g, "\n");
};

export const constructSubCategory = (product: ProductsBulkUpdatePayload) => {
  if (product["Sub Category"].toLowerCase() === "shamp/cond") {
    return "Shampoo/conditioner";
  } else if (product["Sub Category"].toLowerCase() === "pers hygene") {
    return "Personal Hygiene";
  } else {
    return product["Sub Category"];
  }
};

export const constructBrandName = (product: ProductsBulkUpdatePayload) => {
  if (
    product["Brand"].toLowerCase() === "head&shoulders" ||
    product["Brand"].toLowerCase() === "head and should"
  ) {
    return "Head & Shoulders";
  } else if (product["Brand"].toLowerCase() === "johnson & johns") {
    return "Johnson & Johnson";
  } else {
    return product["Brand"];
  }
};

export const productMeasurements = [
  "Gram",
  "Kilogram",
  "Litre",
  "Pound",
  "Custom",
];

export const shippingCategoryList = ["light", "medium", "heavy", "extra heavy"];

export const isQuantityInMultiples = (customQuantity: string) => {
  if (parseInt(customQuantity) !== 0 && parseInt(customQuantity) % 6 === 0) {
    return true;
  } else {
    return false;
  }
};

export const domain = import.meta.env.VITE_DOMAIN_URL;

export const getProductSlug = (product: ProductTypes) => {
  if (product) {
    const { productName, itemCode } = product;
    const slug = `${productName
      .split(" ")
      .join("-")
      .split("/")
      .join("-")}-${itemCode}`;
    return slug.toLowerCase();
  }
};

export const addBrandWithApostrophe = (brand: string) => {
  if (brand.slice(-1) === "s") {
    return `${brand}'`;
  } else {
    return `${brand}'s`;
  }
};

export const getSalespersonId = (
  salespeople: SalespersonReturnedPayload[],
  initials: string
) => {
  const salesperson = salespeople.filter((item) => item.initials === initials);

  if (salesperson.length === 0) {
    return "";
  }

  return salesperson[0]._id;
};
