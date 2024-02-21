import LostPetForm from "@/components/lostPetForm ";

const LostPet = ({
  params,
}: {
  params: { category: string; breed: string };
}) => {
  const { category, breed } = params;
  return (
    <section className="absolute inset-x-3 top-20">
      <LostPetForm
        category={category}
        breed={breed}
      />
    </section>
  );
};
export default LostPet;
