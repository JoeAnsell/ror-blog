class Article < ApplicationRecord
    include Visible

    belongs_to :user

    has_many :comments, dependent: :destroy

    validates :title, presence: true
    validates :body, presence: true, length: { minimum: 10 }
    
    has_many :likes, dependent: :destroy
    has_many :liked_by_users, through: :likes, source: :user 
end
