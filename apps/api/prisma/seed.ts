// import { PrismaClient } from "@prisma/client";
// import { faker } from "@faker-js/faker";

// const prisma = new PrismaClient();

// async function main() {
//   // --- Seed Users ---
//   const users = Array.from({ length: 50 }).map(() => ({
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     avatar: faker.image.avatar(),
//     phone: faker.phone.number(),
//     location: faker.location.city(),
//     website: faker.internet.url(),
//     bio: faker.person.bio(),
//     occupation: faker.person.jobTitle(),
//     education: "Bachelor's in " + faker.word.words(2),
//     role: faker.helpers.arrayElement(["STUDENT", "CREATOR", "ADMIN"]),
//     isActive: true,
//     joinDate: faker.date.past(),
//     createdAt: faker.date.past(),
//   }));

//   await prisma.user.createMany({
//     data: users,
//     skipDuplicates: true,
//   });

//   const allUsers = await prisma.user.findMany();

//   // --- Seed Videos ---
//   for (let i = 0; i < 20; i++) {
//     const creator = faker.helpers.arrayElement(allUsers);
//     const video = await prisma.video.create({
//       data: {
//         title: faker.lorem.words(5),
//         creator: creator.name,
//         channelName: faker.company.name(),
//         channelImage: faker.image.avatar(),
//         thumbnail: faker.image.urlPicsumPhotos(),
//         rating: faker.number.float({ min: 3.5, max: 5.0 }),
//         views: faker.number.int({ min: 1000, max: 100000 }),
//         duration: `${faker.number.int({ min: 10, max: 60 })} minutes`,
//         uploadDate: faker.date.past(),
//         category: faker.helpers.arrayElement([
//           "Web Development",
//           "AI",
//           "Blockchain",
//         ]),
//         description: faker.lorem.paragraph(),
//         tags: [faker.word.words(1), faker.word.words(1)],
//         relatedVideos: {},
//       },
//     });

//     // --- Seed Comments ---
//     for (let j = 0; j < 5; j++) {
//       const user = faker.helpers.arrayElement(allUsers);
//       await prisma.comment.create({
//         data: {
//           userId: user.id,
//           videoId: video.id,
//           comment: faker.lorem.sentences(2),
//           date: faker.date.recent(),
//           likes: faker.number.int({ min: 0, max: 50 }),
//         },
//       });

//       await prisma.review.create({
//         data: {
//           userId: user.id,
//           rating: faker.number.int({ min: 3, max: 5 }),
//           comment: faker.lorem.sentences(1),
//           date: faker.date.past(),
//           videoId: video.id,
//         },
//       });
//     }
//   }

//   // --- Seed Roadmaps ---
//   for (let i = 0; i < 10; i++) {
//     const creator = faker.helpers.arrayElement(allUsers);
//     const roadmap = await prisma.roadmap.create({
//       data: {
//         title: faker.lorem.words(3),
//         description: faker.lorem.paragraph(),
//         creatorId: creator.id,
//         progress: faker.number.int({ min: 0, max: 100 }),
//       },
//     });

//     for (let j = 0; j < 5; j++) {
//       await prisma.roadmapNode.create({
//         data: {
//           title: faker.lorem.words(4),
//           description: faker.lorem.sentences(2),
//           type: faker.helpers.arrayElement([
//             "course",
//             "video",
//             "podcast",
//             "article",
//           ]),
//           status: faker.helpers.arrayElement([
//             "not-started",
//             "in-progress",
//             "completed",
//           ]),
//           link: faker.internet.url(),
//           metadata: {
//             duration: `${faker.number.int({ min: 1, max: 6 })} weeks`,
//             author: faker.person.fullName(),
//           },
//           roadmapId: roadmap.id,
//         },
//       });
//     }
//   }

//   // --- Seed Wishlist ---
//   for (let i = 0; i < 30; i++) {
//     const user = faker.helpers.arrayElement(allUsers);
//     await prisma.wishlist.create({
//       data: {
//         userId: user.id,
//         title: faker.lorem.words(3),
//         itemType: faker.helpers.arrayElement(["course", "podcast", "video"]),
//         itemId: faker.string.uuid(),
//       },
//     });
//   }

//   // --- Seed Notifications ---
//   for (let i = 0; i < 50; i++) {
//     const user = faker.helpers.arrayElement(allUsers);
//     await prisma.notification.create({
//       data: {
//         userId: user.id,
//         title: faker.company.buzzPhrase(),
//         description: faker.lorem.sentence(),
//         icon: "bell",
//         read: faker.datatype.boolean(),
//       },
//     });
//   }

