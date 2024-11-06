require 'cloudinary'

if Cloudinary.config.api_key.blank?
  require './config'
end
