class Review < ActiveRecord::Base
  validates :rating, :restaurant_id, :user_id, presence: true
  validates_inclusion_of :rating, {in: 0..5 }
  validates :user_id, uniqueness: { scope: :restaurant_id }

  belongs_to :user
  belongs_to :restaurant

  has_many :review_images, dependent: :destroy

end
