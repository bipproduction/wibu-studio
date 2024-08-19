import { signup } from "../../_action/signup";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response("Please fill in all fields", { status: 400 });
  }

  const sup = await signup({ name, email, password });

  if (sup.errors) {
    console.log(sup.errors);
    return new Response(JSON.stringify(sup.errors), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ name, email, password }), {
    status: 200,
  });
}
