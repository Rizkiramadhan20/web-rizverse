import { fetchHomeData } from "@/lib/FetchHome";
import HomeLayout from "@/components/home/HomeLayout";

export default async function HomePage() {
  const homeData = await fetchHomeData();

  return <HomeLayout homeData={homeData} />;
}
