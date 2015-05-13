class Restaurant < ActiveRecord::Base
  enum tag: [:italian, :chinese, :mexican, :american, :indian]

  validates :enum, :name, :tag, :address, :city, :state, :zip, :phone, :user_id, null: false

  validates_inclusion_of :zip, { :in => 10000..99999 }

  belongs_to :user
  has_many :reviews

  def avg_rating
    reviews = self.reviews

    reviews.empty? ? nil : reviews.sum(:rating) / reviews.length
  end

  def num_reviews
    self.reviews.count
  end
end
