// seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const expertiseList = [
//   "Software Development",
//   "Database Administration",
//   "Network Security",
//   "Cloud Computing",
//   // ... other expertise items
// ];

// async function seed() {
//   try {
//     // Create specialties with the provided expertiseList
//     for (const expertise of expertiseList) {
//       await prisma.specialty.create({
//         data: {
//           name: expertise,
//         },
//       });
//     }

//     console.log('Seed completed successfully');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seed();


const specialties = [
    { name: "Software Development", technologies: [
      { name: "React", image: "react_image_url" },
      { name: "Node.js", image: "nodejs_image_url" },
      // Add other technologies with their images
    ]},
    { name: "Database Administration", technologies: [
      { name: "MySQL", image: "mysql_image_url" },
      { name: "PostgreSQL", image: "postgresql_image_url" },
      // Add other technologies with their images
    ]},
    // Add other specialties and their corresponding technologies
  ];
  
  async function seedTechnologies() {
    try {
      for (const specialtyData of specialties) {
        const specialty = await prisma.specialty.findMany({
          where: { name: specialtyData.name },
        });
  
        if (!specialty || specialty.length === 0) {
          console.error(`Specialty not found: ${specialtyData.name}`);
          continue;
        }
  
        for (const techData of specialtyData.technologies) {
          await prisma.technologies.create({
            data: {
              name: techData.name,
              image: techData.image,
              specialtyId: specialty[0].id, 
            },
          });
        }
      }
  
      console.log('Technologies seeded successfully');
    } catch (error) {
      console.error('Error seeding technologies:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  seedTechnologies();