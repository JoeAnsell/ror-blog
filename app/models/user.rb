class User < ApplicationRecord

  include ActiveModel::SecurePassword
  has_secure_password

  validates :email, presence: true
  normalizes :email, with: ->(email) {email.strip.downcase}
  
  validates_format_of :email,  with: /\A[^@\s]+@[^@\s]+\z/, message: "Must be a valid email address"
  validates :password, presence: true
  validates :password_confirmation, presence: true

end
