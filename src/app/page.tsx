import Image from "next/image";

import dog1 from "/public/anastasia-ulyanova-aFqfi1ASUJc-unsplash.jpg";
import dog2 from "/public/mitchell-orr-1Y4LupdrDZk-unsplash.jpg";
import dog3 from "/public/russ-cuthrell-Vc1SLcyS66I-unsplash.jpg";
import cat1 from "/public/tim-van-der-kuip-mdRJhxlsuGM-unsplash.jpg";
import cat2 from "/public/onur-binay-gMW8gtj04eg-unsplash.jpg";
import cat3 from "/public/nabih-e-navarro-eHemHVexlAY-unsplash.jpg";
import cat4 from "/public/luiza-sayfullina-9giow4jXrzM-unsplash.jpg";
import parrot from "/public/andrea-lightfoot-ZePrO18ieX4-unsplash.jpg";
import rabbit1 from "/public/kenny-eliason-ldYjXk8oJ4E-unsplash.jpg";
import rabbit2 from "/public/katelyn-greer-7beg3V3aHv0-unsplash.jpg";

import FrontPageLinks from "@/components/frontPageLinks ";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="relative w-screen h-screen overflow-auto">
      <div className="absolute top-60 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 place-items-center">
          <div className="relative hidden sm:block w-40 h-40 -rotate-12">
            <Image
              src={cat4}
              fill
              sizes="33vw"
              priority
              className="object-cover object-center rounded-md"
              alt="Photo by Luiza Sayfullina at Unsplash"
            />
          </div>
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 rotate-6">
            <Image
              src={dog1}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Anastasia Ulyanova at Unsplash"
            />
          </div>
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 -rotate-6">
            <Image
              src={cat1}
              fill
              sizes="33vw"
              className="object-cover object-top rounded-md"
              alt="Photo by Tim van der Kuip at Unsplash"
            />
          </div>
          <div className="relative hidden lg:block w-40 h-40 rotate-12">
            <Image
              src={rabbit1}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Kenny Eliason by Unsplash"
            />
          </div>
          <div className="relative hidden lg:block w-40 h-40 rotate-12">
            <Image
              src={dog2}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Mitchell Orr at Unsplash"
            />
          </div>
          <div className="w-1/2 h-28 sm:h-40 col-span-2 sm:col-span-3 lg:col-span-2 text-center">
            <FrontPageLinks session={session} />
          </div>
          <div className="relative hidden lg:block w-40 h-40 -rotate-12">
            <Image
              src={cat2}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Onur Binay at Unsplash"
            />
          </div>
          <div className="relative hidden sm:block w-40 h-40 -rotate-12">
            <Image
              src={parrot}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Andrea Lightfoot at Unsplash"
            />
          </div>
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 rotate-6">
            <Image
              src={cat3}
              fill
              sizes="33vw"
              className="object-cover object-top rounded-md"
              alt="Photo by Nabih e Navarro at Unsplash"
            />
          </div>
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 -rotate-6">
            <Image
              src={rabbit2}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Katelyn Greer at Unsplash"
            />
          </div>
          <div className="relative hidden lg:block w-40 h-40 rotate-12">
            <Image
              src={dog3}
              fill
              sizes="33vw"
              className="object-cover object-center rounded-md"
              alt="Photo by Russ Cuthrell at Unsplash"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
