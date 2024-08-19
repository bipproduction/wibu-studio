import prisma from "@/app/auth/_lib/prisma";
import { createSession } from "@/app/auth/_lib/session";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const { email, password } = (await req.json()) as any;
  const hashPassword = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return new Response("Please fill in all fields", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 400 });
  }

  const isValidPassword = await bcrypt.compare(hashPassword, user.password);

  if (!isValidPassword) {
    return new Response("Invalid password", { status: 400 });
  }


  await createSession(user.id);

  return new Response("Success", { status: 200 });
}
