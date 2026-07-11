import React from "react";
import HeroBanner from "./HeroBanner";
import WhoWeAre from "./WhoWeAre";
import Testimonial from "./Testimonial";
import OurTrainers from "./OurTrainers";
import JoinBanner from "./JoinBanner";
import Footer from "../Footer";

export default function About() {
  return (
    <>
      <HeroBanner />
      <WhoWeAre />
      <Testimonial />
      <OurTrainers />
      <JoinBanner />
      <Footer />
    </>
  );
}
