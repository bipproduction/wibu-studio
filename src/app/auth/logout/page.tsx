'use client'
import { Button, Container, Stack, Title } from "@mantine/core";
import { redirect } from "next/navigation";

export default function Page() {

    async function onLogout() {

        const res = await fetch('/logout/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (res.ok) {
            window.location.href = '/login'
        }
    }
    return <Stack h={'100vh'} w={'100vw'}>
        <Container maw={400}>
            <Stack>
                <Title order={3}>Logout</Title>
                <Button onClick={onLogout}>Logout</Button>
            </Stack>
        </Container>
    </Stack>
}