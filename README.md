# Task Manager — Cloud-Native DevOps Project

A full-stack Task Manager application built with React, Node.js, Express, and MongoDB Atlas, containerized using Docker, with Kubernetes deployment and DevOps automation planned as the next development phase.

The goal of this project is to learn and demonstrate practical skills in containerization, application deployment, Kubernetes orchestration, CI/CD, monitoring, and cloud-native infrastructure.

## Project Overview

The application allows users to view existing tasks and create new tasks through a React frontend connected to a Node.js REST API. Tasks are persisted in MongoDB Atlas.

The frontend and backend run in separate Docker containers, demonstrating service separation and independent container management.

## Architecture

```text
                 User / Browser
                       |
                       v
            +---------------------+
            |   React Frontend    |
            |   Nginx Container   |
            |      Port 8080      |
            +---------------------+
                       |
                  HTTP Requests
                       |
                       v
            +---------------------+
            |   Node.js Backend   |
            |  Express REST API   |
            |      Port 3000      |
            +---------------------+
                       |
                       v
            +---------------------+
            |    MongoDB Atlas    |
            |   Cloud Database    |
            +---------------------+
```

**Current status:** The application runs locally using Docker containers. Kubernetes deployment, CI/CD automation, monitoring, and security enhancements are planned.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Containerization | Docker, Dockerfile |
| Web Server | Nginx |
| Orchestration | Kubernetes, Minikube (next phase) |
| Version Control | Git, GitHub |

## Features

- React-based task management interface.
- REST API built with Node.js and Express.
- Create tasks and retrieve existing tasks.
- Persistent task storage using MongoDB Atlas.
- Separate frontend and backend Docker images.
- Multi-stage Docker build for the frontend.
- Runtime environment configuration for database credentials.
- Container lifecycle management using Docker commands.
- Local application testing through HTTP endpoints.

## Project Structure

```text
k8s-task-manager/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   └── package.json
├── k8s/
├── README.md
└── .gitignore
```

The exact contents of each directory may evolve as the project develops.

## Prerequisites

Install the following tools before running the project:

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- A MongoDB Atlas cluster with a database user and appropriate network access.

## Run Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd k8s-task-manager
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` as a reference:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Use your own MongoDB Atlas connection string. Never commit `.env` or expose database credentials in source code.

Start the backend:

```bash
npm start
```

If your `package.json` does not define a start script, use the command configured for your project, such as `node server.js`.

### 3. Run the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Ensure the frontend API URL points to the running backend.

## Run with Docker

The project has separate Docker images for the frontend and backend.

### 1. Build the backend image

```bash
cd backend
docker build -t task-manager-backend:1.0 .
```

### 2. Run the backend container

```bash
docker run -d \
  --name task-manager-api \
  -p 3000:3000 \
  --env-file .env \
  task-manager-backend:1.0
```

### 3. Build the frontend image

```bash
cd ../frontend
docker build -t task-manager-frontend:1.0 .
```

### 4. Run the frontend container

```bash
docker run -d \
  --name my-frontend \
  -p 8080:80 \
  task-manager-frontend:1.0
```

Open `http://localhost:8080` to access the application.

**Note:** These commands assume the frontend is configured to call the backend at `http://localhost:3000` from the browser. If your frontend uses a different API configuration, adjust it accordingly.

### 5. Verify running containers

```bash
docker ps
```

View container logs:

```bash
docker logs task-manager-api
docker logs my-frontend
```

Test the backend:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/tasks
```

The health endpoint should return a successful response, and the tasks endpoint should return the stored task list.

## Security Practices

- Store database credentials in environment variables.
- Exclude `.env` files from Git and Docker build contexts.
- Never commit real passwords, API keys, or database connection strings.
- Configure MongoDB Atlas network access with appropriate restrictions.
- Use least-privilege database credentials.
- Avoid exposing unnecessary container ports.

## Kubernetes Roadmap

The next phase is to deploy the existing Dockerized application to a local Minikube cluster.

Planned improvements:

- [ ] Create Kubernetes Deployments for the frontend and backend.
- [ ] Configure Kubernetes Services and application networking.
- [ ] Manage configuration using ConfigMaps and Secrets.
- [ ] Add readiness and liveness probes.
- [ ] Configure resource requests and limits.
- [ ] Practise scaling, Pod recovery, and rolling updates.
- [ ] Add Helm charts for reusable deployments.
- [ ] Build a CI/CD pipeline using GitHub Actions.
- [ ] Scan container images using Trivy.
- [ ] Integrate Prometheus and Grafana.
- [ ] Explore deployment to AWS EKS.

## Learning Objectives

This project is designed to develop practical experience with:

- Docker images, containers, and multi-stage builds.
- REST API communication between frontend and backend services.
- Environment-based application configuration.
- Database connectivity and persistence.
- Kubernetes workload orchestration.
- CI/CD, observability, and container security.

## Author

**Tirth Raval**

GitHub: [Your GitHub Profile](https://github.com/)

This project is part of my hands-on learning journey in DevOps, Docker, Kubernetes, and cloud-native application deployment.

---

If you find this project useful, feel free to explore the repository and follow its development.