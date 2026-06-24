# Source: https://docs.novu.co/community/self-hosting-novu/overview

Self hosting novu

# Self-Hosting Novu Overview

Self-host Novu for full control over your notification infrastructure. Covers system requirements, VMs, Redis, MongoDB, and storage.

When self-hosting Novu, you take full control over your communication infrastructure by deploying it on your own servers. While this setup allows for customization and greater flexibility, it is important to note that some features exclusive to Novu's cloud-managed solution will not be available in a self-hosted environment.

Self-hosting Novu does not support social login (GitHub, Google, etc.). To access your account, please use the email and password associated with your Novu account.

## [System requirements overview](https://docs.novu.co/#system-requirements-overview)

### [Multi-VM deployment (recommended)](https://docs.novu.co/#multi-vm-deployment-recommended)

For optimal performance, host Novu's core services across multiple virtual machines.

| Component | Instances | Specs |
| --- | --- | --- |
| Novu services (API, Worker, WS) | 3 VMs per service | 2 vCPUs, 4 GB RAM each |
| Dashboard | 1 VM | 2 vCPUs, 4 GB RAM |
| Redis | 2 clusters (one for queues with AOF enabled) | 8 GB RAM per cluster |
| MongoDB | 1 cluster | M20 or higher (MongoDB Atlas) |
| S3 storage | — | 10 GB minimum |

### [Single-VM deployment](https://docs.novu.co/#single-vm-deployment)

If resources are limited or simplicity is a priority, all services can run on a single VM.

| Component | Specs |
| --- | --- |
| All Novu services (API, Worker, WS, Dashboard) | 4 vCPUs, 8 GB RAM |
| MongoDB | 2 GB RAM, 20 GB disk |
| Redis | 2 GB RAM, AOF enabled |
| S3 storage | 10 GB minimum |

### [Infrastructure details](https://docs.novu.co/#infrastructure-details)

#### [Redis](https://docs.novu.co/#redis)

| Setting | Value |
| --- | --- |
| Clusters | 2 (one dedicated to queues) |
| Memory | 8 GB RAM per cluster |
| Persistence | Append Only File (AOF) enabled on the queue cluster to prevent job loss during outages |

#### [MongoDB](https://docs.novu.co/#mongodb)

| Setting | Value |
| --- | --- |
| Cluster tier | M20 or higher on MongoDB Atlas |

#### [Storage](https://docs.novu.co/#storage)

| Setting | Value |
| --- | --- |
| S3 storage | 10 GB minimum |

The above specifications are general recommendations. Adjust them based on your system load, usage patterns, and scale of operations.

[Community Overview\\ \\ Get started and get involved with the Novu Project](https://docs.novu.co/community) [Deploy with Docker\\ \\ Learn how to deploy Novu with Docker](https://docs.novu.co/community/self-hosting-novu/deploy-with-docker)

### On this page

[System requirements overview](https://docs.novu.co/#system-requirements-overview) [Multi-VM deployment (recommended)](https://docs.novu.co/#multi-vm-deployment-recommended) [Single-VM deployment](https://docs.novu.co/#single-vm-deployment) [Infrastructure details](https://docs.novu.co/#infrastructure-details) [Redis](https://docs.novu.co/#redis) [MongoDB](https://docs.novu.co/#mongodb) [Storage](https://docs.novu.co/#storage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/community/self-hosting-novu/overview.mdx)Open in ChatGPTOpen in Claude