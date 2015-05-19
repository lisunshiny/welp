class ReviewImage < ActiveRecord::Base
  has_attached_file :image

  validates_attachment :image,
    presence: true,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { less_than: 3.megabytes }

  belongs_to :review
  has_one :restaurant, through: :review

end
