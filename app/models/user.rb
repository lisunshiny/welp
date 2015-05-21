
class User < ActiveRecord::Base
  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEX }
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  has_attached_file :avatar,
    default_url: ':attachment/missing.jpg'

  validates_attachment :avatar,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { less_than: 3.megabytes }


  after_initialize :ensure_session_token

  has_many :reviews
  has_many :restaurants


  def self.find_by_credentials(params)
    user = User.find_by(username: params[:username])

    return nil if user.nil?
    user.is_password?(params[:password]) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.create!(
        provider: auth_hash[:provider],
        uid: auth_hash[:uid],
        username: auth_hash[:info][:nickname],
        email: SecureRandom.urlsafe_base64(16) + "@placeholder.com",
        password: SecureRandom::urlsafe_base64)
    end

    user
  end

  def self.log_in_as_guest
    user = User.find_by(username: "Guest")
    unless user
      user = User.create!(
        username: "Guest",
        email: "guest@guest.com",
        password: "password"
      )
    end

    user
  end


  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

end
