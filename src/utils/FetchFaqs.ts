export const fetchFaqsData = async (): Promise<FaqItem[]> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/faqs`) {
      console.warn("Faqs not available during build time");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/faqs`,
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

    const apiResponse: FaqsResponse = await response.json();
    return apiResponse.data;
  } catch (error) {
    console.error("Error fetching Faqs data:", error);
    return [];
  }
};
