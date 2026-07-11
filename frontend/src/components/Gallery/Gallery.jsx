import React from "react";
import HeroBanner from "./HeroBanner";
import GalleryGrid from "./GalleryGrid";
import JoinBanner from "./JoinBanner";
import Footer from "../Footer";

export default function Gallery() {
  return (
    <>
      <HeroBanner />
      <GalleryGrid />
      <JoinBanner />
      <Footer />
    </>
  );
}
