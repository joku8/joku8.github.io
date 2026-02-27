variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with DNS permissions"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Your custom domain name"
  type        = string
}
