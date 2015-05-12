class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if passwords_match? && @user.save(@user)
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] ||= []
      flash.now[:errors].concat(@user.errors.full_messages)

      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  def show
    @user = User.find(params[:id])
    render :show
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def passwords_match?
    unless params[:user][:password_confirmation] == user_params[:password]
      flash.now[:errors] = ["Passwords don't match"]
      return false
    end

    return true
  end

end
