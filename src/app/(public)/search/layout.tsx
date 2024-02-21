import Image from "next/image";
import bg from "/public/viktoriia-kondratiuk-Veeq-tLHYVc-unsplash.jpg";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative w-screen h-screen">
      <Image
        src={bg}
        fill
        className="object-cover object-bottom"
        alt="Photo by Charlie Deets at Unsplash"
      />
      <div className="absolute inset-0 overflow-auto">{children}</div>
    </section>
  );
};
export default SearchLayout;
