interface DatasetProps {
  createdAt: string;
}

export const lastThirtyDaysCustomers = (datasets: DatasetProps[]): number => {
  let lastThirtyDaysCount = 0;
  const currentDate = new Date();
  const currentDateTime = currentDate.getTime();
  const last30DaysDate = new Date(
    currentDate.setDate(currentDate.getDate() - 30)
  );
  const last30DaysDateTime = last30DaysDate.getTime();

  const last30DaysList =
    datasets.length > 0 &&
    datasets
      .filter((dataset) => {
        const elementDateTime = new Date(dataset.createdAt).getTime();
        if (
          elementDateTime <= currentDateTime &&
          elementDateTime > last30DaysDateTime
        ) {
          return true;
        }
        return false;
      })
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
        );
      });

  if (!last30DaysList) {
    lastThirtyDaysCount = 0;
  } else {
    lastThirtyDaysCount = last30DaysList.length;
  }

  return lastThirtyDaysCount;
};
