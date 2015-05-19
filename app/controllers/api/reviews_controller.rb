class Api::ReviewsController < Api::ApiController
  wrap_parameters(false)

  def create
    @review = current_user.reviews.new(review_params)
    @review.review_images.new(images_params) unless images_params.nil?

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
      review_params = params.require(:review).permit(:rating, :body, :restaurant_id)

      review_params[:restaurant_id] = review_params[:restaurant_id].to_i
      review_params[:rating] = review_params[:rating].to_i


      return review_params
    end

    def current_restaurant
      Restaurant.find(review_params[:restaurant_id])
    end

    def images_params
      params.permit(review_images: [:image])[:review_images]
    end

end
