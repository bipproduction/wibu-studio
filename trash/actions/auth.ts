// 'use server'
// import { createSession, deleteSession } from "@/lib/session";
// import bcrypt from "bcrypt";
// import { redirect } from "next/navigation";
// import { FormState, SignupFormSchema } from "../../src/lib/definitions";
// import prisma from "../../src/lib/prisma";

// export async function logout() {
//   deleteSession();
//   redirect("/login");
// }

// export async function signup(state: FormState, formData: FormData) {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const validatedFields = SignupFormSchema.safeParse({
//     name,
//     email,
//     password,
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.formErrors.fieldErrors,
//       message: "An error occurred while creating your account.",
//     };
//   }

//   const hashedPassword = await bcrypt.hash(password as string, 10);

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   if (!user) {
//     return {
//       message: "An error occurred while creating your account.",
//     };
//   }

//   await createSession(user.id);
//   // 5. Redirect user
//   redirect("/profile");
// }
