# Uncomment and configure this block to use S3 backend for Terraform state
# This is recommended for production use to store state remotely

# terraform {
#   backend "s3" {
#     bucket         = "your-terraform-state-bucket"
#     key            = "personal-website/terraform.tfstate"
#     region         = "us-east-1"
#     encrypt        = true
#     dynamodb_table = "terraform-state-lock"
#   }
# }

# To create the S3 backend resources, run:
# aws s3 mb s3://your-terraform-state-bucket
# aws dynamodb create-table \
#   --table-name terraform-state-lock \
#   --attribute-definitions AttributeName=LockID,AttributeType=S \
#   --key-schema AttributeName=LockID,KeyType=HASH \
#   --billing-mode PAY_PER_REQUEST \
#   --tags Key=application,Value=personal-website
