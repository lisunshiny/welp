class ReviewImage < ActiveRecord::Base
  has_attached_file :image
  
  validates_attachment :pic,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { less_than: 1.megabytes }

end
