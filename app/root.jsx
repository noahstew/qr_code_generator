import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from "./styles/tailwind.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  return (
    <html className="bg-black">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex justify-center items-center h-screen font-montserrat">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
