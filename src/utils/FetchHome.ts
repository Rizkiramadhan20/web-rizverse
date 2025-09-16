export const fetchHomeData = async (): Promise<HomeItem> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/home`) {
      console.warn("layout not available during build time");
      return {
        id: "",
        title: {
          id: "",
          en: "",
        },
        description: {
          id: "",
          en: "",
        },
        image: [],
        button: [],
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/home`,
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

    const apiResponse: HomeResponse = await response.json();
    return apiResponse.data[0];
  } catch (error) {
    console.error("Error fetching Home data:", error);
    return {
      id: "",
      title: {
        id: "",
        en: "",
      },
      description: {
        id: "",
        en: "",
      },
      image: [],
      button: [],
    };
  }
};
