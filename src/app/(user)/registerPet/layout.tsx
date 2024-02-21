import Image from "next/image";
import bg from "/public/annie-spratt-pKpipZVVEC0-unsplash.jpg";

const RegisterPetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative w-screen h-screen">
      <Image
        src={bg}
        fill
        className="object-cover object-center"
        alt="Photo by Annie Spratt at Unsplash"
      />
      <div className="absolute inset-0 overflow-auto">{children}</div>
    </section>
  );
};
export default RegisterPetLayout;
