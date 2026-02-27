# Personal Website

My personal portfolio website built with React, TypeScript, and Vite. Deployed to AWS (S3 + CloudFront) with Cloudflare DNS management via Terraform.

## Tech Stack

- React + TypeScript
- Vite
- AWS S3 + CloudFront
- Cloudflare DNS
- Terraform (Infrastructure as Code)
- GitHub Actions (CI/CD)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site automatically deploys to AWS on push to the `master` branch via GitHub Actions.

### Prerequisites

1. AWS account with `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` configured as GitHub repository secrets
2. Cloudflare account with your domain
3. Terraform installed locally for infrastructure setup

### Infrastructure Setup

See [terraform/README.md](terraform/README.md) for detailed instructions on setting up the AWS and Cloudflare infrastructure.

Quick start:
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform apply
```

### GitHub Actions Workflow

The deployment workflow:
1. Builds the React app
2. Syncs files to S3 with optimized cache headers
3. Invalidates CloudFront cache
4. Runs automatically on push to master

## Project Structure

- `/src` - React application source code
- `/public` - Static assets
- `/terraform` - Infrastructure as Code
- `/.github/workflows` - CI/CD pipelines