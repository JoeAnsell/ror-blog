# Replace the 'config_from_url' string value below with your
# product environment's credentials, available from your Cloudinary console.
# =====================================================

require 'cloudinary'

Cloudinary.config_from_url(
  "cloudinary://#{Rails.application.credentials.dig(:cloudinary, :api_key)}:" \
  "#{Rails.application.credentials.dig(:cloudinary, :api_secret)}@" \
  "#{Rails.application.credentials.dig(:cloudinary, :cloud_name)}"
)

# Optionally add:
Cloudinary.config do |config|
  config.secure = true  # Ensures URLs are generated with https
end
