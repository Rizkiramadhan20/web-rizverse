export const fetchBannerData = async (): Promise<BannerItem> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/banner`) {
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
        button: [],
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/banner`,
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

    const apiResponse: BannerResponse = await response.json();
    return apiResponse.data[0];
  } catch (error) {
    console.error("Error fetching Banner data:", error);
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
      button: [],
    };
  }
};
