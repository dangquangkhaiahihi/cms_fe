import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { NotificationContainer } from "react-notifications";
import DefaultLayout from "../components/layout/DefaultLayout";
import RouteGuard from "../components/router/RouteGuard";
import 'react-notifications/lib/notifications.css';

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const Layout = Component.Layout || DefaultLayout;
  return (
    <Provider store={store}>
        <RouteGuard>
            <Layout>
                <Component {...pageProps} />
                <NotificationContainer />
            
              </Layout>
        </RouteGuard>

    </Provider>
  );
}

