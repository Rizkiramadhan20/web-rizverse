export const fetchServicesData = async (): Promise<ServiceItem[]> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/services`) {
      console.warn("layout not available during build time");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/services`,
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

    const apiResponse: ServicesResponse = await response.json();
    return apiResponse.data;
  } catch (error) {
    console.error("Error fetching Services data:", error);
    return [];
  }
};
