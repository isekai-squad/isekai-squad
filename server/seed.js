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

//   seed();


const specialties = [
    { name: "Software Development", technologies: [
      { name: "React", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" },
      { name: "Node.js", image: "https://static-00.iconduck.com/assets.00/node-js-icon-1901x2048-mk1e13df.png" },
      { name: "Flutter", image: "https://w7.pngwing.com/pngs/537/866/png-transparent-flutter-hd-logo.png" },
      { name: "Illustrator", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/1200px-Adobe_Illustrator_CC_icon.svg.png" }
    
      // Add other technologies with their images
    ]},
    { name: "Database Administration", technologies: [
      { name: "MySQL", image: "https://static-00.iconduck.com/assets.00/mysql-icon-512x512-3zmfyzhx.png" },
  { name: "PostgreSQL", image: "https://static-00.iconduck.com/assets.00/postgresql-icon-512x512-37w9wpm7.png" }, 
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