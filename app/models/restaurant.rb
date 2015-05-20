class Restaurant < ActiveRecord::Base
  enum tag: [:italian, :chinese, :mexican, :american, :indian]

  validates :enum, :name, :tag, :address, :city, :state, :zip, :phone, :user_id, null: false

  validates_inclusion_of :zip, { :in => 10000..99999 }

  has_attached_file :pic,
    default_url: ':attachment/missing.jpg'

  validates_attachment :pic,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { less_than: 3.megabytes }

  geocoded_by :full_street_address
  after_validation :geocode

  belongs_to :user
  has_many :reviews
  has_many :review_images, through: :reviews, source: :review_images

  def image_url
    if self.pic.url != "pics/missing.jpg"
      return self.pic.url
    elsif has_image?
      return self.review_images.first.image.url
    else
      return self.pic.url
    end
  end

  def has_image?
    !self.review_images.empty?
  end


  def avg_rating
    reviews = self.reviews

    reviews.empty? ? nil : reviews.sum(:rating) / reviews.length.to_f
  end

  def num_reviews
    self.reviews.count
  end

  def full_street_address
    "#{self.address}, #{self.city}, #{self.state}, #{self.zip}"
  end
end
