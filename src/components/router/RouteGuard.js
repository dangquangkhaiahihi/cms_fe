import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {KEY_USER} from "../../constant";

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        console.log(url);
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        console.log(publicPaths,path);
        const userDetail = localStorage.getItem("access_token");
        if (!userDetail && !path.includes('login')) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}

export default RouteGuard;
