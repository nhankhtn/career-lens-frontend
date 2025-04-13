export interface Resource {
    id: string
    title: string
    platform: string
    url: string
    free: boolean
    duration?: string
  }
  
  export interface TopicWithResources {
    title: string
    description: string
    resources: Resource[]
  }
  
  interface RoadmapDetail {
    id: string
    title: string
    description: string
    faq: string
    topics: string[]
    topicsWithResources: TopicWithResources[]
    projects: string[]
  }
  
  const frontendTopicsWithResources: TopicWithResources[] = [
    {
      title: "Internet Basics (DNS, HTTP, Browsers)",
      description: "Learn how the internet works, including DNS, HTTP protocols, and browser rendering.",
      resources: [
        {
          id: "internet-1",
          title: "How Does the Internet Work?",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=x3c1ih2NJEg",
          free: true,
          duration: "12 min",
        },
        {
          id: "internet-2",
          title: "Introduction to Networking",
          platform: "Coursera",
          url: "https://www.coursera.org/learn/computer-networking",
          free: false,
          duration: "4 weeks",
        },
        {
          id: "internet-3",
          title: "HTTP and Web Servers",
          platform: "Udacity",
          url: "https://www.udacity.com/course/http-web-servers--ud303",
          free: true,
          duration: "2 weeks",
        },
      ],
    },
    {
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML, the markup language used to structure web content.",
      resources: [
        {
          id: "html-1",
          title: "HTML Crash Course For Absolute Beginners",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          free: true,
          duration: "1 hour",
        },
        {
          id: "html-2",
          title: "HTML5 and CSS Fundamentals",
          platform: "edX",
          url: "https://www.edx.org/course/html5-and-css-fundamentals",
          free: true,
          duration: "6 weeks",
        },
        {
          id: "html-3",
          title: "HTML & CSS - Certification Course for Beginners",
          platform: "Udemy",
          url: "https://www.udemy.com/course/html-css-certification-course-for-beginners/",
          free: false,
          duration: "4 hours",
        },
      ],
    },
    {
      title: "CSS Fundamentals",
      description: "Learn CSS to style and layout web pages with responsive design principles.",
      resources: [
        {
          id: "css-1",
          title: "CSS Crash Course For Absolute Beginners",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=yfoY53QXEnI",
          free: true,
          duration: "1.5 hours",
        },
        {
          id: "css-2",
          title: "CSS - The Complete Guide 2023",
          platform: "Udemy",
          url: "https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/",
          free: false,
          duration: "22 hours",
        },
        {
          id: "css-3",
          title: "Learn CSS",
          platform: "web.dev",
          url: "https://web.dev/learn/css/",
          free: true,
          duration: "Self-paced",
        },
      ],
    },
    {
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript, the programming language of the web.",
      resources: [
        {
          id: "js-1",
          title: "JavaScript Crash Course For Beginners",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
          free: true,
          duration: "1.5 hours",
        },
        {
          id: "js-2",
          title: "The Complete JavaScript Course 2023",
          platform: "Udemy",
          url: "https://www.udemy.com/course/the-complete-javascript-course/",
          free: false,
          duration: "69 hours",
        },
        {
          id: "js-3",
          title: "JavaScript: Understanding the Weird Parts",
          platform: "Udemy",
          url: "https://www.udemy.com/course/understand-javascript/",
          free: false,
          duration: "11.5 hours",
        },
      ],
    },
    {
      title: "Version Control Systems (Git)",
      description: "Learn Git for version control and collaboration in software development.",
      resources: [
        {
          id: "git-1",
          title: "Git & GitHub Crash Course For Beginners",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
          free: true,
          duration: "30 min",
        },
        {
          id: "git-2",
          title: "Version Control with Git",
          platform: "Coursera",
          url: "https://www.coursera.org/learn/version-control-with-git",
          free: false,
          duration: "4 weeks",
        },
        {
          id: "git-3",
          title: "Git Complete: The definitive, step-by-step guide",
          platform: "Udemy",
          url: "https://www.udemy.com/course/git-complete/",
          free: false,
          duration: "6 hours",
        },
      ],
    },
    {
      title: "Package Managers (npm, yarn)",
      description: "Learn about package managers to manage dependencies in your projects.",
      resources: [
        {
          id: "npm-1",
          title: "NPM Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=jHDhaSSKmB0",
          free: true,
          duration: "30 min",
        },
        {
          id: "npm-2",
          title: "Yarn Package Manager Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=g9_6KmiBISk",
          free: true,
          duration: "20 min",
        },
        {
          id: "npm-3",
          title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
          platform: "Udemy",
          url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
          free: false,
          duration: "42 hours",
        },
      ],
    },
    {
      title: "CSS Frameworks (Bootstrap, Tailwind CSS)",
      description: "Learn popular CSS frameworks to speed up your development process.",
      resources: [
        {
          id: "cssfw-1",
          title: "Bootstrap 5 Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=4sosXZsdy-s",
          free: true,
          duration: "1.5 hours",
        },
        {
          id: "cssfw-2",
          title: "Tailwind CSS Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=UBOj6rqRUME",
          free: true,
          duration: "1 hour",
        },
        {
          id: "cssfw-3",
          title: "Tailwind CSS From Scratch",
          platform: "Udemy",
          url: "https://www.udemy.com/course/tailwind-from-scratch/",
          free: false,
          duration: "12 hours",
        },
      ],
    },
    {
      title: "CSS Preprocessors (Sass, Less)",
      description: "Learn CSS preprocessors to enhance your CSS with variables, nesting, and more.",
      resources: [
        {
          id: "sass-1",
          title: "Sass Tutorial for Beginners",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=_a5j7KoflTs",
          free: true,
          duration: "1 hour",
        },
        {
          id: "sass-2",
          title: "Advanced CSS and Sass",
          platform: "Udemy",
          url: "https://www.udemy.com/course/advanced-css-and-sass/",
          free: false,
          duration: "28 hours",
        },
        {
          id: "sass-3",
          title: "Less CSS Preprocessor Tutorial",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=YD91G8DdUsw",
          free: true,
          duration: "30 min",
        },
      ],
    },
    {
      title: "JavaScript Frameworks (React, Vue, Angular)",
      description: "Learn popular JavaScript frameworks for building modern web applications.",
      resources: [
        {
          id: "react-1",
          title: "React JS Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
          free: true,
          duration: "1.5 hours",
        },
        {
          id: "vue-1",
          title: "Vue.js Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=qZXt1Aom3Cs",
          free: true,
          duration: "2 hours",
        },
        {
          id: "angular-1",
          title: "Angular Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=3dHNOWTI7H8",
          free: true,
          duration: "2 hours",
        },
        {
          id: "react-2",
          title: "React - The Complete Guide",
          platform: "Udemy",
          url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
          free: false,
          duration: "48 hours",
        },
      ],
    },
    {
      title: "State Management",
      description: "Learn state management solutions for complex applications.",
      resources: [
        {
          id: "redux-1",
          title: "Redux Toolkit Crash Course",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=bbkBuqC1rU4",
          free: true,
          duration: "1 hour",
        },
        {
          id: "context-1",
          title: "React Context & Hooks Tutorial",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=6RhOzQciVwI",
          free: true,
          duration: "30 min",
        },
        {
          id: "zustand-1",
          title: "Zustand Tutorial - React State Management",
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=KCr-UNsM3VQ",
          free: true,
          duration: "20 min",
        },
      ],
    },
  ]
  
  // Add more topics with resources as needed...
  
  const roadmapDetails: Record<string, RoadmapDetail> = {
    frontend: {
      id: "frontend",
      title: "Frontend Developer",
      description: "Step by step guide to becoming a modern frontend developer in 2025",
      faq: "A Frontend Developer is responsible for developing the user interface and user experience of websites and web applications. They work with HTML, CSS, and JavaScript to create responsive and interactive web pages that users can see and interact with directly. Frontend developers ensure that the design and functionality of a website work properly across different browsers, devices, and screen sizes.",
      topics: [
        "Internet Basics (DNS, HTTP, Browsers)",
        "HTML Fundamentals",
        "CSS Fundamentals",
        "JavaScript Basics",
        "Version Control Systems (Git)",
        "Package Managers (npm, yarn)",
        "CSS Frameworks (Bootstrap, Tailwind CSS)",
        "CSS Preprocessors (Sass, Less)",
        "JavaScript Frameworks (React, Vue, Angular)",
        "State Management",
        "Modern CSS (Flexbox, Grid, Custom Properties)",
        "Web Components",
        "Progressive Web Apps",
        "Performance Optimization",
        "Testing (Unit, Integration, E2E)",
        "TypeScript",
        "Server-Side Rendering / Static Site Generation",
        "GraphQL",
        "Mobile Development (React Native)",
        "Web Security Basics",
      ],
      topicsWithResources: frontendTopicsWithResources,
      projects: [
        "Personal Portfolio Website",
        "E-commerce Product Page",
        "Weather Application using APIs",
        "Task Management Application",
        "Social Media Dashboard",
        "Blog Platform with CMS",
        "Real-time Chat Application",
        "Interactive Data Visualization",
        "Online Quiz or Survey Application",
        "Restaurant Reservation System",
      ],
    },
    backend: {
      id: "backend",
      title: "Backend Developer",
      description: "Step by step guide to becoming a modern backend developer in 2025",
      faq: "A Backend Developer focuses on the server-side of web applications. They are responsible for creating and maintaining the core functionality of web applications, working with databases, server logic, APIs, and application architecture. Backend developers ensure that the data or services requested by the frontend are delivered efficiently.",
      topics: [
        "Internet Basics (DNS, HTTP, Hosting)",
        "Programming Language (Node.js, Python, Java, etc.)",
        "Version Control Systems (Git)",
        "Relational Databases (MySQL, PostgreSQL)",
        "NoSQL Databases (MongoDB, Redis)",
        "APIs (REST, GraphQL)",
        "Authentication & Authorization",
        "Caching Strategies",
        "Web Security",
        "Testing (Unit, Integration, E2E)",
        "Containerization (Docker)",
        "CI/CD Pipelines",
        "Cloud Services (AWS, Azure, GCP)",
        "Serverless Architecture",
        "Microservices",
        "Message Brokers (RabbitMQ, Kafka)",
        "Search Engines (Elasticsearch)",
        "WebSockets",
        "GraphQL",
        "Performance Optimization",
      ],
      topicsWithResources: [], // This would be populated similar to frontendTopicsWithResources
      projects: [
        "RESTful API for a Blog",
        "Authentication System",
        "E-commerce Backend",
        "Real-time Chat Server",
        "Task Scheduling Service",
        "Payment Processing System",
        "Content Management System",
        "File Upload and Storage Service",
        "Social Media API",
        "Data Analytics Pipeline",
      ],
    },
    devops: {
      id: "devops",
      title: "DevOps Engineer",
      description: "Step by step guide to becoming a DevOps engineer in 2025",
      faq: "A DevOps Engineer works at the intersection of development and operations, focusing on improving collaboration between these teams and automating the process of software delivery and infrastructure changes. They implement practices that reduce the time between committing code changes and deploying them to production while ensuring high quality.",
      topics: [
        "Operating Systems (Linux)",
        "Programming & Scripting (Python, Bash)",
        "Version Control Systems (Git)",
        "Networking Fundamentals",
        "Containerization (Docker)",
        "Container Orchestration (Kubernetes)",
        "Infrastructure as Code (Terraform, CloudFormation)",
        "Configuration Management (Ansible, Chef, Puppet)",
        "CI/CD Pipelines (Jenkins, GitHub Actions)",
        "Cloud Platforms (AWS, Azure, GCP)",
        "Monitoring & Logging (Prometheus, Grafana, ELK Stack)",
        "Security Practices (DevSecOps)",
        "Database Administration",
        "Service Mesh (Istio)",
        "Serverless Computing",
        "Microservices Architecture",
        "Site Reliability Engineering Practices",
        "Cost Optimization",
        "Disaster Recovery & Backup Strategies",
        "Performance Tuning",
      ],
      topicsWithResources: [], // This would be populated similar to frontendTopicsWithResources
      projects: [
        "Automated CI/CD Pipeline",
        "Infrastructure as Code for a Web Application",
        "Containerized Microservices Deployment",
        "Monitoring and Alerting System",
        "Auto-scaling Infrastructure",
        "Disaster Recovery Solution",
        "Security Scanning Integration",
        "Log Management System",
        "Multi-environment Deployment Strategy",
        "Performance Optimization Project",
      ],
    },
  }
  
  export function getRoadmapData(id: string): RoadmapDetail | undefined {
    return roadmapDetails[id]
  }
  
  export function getAllRoadmapIds(): string[] {
    return Object.keys(roadmapDetails)
  }
  