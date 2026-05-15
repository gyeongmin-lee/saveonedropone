import type { Preview } from "@storybook/react-vite";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import "../app/app.css";

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    backgrounds: {
      default: "app",
      values: [{ name: "app", value: "#0e0e12" }],
    },
    reactRouter: reactRouterParameters({
      location: {
        path: "/",
      },
      routing: {
        path: "/",
      },
    }),
  },
};

export default preview;
