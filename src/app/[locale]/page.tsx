import { fetchHomeData } from "@/lib/FetchHome";

import { fetchPriceData } from "@/lib/FetchPrice";

import { fetchServicesData } from "@/lib/FetchServices";

import HomeLayout from "@/components/home/HomeLayout";

import ServicesLayout from "@/components/services/ServicesLayout";

import PriceLayout from "@/components/price/PriceLayout";

export default async function HomePage() {
  const homeData = await fetchHomeData();
  const priceData = await fetchPriceData();
  const serviceData = await fetchServicesData();

  return (
    <>
      <HomeLayout homeData={homeData} />
      <ServicesLayout serviceData={serviceData} />
      <PriceLayout priceData={priceData} />
    </>
  );
}
