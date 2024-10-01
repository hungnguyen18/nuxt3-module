# Atomic Components
We don't have to rewrite atomic components already developed by the libraries (in order of preference) below:
1. [PrimeVue](https://tailwind.primevue.org/overview/)
2. [RadixUI](https://www.radix-vue.com/)
3. [ShadCN](https://www.shadcn-vue.com/)

Maybe:
4. [VueSax](https://vuesax.com/)
5. [NuxtUI](https://ui.nuxt.com/)


# Guideline for choosing components
We should avoid using multiple version of the same atomic components, therefore, please follow this guide:

| Component    | Library                      |
| ------------ | ---------------------------- |
| Notification | https://notivue.smastrom.io/ |


# Extending Components

In this repo, we extend various components from different sources. Here:
| Component | Base Component from | What's extended                       |
| --------- | ------------------- | ------------------------------------- |
| Image     | PriveVue            | Image composables for srcsets, resize |
| Footer    | Flowbite            | Create components                     |
| Breadcrum | PrimeVue            | Structured Data                       |