import { Fragment } from "react";

import HomeLayout from "@/components/home/HomeLayout";

// import ProjectContent from "@/components/content/ProjectContent";

// import AboutPage from "@/components/content/AboutPage";

// import ArticlePage from "@/components/content/ArticlePage";

// import ContactPage from "@/components/content/ContactPage";

import LayoutSkeleton from "@/base/helper/LayoutSkelaton";

// import { fetchProyekData } from "@/utils/FetchProyek";

import { fetchHomeData } from "@/lib/FetchHome";

// import { fetchAboutData } from "@/utils/FetchAbout";

// import { fetchArticleData } from "@/utils/FetchArticle";

// import { fetchContactData } from "@/utils/FetchContact";

export default async function Page() {
  try {
    // const projectData = await fetchProyekData();
    const homeData = await fetchHomeData();
    // const aboutData = await fetchAboutData();
    // const articleData = await fetchArticleData();
    // const contactData = await fetchContactData();
    return <Fragment>
      <HomeLayout homeData={homeData} />
      {/* <ProjectContent projectData={projectData} /> */}
      {/* <AboutPage aboutData={aboutData} /> */}
      {/* <ArticlePage articleData={articleData} /> */}
      {/* <ContactPage contactData={contactData} /> */}
    </Fragment>;
  } catch (error) {
    console.error('Error fetching Project data:', error);
    return (
      <LayoutSkeleton />
    );
  }
}