class Api::ReviewsController < Api::ApiController
  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def edit
  end

  def destroy
  end

  private
    def review_params
      params.require(:review).permit(:rating, :body, :restaurant_id)
    end

    def current_restaurant
      Restaurant.find(review_params[:restaurant_id])
    end

end
