class Api::UsersController < Api::ApplicationController
  def show
    @user = User.find(params[:id])

    render :show
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end

  end

  private

    def user_params
      params.require(:user).permit(:username, :email)
    end

end
