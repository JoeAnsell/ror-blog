# Replace the 'config_from_url' string value below with your
# product environment's credentials, available from your Cloudinary console.
# =====================================================

require 'cloudinary'

Cloudinary.config_from_url(
  "cloudinary://#{Rails.application.credentials.dig(:cloudinary, :api_key)}:" \
  "#{Rails.application.credentials.dig(:cloudinary, :api_secret)}@" \
  "#{Rails.application.credentials.dig(:cloudinary, :cloud_name)}"
)

# Cloudinary.config_from_url(
#   "cloudinary://#{ENV['CLOUDINARY_API_KEY']}:" \
#   "#{ENV['CLOUDINARY_API_SECRET']}@" \
#   "#{ENV['CLOUDINARY_CLOUD_NAME']}"
# )