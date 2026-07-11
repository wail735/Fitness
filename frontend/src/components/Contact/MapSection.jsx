import React from "react";

function MapSection() {
  return (
    <section className="w-full h-[500px] relative">
      <iframe
        title="Google Maps Blida"
        src="https://maps.google.com/maps?q=Blida,Algeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}

export default MapSection;
