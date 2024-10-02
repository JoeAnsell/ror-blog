class Article < ApplicationRecord
    include Visible

    belongs_to :user

    has_many :comments, dependent: :destroy

    validates :title, presence: true
    validates :body, presence: true, length: { minimum: 10 }
    
    has_many :likes, dependent: :destroy
    has_many :liked_by_users, through: :likes, source: :user 

    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    mount_uploader :image, ImageUploader


    def tag_list
        tags.map(&:name).join(", ")
    end

    def tag_list=(names)
        self.tags = names.split(",").map do |n|
            Tag.where(name: n.strip).first_or_create!
        end
    end
end
