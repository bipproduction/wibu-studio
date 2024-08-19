import { Button, Flex, Stack } from "@mantine/core";
import Link from "next/link";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <Stack w={'100vw'}>
        <Flex p={"xs"} justify={"end"}>
            <Button variant="transparent" size="compact-xs" component={Link} href={'/logout'}>Logout</Button>
        </Flex>
        {children}
    </Stack>;
}