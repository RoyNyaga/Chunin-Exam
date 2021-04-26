class UrlShortener < ApplicationRecord

  def add_shortform 
    self.short_version = "#{extract_protocol_and_domain}#{SecureRandom.hex(2)}"
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
