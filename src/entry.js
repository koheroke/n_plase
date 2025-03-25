// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//   log: ['query'],
// });

// //await prisma.Map.deleteMany();
// const maps = await prisma.map.findMany({
//          orderBy: [{ posY: 'asc' }, { posX: 'asc' }],
//       });
//       console.log(maps);

    
//     // await prisma.Map.deleteMany({
//     //   where: {
//     //       posX: 99,    
//     //       posY: 44           
//     //   }
//     // });

//     //await prisma.Map.deleteMany();
// //   // その後、データを取得します
// console.log(await prisma.map.findMany());

// // const result = await prisma.map.findUnique({
// //   where: {
// //     posX_posY: {   // 複合主キーの条件を指定
// //       posX: 99,     // 検索する posX の値
// //       posY: 44      // 検索する posY の値
// //     }
// //   }
// // });

// // console.log(result);
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function fetchData() {
//   try {
//     const maps = await prisma.map.findMany({
//       orderBy: [{ posY: 'asc' }, { posX: 'asc' }],
//     });
//     console.log(maps);

//     const count = await prisma.map.count();
//     console.log(`Total maps: ${count}`);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// fetchData();
