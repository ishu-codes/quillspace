import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      // username: "admin",
      // id: "admin",
      name: "Admin",
      email: "admin@example.com",
      // hashedPassword: await bcrypt.hash("admin123", 10),
      // role: "admin",
      userInfo: {
        create: {
          username: "admin",
          role: "admin",
        },
      },
    },
  });

  const users = [
    {
      email: "arvind@example.com",
      username: "arvindkumar",
      name: "Arvind Kumar",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*vwyC5BXxsw-6prw03lXBdQ.png",
      posts: [
        {
          title:
            "Building a Ticketing System: Concurrency, Locks, and Race Conditions",
          desc: "Lessons learnt after working with agents for over an year.",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XdhspB1zG5ByRO2NlzIreg.png",
          slug: "ticketing-system-concurrency",
        },
      ],
      role: "author",
    },
    {
      email: "hayk@example.com",
      username: "hayk",
      name: "Hayk Simonyan",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*5D9oYBd58pyjMkV_5-zXXQ.jpeg",
      posts: [
        {
          title: "Why Most Developers Stay Mid Forever",
          desc: "If there is just one skill I can transfer to you from all my years working as a senior software engineer, it will be this one.",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Gy3uJTUwaEb2XuNCYfBSLw.png",
          slug: "why-devs-stay-mid",
        },
        {
          title: "How to Scale Like a Senior Engineer",
          desc: "Most developers think scaling is complicated. They see “system design” and immediately think they need years of experience or some magical…",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*w6vi8U5ghMB4kUWXSk9TAA.png",
          slug: "scale-like-senior",
        },
      ],
      role: "author",
    },
    {
      email: "ashok@example.com",
      username: "ashokreddy",
      name: "Ashok Reddy",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*iv0zBWTSfqvM0gsyVVgS3A.jpeg",
      posts: [
        {
          title: "I Cut React Component Re-Renders by 40%",
          desc: "I Cut React Component Re-Renders by 40% — Here’s the Surprising Fixes That Worked",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*mrKawyepnNmoK8UTm0IIsw.png",
          slug: "react-rerenders-40",
        },
      ],
      role: "author",
    },
    {
      email: "atomiarchitect@example.com",
      username: "atomicarchitect",
      name: "The Atomic Architect",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*HYSmdNFZmkEdTrmCvMnFRw.jpeg",
      posts: [
        {
          title: "Architecture Patterns That Actually Scale in 2025",
          desc: "Last month, a company I advised shut down.",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*tAJ-QxKPO53osRHO8vcfOw.jpeg",
          slug: "architecture-patterns-2025",
        },
      ],
      role: "author",
    },
    {
      email: "tosny@example.com",
      username: "tosny",
      name: "Tosny",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*l5wpk3oO8kTVPfuWaB5LhA.png",
      posts: [
        {
          title: "7 Websites I Visit Every Day in 2025",
          desc: "If there is one thing I am addicted to, besides coffee, it is the internet.",
          featuredImg:
            "If there is one thing I am addicted to, besides coffee, it is the internet.",
          slug: "websites-every-day-2025",
        },
      ],
      role: "author",
    },
    {
      email: "abhinav@example.com",
      username: "abhinav",
      name: "Abhinav",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*1LeQem95HFCjYrJAER8NBQ.png",
      posts: [
        {
          title: "Why Microservices Are Out and Monoliths Are Returning",
          desc: "For years, we were told microservices were the future.",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*sRe9SSSWZH8aQWHH.jpg",
          slug: "monoliths-return",
        },
      ],
      role: "author",
    },
    {
      email: "codeorbit@example.com",
      username: "codeorbit",
      name: "CodeOrbit",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*9gQO7o9Ac_v3KwHsC0bY3Q.jpeg",
      posts: [
        {
          title: "I Rebuilt My RAG Pipeline 11 Times",
          desc: "How I went from $8,400/month cloud costs and 18-second queries to $1,240/month and 420ms response times after 11 failed attempts.",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NybUdowBAV76fcQKbmOrNA.png",
          slug: "rag-pipeline-11-times",
        },
      ],
      role: "author",
    },
    {
      email: "dax@example.com",
      username: "dax",
      name: "Dax",
      img: "https://miro.medium.com/v2/resize:fill:176:176/1*emTzFN1s9VXXZ64L1a7blw.png",
      posts: [
        {
          title: "This Tiny Open-Source Project Is Doing What Kafka Couldn’t",
          desc: "Turns out, the real bottleneck wasn’t Kafka. It was us pretending to understand it.",
          featuredImg:
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NYO7c5_nGSPyHO0Ay4bbCw.png",
          slug: "kafka-alternative",
        },
      ],
      role: "author",
    },
  ];

  // await Promise.all(
  //     users.map(async (u) =>
  //         prisma.user.upsert({
  //             where: { email: u.email },
  //             update: {},
  //             create: {
  //                 email: u.email,
  //                 username: u.username,
  //                 name: u.name,
  //                 hashedPassword: await bcrypt.hash(
  //                     `${u.username}123`,
  //                     5 + Math.round(Math.random() * 5)
  //                 ),
  //                 role: u.role,
  //                 posts: {
  //                     create: u.posts.map((p) => ({
  //                         title: p.title,
  //                         desc: p.desc,
  //                         featuredImg: p.featuredImg,
  //                         content: "Sample content.",
  //                         slug: p.slug,
  //                         status: "published",
  //                         publishedAt: new Date().toISOString(),
  //                     })),
  //                 },
  //             },
  //         })
  //     )
  // );

  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
