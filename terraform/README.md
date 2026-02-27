# Terraform Configuration for Personal Website

This directory contains Terraform configuration to deploy your personal website to AWS (S3 + CloudFront) with Cloudflare DNS.

## Prerequisites

1. Terraform installed (v1.0+)
2. AWS account with credentials configured
3. Cloudflare account with your domain added
4. Cloudflare API token with DNS permissions

## Setup

1. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edit `terraform.tfvars` with your values:
   - `aws_region`: AWS region (use "us-east-1" for CloudFront)
   - `cloudflare_api_token`: Get from Cloudflare Dashboard → My Profile → API Tokens
   - `domain_name`: Your domain (e.g., "example.com")

3. Initialize Terraform:
   ```bash
   terraform init
   ```

4. Review the plan:
   ```bash
   terraform plan
   ```

5. Apply the configuration:
   ```bash
   terraform apply
   ```

   Note: The ACM certificate will be automatically created and validated via DNS. This may take a few minutes.

## What This Creates

- S3 bucket for static website hosting (tagged with application=personal-website)
- CloudFront distribution with HTTPS (tagged with application=personal-website)
- ACM certificate in us-east-1 with automatic DNS validation (tagged with application=personal-website)
- Cloudflare DNS records:
  - Root domain CNAME pointing to CloudFront
  - ACM validation records

## GitHub Actions Deployment

After applying Terraform, the outputs are automatically used by GitHub Actions:
- `s3_bucket_name`: Used to upload built files
- `cloudfront_distribution_id`: Used to invalidate cache after deployment

The GitHub Actions workflow will automatically deploy on push to master branch.

## Notes

- All resources are tagged with `application = "personal-website"`
- ACM certificate is automatically created and validated via Cloudflare DNS
- CloudFront requires ACM certificate in us-east-1 region (handled automatically)
- DNS is managed by Cloudflare (not Route53)
- HTTPS is automatically enabled via CloudFront
- SPA routing is handled via CloudFront error responses (404/403 → index.html)
