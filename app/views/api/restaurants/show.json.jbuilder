json.id @restaurant.id
json.name @restaurant.name
json.tag @restaurant.tag
json.pic asset_path(@restaurant.image_url)


json.address1 @restaurant.address
json.address2 "#{@restaurant.city}, #{@restaurant.state} #{@restaurant.zip}"
json.phone @restaurant.phone

json.position do
  json.lat @restaurant.latitude
  json.long @restaurant.longitude
end

json.username @restaurant.user.username
json.user_id @restaurant.user_id
json.avg_rating @restaurant.avg_rating
json.num_reviews @restaurant.num_reviews

json.reviews @restaurant.reviews do |review|
  json.id review.id
  json.rating review.rating
  json.date review.created_at.strftime("%m/%d/%Y")
  json.body review.body
  json.user_id review.user_id
  json.username review.user.username
  json.avatar_url asset_path(review.user.avatar.url)
  json.created_at review.created_at


  review_images = json.review_images review.review_images do |review_image|
      json.image_url asset_path(review_image.image.url)
  end
end
