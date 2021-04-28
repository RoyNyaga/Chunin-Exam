class Url < ApplicationRecord
  before_create :add_shortform

  validates :original, presence: true, uniqueness: true
  validate :url_correctness

  def add_shortform 
    self.short_version = "#{extract_protocol_and_domain}#{SecureRandom.hex(2)}"
  end

  def url_correctness
    fore_slash_count = 0
    original.each_char.with_index(1) do |char, i|
      fore_slash_count += 1 if char == "/"
    end
    if fore_slash_count < 3 then 
      errors.add(:url, "must inlude a protocal, domain and path. ex: http://domain/path") 
    end 
  end 

  private 

  def extract_protocol_and_domain 
    fore_slash_count = 0
    original.each_char.with_index(1) do |char, i|
      fore_slash_count += 1 if char == "/"
      return original[0,i] if fore_slash_count == 3
    end 
  end 
end
