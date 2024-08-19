import { SignupFormSchema } from "@/app/auth/_lib/definitions";
import prisma from "@/app/auth/_lib/prisma";
import { createSession } from "@/app/auth/_lib/session";
import bcrypt from "bcrypt";

export async function signup(fomData: any) {
  const { name, email, password } = fomData;

  const validatedFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      message: "An error occurred while creating your account.",
    };
  }
  const hashedPassword = await bcrypt.hash(password as string, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      erros: "An error occurred while creating your account.",
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);
  return { user };
}
