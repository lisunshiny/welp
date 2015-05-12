class ReviewsController < ApplicationController
  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      redirect_to restaurant_url(@review.restaurant)
    else
      redirect_to restaurant_url(review_params[:restaurant_id])
    end
  end

  def update

  end

  def destroy

  end


  private

    def review_params
      review_params = params.require(:review).permit(:body, :rating, :restaurant_id)
      review_params[:rating] = review_params[:rating].to_i

      return review_params
    end
end
