import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

function withoutAppRuntimePlugins(plugins: PluginOption[] = []): PluginOption[] {
  return plugins.flatMap((plugin) => {
    if (
      !plugin ||
      typeof plugin === "function" ||
      plugin instanceof Promise
    ) {
      return [plugin];
    }

    if (Array.isArray(plugin)) {
      return withoutAppRuntimePlugins(plugin);
    }

    const name = "name" in plugin ? plugin.name ?? "" : "";
    return name.includes("react-router") || name.includes("cloudflare") ? [] : [plugin];
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
