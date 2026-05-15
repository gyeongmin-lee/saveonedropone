import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

function withoutAppRuntimePlugins(plugins: PluginOption[] = []) {
  return plugins.filter((plugin) => {
    if (
      !plugin ||
      Array.isArray(plugin) ||
      typeof plugin === "function" ||
      plugin instanceof Promise
    ) {
      return true;
    }

    const name = "name" in plugin ? plugin.name ?? "" : "";
    return !name.includes("react-router") && !name.includes("cloudflare");
  });
}

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(ts|tsx)"],
  core: {
    disableTelemetry: true,
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: ["storybook-addon-remix-react-router"],
  viteFinal: async (config) => {
    config.plugins = [
      ...withoutAppRuntimePlugins(config.plugins),
      tailwindcss(),
      tsconfigPaths(),
    ];
    return config;
  },
};

export default config;
