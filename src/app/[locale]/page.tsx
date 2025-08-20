import { Fragment } from "react";

import { fetchHomeData } from "@/utils/FetchHome";

import { fetchPriceData } from "@/utils/FetchPrice";

import { fetchServicesData } from "@/utils/FetchServices";

import HomeLayout from "@/components/home/HomeLayout";

import ServicesLayout from "@/components/services/ServicesLayout";

import PriceLayout from "@/components/price/PriceLayout";

export default async function HomePage() {
  const homeData = await fetchHomeData();
  const priceData = await fetchPriceData();
  const serviceData = await fetchServicesData();

  return (
    <Fragment>
      <HomeLayout homeData={homeData} />
      <ServicesLayout serviceData={serviceData} />
      <PriceLayout priceData={priceData} />
    </Fragment>
  );
}
