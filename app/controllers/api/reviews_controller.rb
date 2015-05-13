class Api::ReviewsController < Api::ApplicationController
  def create

  end

  def edit
  end

  def destroy
  end

  private
    def review_params
      params.require(:review).permit(:rating, :body. :restaurant_id)
    end

    def current_restaurant
      Restaurant.find(review_params[:restaurant_id])
    end

end
