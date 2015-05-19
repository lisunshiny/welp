class Review < ActiveRecord::Base
  validates :rating, :restaurant_id, :user_id, null: false
  validates_inclusion_of :rating, {in: 0..5 }

  belongs_to :user
  belongs_to :restaurant

  has_many :review_images


end
