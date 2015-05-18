
class User < ActiveRecord::Base
  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEX }
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }




  attr_reader :password

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "50x50>" }
  validates_attachment :avatar,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { less_than: 1.megabytes }


  after_initialize :ensure_session_token

  has_many :reviews
  has_many :restaurants


  def self.find_by_credentials(params)
    user = User.find_by(username: params[:username])

    return nil if user.nil?
    user.is_password?(params[:password]) ? user : nil
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
