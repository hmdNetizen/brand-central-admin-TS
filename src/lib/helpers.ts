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
