import { Fragment } from "react";

import { fetchHomeData } from "@/utils/FetchHome";

import { fetchPriceData } from "@/utils/FetchPrice";

import { fetchServicesData } from "@/utils/FetchServices";

import { fetchFeaturedData } from "@/utils/FetchFeatured";

import HomeLayout from "@/components/home/HomeLayout";

import ServicesLayout from "@/components/services/ServicesLayout";

import PriceLayout from "@/components/price/PriceLayout";

import FeaturedLayout from "@/components/featured/FeaturedLayout"

export default async function HomePage() {
  const homeData = await fetchHomeData();
  const priceData = await fetchPriceData();
  const serviceData = await fetchServicesData();
  const featuredData = await fetchFeaturedData();
  return (
    <Fragment>
      <HomeLayout homeData={homeData} />
      <FeaturedLayout featuredData={featuredData} />
      <ServicesLayout serviceData={serviceData} />
      <PriceLayout priceData={priceData} />
    </Fragment>
  );
}
