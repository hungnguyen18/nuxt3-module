# Runtime Directory
When using the starter, the runtime directory is available at `src/runtime`.

Modules, like everything in a Nuxt configuration, aren't included in your application runtime. However, you might want your module to provide, or inject runtime code to the application it's installed on. That's what the runtime directory enables you to do.

Inside the runtime directory, you can provide any kind of assets related to the Nuxt App:
- Vue components
- Composables
- Nuxt plugins

To the server engine, Nitro:
- API routes
- Middlewares
- Nitro plugins

Or any other kind of asset you want to inject in users' Nuxt applications:
- Stylesheets
- 3D models
- Images
- etc.

You'll then be able to inject all those assets inside the application from your module definition.

Learn more about asset injection in the recipes section.

Published modules cannot leverage auto-imports for assets within their runtime directory. Instead, they have to import them explicitly from #imports or alike.Indeed, auto-imports are not enabled for files within node_modules (the location where a published module will eventually live) for performance reasons.If you are using the module starter, auto-imports will not be enabled in your playground either.