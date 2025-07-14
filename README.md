<img width="1909" height="978" alt="image" src="https://github.com/user-attachments/assets/d93ed41b-26a1-4196-acc2-73106575e6a2" />






















Ecommerce Project
Ecommerce Project This project is a sample ecommerce website with CMS simulation, Razorpay integration, and Wix Velo code examples.

Features Product catalog with CMS simulation (JSON-based) Shopping cart functionality Razorpay payment integration Responsive design (mobile-friendly) Wix Velo backend and frontend code examples Project Structure

Project Structure

ecommerce-project/ ├── index.html ├── styles/ │ ├── main.css │ └── responsive.css ├── scripts/ │ ├── main.js │ ├── cart.js │ ├── api.js │ └── velo-code.js ├── images/ │ ├── products/ │ ├── hero-bg.jpg │ └── icons/ ├── data/ │ ├── products.json │ └── cms-structure.json ├── documentation/ │ ├── README.md │ ├── API-Guide.md │ └── CMS-Setup.md └── wix-files/ ├── velo-backend.js ├── velo-frontend.js └── cms-collections.js

Getting Started Prerequisites Node.js (for running a local server) or Python Running Locally Open a terminal in the project folder. Start a local server: With Node.js: npx serve -l 8080 Or with Python: python -m http.server 8080 Open http://localhost:8080 in your browser. Debugging in VS Code Use the provided launch.json to launch Chrome against your local server. Usage Browse products on the main page. Add products to the cart and proceed to checkout. Payments are simulated using Razorpay integration. API Integration Razorpay integration details are in API-Guide.md. CMS Simulation Product data is managed in products.json. CMS structure is defined in cms-structure.json. See CMS-Setup.md for more info. Wix Velo Code Example backend and frontend code for Wix Velo is in the wix-files directory. Contributing Contributions are welcome! Please open issues or submit pull requests for improvements.