//   // --- Seed Courses ---
//   for (let i = 0; i < 30; i++) {
//     const instructor = faker.helpers.arrayElement(allUsers);
//     const course = await prisma.course.create({
//       data: {
//         title: faker.lorem.words(4),
//         instructor: instructor.name,
//         image: faker.image.urlPicsumPhotos(),
//         rating: faker.number.float({ min: 3.5, max: 5.0 }),
//         students: faker.number.int({ min: 100, max: 5000 }),
//         price: faker.number.float({ min: 50, max: 200 }),
//         category: faker.helpers.arrayElement([
//           "Web Development",
//           "Data Science",
//           "Design",
//         ]),
//         level: faker.helpers.arrayElement([
//           "Beginner",
//           "Intermediate",
//           "Advanced",
//         ]),
//         duration: `${faker.number.int({ min: 20, max: 60 })} hours`,
//         lastUpdated: faker.date.recent(),
//         description: faker.lorem.paragraph(),
//         requirements: [faker.lorem.words(5), faker.lorem.words(5)],
//         learnings: [faker.lorem.words(5), faker.lorem.words(5)],
//       },
//     });

//     for (let j = 0; j < 3; j++) {
//       const section = await prisma.curriculumSection.create({
//         data: {
//           title: faker.lorem.words(3),
//           courseId: course.id,
//         },
//       });

//       for (let k = 0; k < 5; k++) {
//         await prisma.lesson.create({
//           data: {
//             title: faker.lorem.words(4),
//             duration: `${faker.number.int({ min: 10, max: 90 })} minutes`,
//             type: "video",
//             sectionId: section.id,
//           },
//         });
//       }
//     }

//     for (let r = 0; r < 5; r++) {
//       const user = faker.helpers.arrayElement(allUsers);
//       await prisma.review.create({
//         data: {
//           userId: user.id,
//           rating: faker.number.int({ min: 3, max: 5 }),
//           comment: faker.lorem.sentences(2),
//           date: faker.date.past(),
//           courseId: course.id,
//         },
//       });
//     }

//     await prisma.certificate.create({
//       data: {
//         title: course.title + " Certificate",
//         courseId: course.id,
//         instructor: course.instructor,
//         issueDate: new Date(),
//         image: faker.image.urlPicsumPhotos(),
//         downloadUrl: faker.internet.url(),
//       },
//     });
//   }

//   // --- Seed Events ---
//   for (let i = 0; i < 20; i++) {
//     const event = await prisma.event.create({
//       data: {
//         title: faker.company.name() + " Conference",
//         type: "Webinar",
//         category: "Technology",
//         date: faker.date.future(),
//         time: "10:00 AM - 4:00 PM",
//         location: faker.location.city(),
//         image: faker.image.urlPicsumPhotos(),
//         rating: faker.number.float({ min: 3.5, max: 5.0 }),
//         attendees: faker.number.int({ min: 50, max: 1000 }),
//         organizer: faker.company.name(),
//         description: faker.lorem.paragraph(),
//       },
//     });

//     const schedule = await prisma.eventSchedule.create({
//       data: {
//         day: "Day 1",
//         eventId: event.id,
//       },
//     });

//     for (let j = 0; j < 3; j++) {
//       await prisma.scheduleItem.create({
//         data: {
//           time: `${9 + j}:00 AM`,
//           title: faker.company.catchPhrase(),
//           speaker: faker.person.fullName(),
//           description: faker.lorem.sentence(),
//           scheduleId: schedule.id,
//         },
//       });
//     }
//   }

//   // --- Seed Podcasts ---
//   for (let i = 0; i < 20; i++) {
//     const podcast = await prisma.podcast.create({
//       data: {
//         title: faker.company.buzzPhrase(),
//         host: faker.person.fullName(),
//         image: faker.image.urlPicsumPhotos(),
//         rating: faker.number.float({ min: 3.5, max: 5.0 }),
//         listeners: faker.number.int({ min: 1000, max: 50000 }),
//         duration: `${faker.number.int({ min: 30, max: 90 })} minutes`,
//         category: "Technology",
//         description: faker.lorem.paragraph(),
//       },
//     });

//     for (let j = 0; j < 5; j++) {
//       await prisma.podcastEpisode.create({
//         data: {
//           title: faker.lorem.words(4),
//           duration: `${faker.number.int({ min: 20, max: 60 })} minutes`,
//           date: faker.date.past(),
//           description: faker.lorem.sentence(),
//           podcastId: podcast.id,
//         },
//       });
//     }
//   }

//   // --- Seed YouTube Channels ---
//   await Promise.all(
//     Array.from({ length: 20 }).map(() =>
//       prisma.youTubeChannel.create({
//         data: {
//           title: faker.company.name(),
//           creator: faker.person.fullName(),
//           image: faker.image.avatar(),
//           subscribers: `${faker.number.int({ min: 10000, max: 1000000 })}`,
//           category: "Programming",
//           videos: faker.number.int({ min: 10, max: 500 }),
//         },
//       })
//     )
//   );

//   console.log(
//     "✅ Seed completed with relational consistency and higher volume!"
//   );
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
