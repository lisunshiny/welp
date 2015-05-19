class Restaurant < ActiveRecord::Base
  enum tag: [:italian, :chinese, :mexican, :american, :indian]

  validates :enum, :name, :tag, :address, :city, :state, :zip, :phone, :user_id, null: false

  validates_inclusion_of :zip, { :in => 10000..99999 }

  has_attached_file :pic,
    default_url: ':attachment/missing.jpg'

  validates_attachment :pic,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { less_than: 1.megabytes }

  belongs_to :user
  has_many :reviews
  has_many :review_images, through: :reviews, source: :review_images

  def images
    if self.pic && self.review_images
      return [self.pic] + self.review_images
    elsif self.pic
      return [self.pic]
    else
      return self.review_images
    end

  end

  def avg_rating
    reviews = self.reviews

    reviews.empty? ? nil : reviews.sum(:rating) / reviews.length.to_f
  end

  def num_reviews
    self.reviews.count
  end
end
