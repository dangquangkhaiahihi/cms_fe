import { useEffect } from "react";
import {useRouter} from "next/router";

export default function Wrapper(props) {
    const router = useRouter();
    useEffect(() => {
        router.push('/dashboard')
    });
    return null;
}
