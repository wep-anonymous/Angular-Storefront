# Angular Storefront (Work in Progress)

**Project Description**

`Angular Storefront` is a sample e-commerce front-end application built with Angular. It demonstrates key concepts such as component-based architecture, routing, state management, and integration with external services.

---

## Current Status

> **Work in Progress**
>
> * Application skeleton and core modules are implemented.
> * Basic product listing and detail pages are functional.
> * Shopping cart features and guard-based authentication flow (stub) exist.

---

##  Project Structure

```
src/app/
├── core/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── cart.service.ts
│   │   └── payment.service.ts
│   └── guards/
│       └── auth.guard.ts
├── shared/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── loading-spinner/
│   │   └── product-card/
│   └── pipes/
├── features/
│   ├── products/
│   │   ├── components/
│   │   │   ├── product-list/
│   │   │   ├── product-detail/
│   │   │   └── product-filter/
│   │   └── services/
│   │       └── product.service.ts
│   ├── cart/
│   │   ├── components/
│   │   │   ├── shopping-cart/
│   │   │   └── checkout/
│   │   └── services/
│   └── user/
│       ├── components/
│       │   ├── login/
│       │   ├── register/
│       │   └── profile/
│       └── services/
├── app.component.ts
├── app.config.ts
├── app.routes.ts
└── main.ts
```

---

## Implemented Features

* Core layout with header, footer, and responsive container
* Product listing page with filter component
* Product detail view
* Shopping cart service and components
* Stubbed authentication guard and service
* Basic routing setup

---

## Upcoming Features

* **Responsive Web Design (RWD):** Ensure the application adapts to mobile, tablet, and desktop viewports.
* **Firebase Authentication:** Integrate Firebase Auth for user sign-up, login, and session management.
* **Stripe Integration:** Setup Stripe for secure payment processing via `ngx-stripe`.
* **Consistent Login Status:** Fix inconsistencies in login state across page refreshes and navigation.
* **Unit & E2E Testing:** Add comprehensive tests using Jasmine/Karma and Cypress.

---

## Installation & Development

1. Clone the repository:

   ```bash
   git clone https://github.com/wep-anonymous/Angular-Storefront.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   ng serve
   ```
4. Open your browser at `http://localhost:4200`

---
