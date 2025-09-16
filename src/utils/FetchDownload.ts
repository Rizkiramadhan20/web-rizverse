export const fetchDownloadData = async (): Promise<DownloadItem[]> => {
  try {
    if (!`${process.env.NEXT_PUBLIC_API as string}/download`) {
      console.warn("layout not available during build time");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API as string}/download`,
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

    const apiResponse: DownloadResponse = await response.json();
    return apiResponse.data;
  } catch (error) {
    console.error("Error fetching Download data:", error);
    return [];
  }
};
