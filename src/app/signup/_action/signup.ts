import { SignupFormSchema } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
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
