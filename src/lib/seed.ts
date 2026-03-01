import { getDb } from "./db";
import { v4 as uuidv4 } from "uuid";

const animals = [
  {
    name: "Luna",
    species: "chien",
    breed: "Berger roumain croisé",
    age: "3 ans",
    gender: "femelle",
    size: "moyen",
    description:
      "Luna est une chienne douce et affectueuse qui adore les câlins. Elle est très sociable avec les autres chiens et les enfants. Elle marche bien en laisse et est propre en maison.",
    story:
      "Luna a été trouvée errante dans les rues de Bucarest avec ses chiots. Après avoir été secourue, elle a reçu tous les soins nécessaires. Ses chiots ont été adoptés et maintenant c'est à son tour de trouver sa famille pour la vie.",
    status: "disponible",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 1,
    good_with_kids: 1,
  },
  {
    name: "Rex",
    species: "chien",
    breed: "Berger allemand croisé",
    age: "5 ans",
    gender: "male",
    size: "grand",
    description:
      "Rex est un chien loyal et protecteur. Très intelligent, il apprend vite et adore jouer. Il a besoin d'un jardin et d'une famille active.",
    story:
      "Rex vivait attaché à une chaîne dans un village roumain. Quand son propriétaire a déménagé, il l'a simplement abandonné. Notre équipe l'a recueilli, soigné et il est maintenant prêt pour une nouvelle vie.",
    status: "disponible",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 0,
    good_with_kids: 1,
  },
  {
    name: "Mila",
    species: "chien",
    breed: "Croisé Labrador",
    age: "1 an",
    gender: "femelle",
    size: "moyen",
    description:
      "Mila est une jeune chienne pleine d'énergie et de joie de vivre. Elle adore courir et jouer à la balle. Elle est très câline et cherche une famille active.",
    story:
      "Mila a été trouvée, à peine âgée de quelques semaines, dans une poubelle de Bucarest. Élevée au biberon par nos bénévoles, elle a grandi en pleine santé et déborde d'amour à donner.",
    status: "disponible",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 1,
    good_with_kids: 1,
  },
  {
    name: "Bruno",
    species: "chien",
    breed: "Berger des Carpates croisé",
    age: "4 ans",
    gender: "male",
    size: "grand",
    description:
      "Bruno est un gentil géant. Calme et posé, il est parfait pour une famille tranquille. Il adore les longues promenades et se détendre auprès de ses humains.",
    story:
      "Bruno a vécu ses premières années dans un refuge surpeuplé de Bucarest. Grâce à Nous pour Eux, il a été transféré dans notre refuge où il a pu se remettre de ses peurs et s'épanouir.",
    status: "reserve",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 0,
    good_with_kids: 1,
  },
  {
    name: "Nala",
    species: "chien",
    breed: "Épagneul croisé",
    age: "2 ans",
    gender: "femelle",
    size: "petit",
    description:
      "Nala est une petite chienne vive et espiègle. Elle est très attachée à ses humains et ne demande qu'à être aimée. Idéale pour un appartement.",
    story:
      "Nala a été sauvée d'un groupe de chiens errants qui vivaient près d'une décharge. Malgré son passé difficile, elle est incroyablement confiante envers les humains.",
    status: "disponible",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 1,
    good_with_kids: 1,
  },
  {
    name: "Max",
    species: "chien",
    breed: "Husky croisé",
    age: "3 ans",
    gender: "male",
    size: "grand",
    description:
      "Max est un chien magnifique avec des yeux bleus perçants. Énergique et joueur, il a besoin de beaucoup d'exercice et d'une famille sportive.",
    story:
      "Max a été trouvé en errance près d'une route nationale. Il avait été percuté par une voiture mais a survécu grâce aux soins intensifs de notre vétérinaire. Il est maintenant en pleine forme.",
    status: "disponible",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 0,
    good_with_kids: 0,
  },
  {
    name: "Bella",
    species: "chien",
    breed: "Teckel croisé",
    age: "6 ans",
    gender: "femelle",
    size: "petit",
    description:
      "Bella est une petite chienne calme et douce. Parfaite pour une personne seule ou un couple, elle se contentera de longues siestes et de promenades tranquilles.",
    story:
      "Bella appartenait à une personne âgée qui n'a plus pu s'en occuper. Habituée à la vie en intérieur, elle cherche un foyer calme et aimant.",
    status: "disponible",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 1,
    good_with_cats: 1,
    good_with_kids: 1,
  },
  {
    name: "Rocky",
    species: "chien",
    breed: "Pitbull croisé",
    age: "2 ans",
    gender: "male",
    size: "moyen",
    description:
      "Rocky est un chien plein de vie avec un coeur énorme. Malgré son apparence imposante, c'est un vrai pot de colle. Il a besoin d'un maître expérimenté.",
    story:
      "Rocky a été sauvé d'un réseau de combats de chiens à Bucarest. Après des mois de rééducation, il a retrouvé confiance en l'humain et ne demande qu'à aimer.",
    status: "adopte",
    vaccinated: 1,
    sterilized: 1,
    microchipped: 1,
    good_with_dogs: 0,
    good_with_cats: 0,
    good_with_kids: 0,
  },
];

function seed() {
  const db = getDb();

  // Clear existing data
  db.exec("DELETE FROM animals");

  const now = new Date().toISOString();

  for (const animal of animals) {
    db.prepare(
      `INSERT INTO animals (id, name, species, breed, age, gender, size, description, story, image_url, images, status, vaccinated, sterilized, microchipped, good_with_dogs, good_with_cats, good_with_kids, arrival_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      uuidv4(),
      animal.name,
      animal.species,
      animal.breed,
      animal.age,
      animal.gender,
      animal.size,
      animal.description,
      animal.story,
      null,
      "[]",
      animal.status,
      animal.vaccinated,
      animal.sterilized,
      animal.microchipped,
      animal.good_with_dogs,
      animal.good_with_cats,
      animal.good_with_kids,
      now,
      now,
      now
    );
  }

  console.log(`Seeded ${animals.length} animals successfully!`);
}

seed();
