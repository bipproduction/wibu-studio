'use client'

import { Button, Container, Flex, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"

const defaultForm: any = {
    name: null,
    email: null,
    password: null
}
export function FormSignup() {
    const [form, setForm] = useState(defaultForm)

    async function onSubmit() {

        if (!form.name || !form.email || !form.password) {
            return alert("Please fill in all fields")
        }

        const res = await fetch('/signup/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (!res.ok) {
            const text = await res.text()
            return alert(text)
        }

        window.location.href = '/login'
    }
    return <Stack h={'100vh'} w={'100vw'}  >
        <Container maw={400} pos={"relative"} top={"10%"} >
            <Stack>
                <Title order={3}>Signup</Title>
                <TextInput placeholder="Name" defaultValue={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextInput type="email" placeholder="Email" defaultValue={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <PasswordInput placeholder="Password" defaultValue={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <Group justify="flex-end">
                    <Button onClick={onSubmit}>Submit</Button>
                </Group>
                <Flex>
                    <Text>Already have an account?</Text>
                    <Button size="compact-xs" variant="transparent" component={Link} href={'/login'}>Login</Button>
                </Flex>
            </Stack>
        </Container>
    </Stack>
}