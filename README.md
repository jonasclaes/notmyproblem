# NotMyProblem

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-blue)](https://developers.cloudflare.com/pages/)

**NotMyProblem** is a satire website designed to humorously generate reasons why something is not your problem. Built using SvelteKit and deployed on Cloudflare Pages, the site leverages Cloudflare's D1 database and AI bindings to deliver witty and entertaining content.

## 🚀 Features

- **SvelteKit Framework**: Powered by SvelteKit, offering a responsive and snappy user experience.
- **Cloudflare Pages**: Hosted on Cloudflare Pages, ensuring fast and secure global delivery.
- **Cloudflare D1**: Utilizes Cloudflare's D1 serverless database to store quotes.
- **AI Bindings**: Integrates Cloudflare's AI bindings to craft clever and comical excuses.

## 🌐 Live Site

Check out the fun at [https://notmyproblem.cloud](https://notmyproblem.cloud)

## 🛠️ Getting Started

### Prerequisites

Before getting started, make sure you have:

- [Node.js](https://nodejs.org/) (v20.x or later)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jonasclaes/notmyproblem.git
   cd notmyproblem
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:5173](http://localhost:5173) to see the app in action.

### Deploying

1. **Build for Production**:

   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**:

   Deploy the app with:

   ```bash
   wrangler pages publish ./build
   ```

   Or set up continuous deployment via Cloudflare Pages, linked to this GitHub repository.

## 🤝 Contributing

We welcome contributions! Please feel free to open a Pull Request or submit issues.

## 📄 License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for more information.

## 📧 Contact

For any questions or feedback, reach out to [jonasclaes](https://github.com/jonasclaes) at [jonas@jonasclaes.be](mailto:jonas@jonasclaes.be).
