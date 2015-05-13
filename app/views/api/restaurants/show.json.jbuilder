json.name @restaurant.name
json.tag @restaurant.tag

json.address1 @restaurant.address
json.address2 "#{@restaurant.city}, #{@restaurant.state} #{@restaurant.zip}"
json.phone @restaurant.phone

json.username @restaurant.user.username
json.user_id @restaurant.user_id
json.avg_rating @restaurant.avg_rating
json.num_reviews @restaurant.num_reviews

json.reviews @restaurant.reviews do |review|
  json.rating review.rating
  json.body review.body
  json.user_id review.user_id
  json.username review.user.username
  json.created_at review.created_at
end