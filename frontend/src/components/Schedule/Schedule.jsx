import React from "react";
import HeroBanner from "./HeroBanner";
import Table from "./Table";
import ClassCards from "./ClassCards";
import WhyChooseUs from "./WhyChooseUs";
import JoinBanner from "./JoinBanner";
import Footer from "../Footer";

export default function Schedule() {
  return (
    <>
      <HeroBanner />
      <Table />
      <ClassCards />
      <WhyChooseUs />
      <JoinBanner />
      <Footer />
    </>
  );
}
