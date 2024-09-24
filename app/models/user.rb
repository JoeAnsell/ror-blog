class User < ApplicationRecord

  include ActiveModel::SecurePassword
  has_secure_password

  validates :email, presence: true
  normalizes :email, with: ->(email) {email.strip.downcase}
  
  validates_format_of :email,  with: /\A[^@\s]+@[^@\s]+\z/, message: "Must be a valid email address"
  validates :password, presence: true
  validates :password_confirmation, presence: true

  generates_token_for :password_reset, expires_in: 15.minutes do
    password_salt&.last(10)
  end

  generates_token_for :email_confirmation, expires_in: 24.hours do
    email
  end
end
