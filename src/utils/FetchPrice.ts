export const fetchPriceData = async (): Promise<PriceItem[]> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/price`) {
      console.warn("layout not available during build time");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/price`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
        next: { revalidate: 5 },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const apiResponse: PriceResponse = await response.json();
    return apiResponse.data;
  } catch (error) {
    console.error("Error fetching Price data:", error);
    return [];
  }
};
