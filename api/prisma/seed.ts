import { PrismaClient } from "@prisma/client";
// import fs from "node:fs";
// import path from "node:path";

import dataFile from "./data.json" with { type: "json" };
// import bcrypt from "bcrypt";
// import { seedData } from "./utils.js";

const BASE_URL = `http://localhost:${process.env.PORT ?? 1337}`;

interface PostInput {
	title: string;
	desc: string;
	featuredImg: string;
	slug: string;
}

interface UserInput {
	email: string;
	username: string;
	name: string;
	img: string;
	posts: PostInput[];
	role: string;
}

async function request(method: string, url: string, body?: any, cookie?: string) {
	// console.log("URL: " + `${BASE_URL}${url}`);
	const res = await fetch(`${BASE_URL}${url}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			...(cookie ? { Cookie: cookie } : {}),
		},
		credentials: "include",
		body: body ? JSON.stringify(body) : undefined,
	});

	const setCookie = res.headers.get("set-cookie");

	return {
		ok: res.ok,
		status: res.status,
		statusText: res.statusText,
		message: res.text,
		json: await res.json().catch(() => ({})),
		cookie: setCookie || cookie,
	};
}

async function signup(user: UserInput) {
	return request("POST", `/api/auth/sign-up/email`, {
		email: user.email,
		password: user.username + "123456",
		name: user.name,
		// username: user.username,
		image: user.img,
	});
}

async function login(user: UserInput) {
	return request("POST", `/api/auth/sign-in/email`, {
		email: user.email,
		password: user.username + "123456",
	});
}

async function createPost(cookie: string, post: PostInput) {
	return request("POST", `/api/drafts`, post, cookie);
}

export async function seedData() {
	// const filePath = path.join(process.cwd(), "data.json");
	// const file = fs.readFileSync(filePath, "utf-8");
	const users = dataFile as UserInput[];

	for (const user of users) {
		console.log(`\n=== Seeding User: ${user.username} ===`);

		// Attempt signup
		// console.log("Attempting to signup");
		// const signupRes = await signup(user);
		// if (!signupRes.ok && signupRes.status !== 409) {
		// 	console.error("Signup failed:", signupRes.json);
		// 	continue;
		// }

		// // Login to get cookie
		const loginRes = await login(user);
		if (!loginRes.ok) {
			console.error("Login failed:", loginRes.json);
			continue;
		}

		const cookie = loginRes.cookie;
		if (!cookie) {
			console.error("Missing session cookie for", user.email);
			continue;
		}

		console.log("Attempting to post");
		// Create posts
		for (const post of user.posts) {
			const postRes = await createPost(cookie, post);
			if (!postRes.ok) {
				console.error("Post create failed:", `${postRes.status} ${postRes.statusText}: ${postRes.message}`);
			} else {
				console.log("Created post:", post.slug);
			}
		}
	}

	console.log("\nSeeding complete.");
}

const prisma = new PrismaClient();

async function main() {
	// const admin = await prisma.user.create({
	// 	data: {
	// 		// username: "admin",
	// 		// id: "admin",
	// 		name: "Admin",
	// 		email: "admin@example.com",
	// 		// hashedPassword: await bcrypt.hash("admin123", 10),
	// 		// role: "admin",
	// 		// userInfo: {
	// 		//   create: {
	// 		//     username: "admin",
	// 		//     role: "admin",
	// 		//   },
	// 		// },
	// 	},
	// });

	await seedData();
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
