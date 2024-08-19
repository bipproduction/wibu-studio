'use client'
import { Button, Container, Flex, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const defauktForm: any = {
    email: null,
    password: null
}
export default function Page() {
    const [loginForm, setLoginForm] = useState(defauktForm)

    async function onSubmit() {

        if (!loginForm.email || !loginForm.password) {
            return alert("Please fill in all fields")
        }

        const res = await fetch('/login/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })


        if (!res.ok) {
            const text = await res.text()
            return alert(text)
        }

    }
    return (
        <Stack h={'100vh'} w={'100vw'}>
            <Container maw={400} pos={"relative"} top={"10%"}>
                <Stack>
                    <Title order={3}>Login</Title>
                    <TextInput placeholder="Email" defaultValue={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                    <TextInput type="password" placeholder="Password" defaultValue={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                    <Button onClick={onSubmit}>Login</Button>
                    <Flex align={'center'}>
                        <Text>Don't have an account?</Text>
                        <Button size="compact-xs" variant="transparent" component={Link} href={'/signup'}>Signup</Button>
                    </Flex>
                </Stack>
            </Container>
        </Stack>
    )
}