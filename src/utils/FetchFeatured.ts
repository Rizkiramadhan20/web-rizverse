export const fetchFeaturedData = async (): Promise<FeaturedItem> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/featured`) {
      console.warn("layout not available during build time");
      return {
        id: "",
        title: {
          id: "",
          en: "",
        },
        text: {
          id: "",
          en: "",
        },
        image: "",
        features: [],
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/featured`,
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

    const apiResponse: FeaturedResponse = await response.json();
    return apiResponse.data[0];
  } catch (error) {
    console.error("Error fetching Featured data:", error);
    return {
      id: "",
      title: {
        id: "",
        en: "",
      },
      text: {
        id: "",
        en: "",
      },
      image: "",
      features: [],
    };
  }
};
