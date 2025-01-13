# Preview all emails at http://localhost:3000/rails/mailers/password_mailer
class PasswordMailerPreview < ActionMailer::Preview
  def password_reset
    user = User.first
    token = user.generate_token_for(:password_reset)
    PasswordMailer.with(user: user, token: token).password_reset
  end
end