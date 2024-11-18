import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button"
import "material-symbols";
import VerticalCard from "../components/info-cards/vertical-card";
// import { metadata } from "./layout";
import type { Metadata } from "next";
import fetchArtists from "../api-fetch/all-artists";
import { CardProps } from "../model/card-props";
import type { Artist } from '@/app/model/artist';
import { processCloudinaryUrl } from "../api-fetch/cloudinary-url-processing";
import HorizontalCard from "../components/info-cards/horizontal-card";
import { ImageProps } from "../model/image-props";
import { Suspense, use } from 'react';
import Artists from "../components/api-fetch-container/all-artists";
import Loading from "../components/loading/loading";

export const metadata: Metadata = {
  title: "MusikStreaming | Home",
  description: "New music streaming app, using Material Design",
};

export default function Home() {
  
  return (
    <div className="home w-full">
      <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Nghệ sĩ nổi bật</h1>
        <Suspense fallback={<Loading/>}>
          <Artists/>
        </Suspense>
      </div>
      {/* <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Nghệ sĩ nổi bật</h1>
        <div className="card-scroll-inner horizontal-cards-container gap-4">
          {cards.map((card, index) => {
            return <HorizontalCard key={index} {...card} />;
          })}
          <HorizontalCard title="Did you know that there's a tunnel under Ocean Blvd?" subtitle="Lana Del Rey" href="#" img={src='https://upload.wikimedia.org/wikipedia/en/4/4f/Lana_Del_Rey_-_Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd.png', } />
        </div>
      </div> */}
    </div>
  );
}
