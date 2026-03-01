import AnimalForm from "@/components/AnimalForm";

export default function NewAnimalPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6">
        Ajouter un animal
      </h2>
      <AnimalForm mode="create" />
    </div>
  );
}
