class User < ApplicationRecord

  include ActiveModel::SecurePassword
  has_secure_password

  validates :user_name, uniqueness: true

  validates :avatar, presence: true

  validates :email, presence: true, uniqueness: true
  normalizes :email, with: ->(email) {email.strip.downcase}
  
  validates_format_of :email,  with: /\A[^@\s]+@[^@\s]+\z/, message: "Must be a valid email address"
  validates :password, presence: true, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?

  generates_token_for :password_reset, expires_in: 15.minutes do
    password_salt&.last(10)
  end

  generates_token_for :email_confirmation, expires_in: 24.hours do
    email
  end

  has_many :articles, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :likes, dependent: :destroy
  has_many :liked_articles, through: :likes, source: :article

  private
  def password_required?
    new_record? || password.present?
  end
end
