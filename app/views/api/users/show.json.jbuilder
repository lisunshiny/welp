json.id @user.id
json.username @user.username
json.avatar asset_path(@user.avatar.url)
json.join_date @user.created_at

json.reviews @user.reviews do |review|
  json.id review.id
  json.rating review.rating
  json.body review.body
  json.restaurant_id review.restaurant_id

  json.restaurant_name review.restaurant.name
  json.username review.user.username
  json.created_at review.created_at
end
