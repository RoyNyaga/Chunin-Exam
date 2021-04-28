FactoryBot.define do 
  factory :url do 
    original { Faker::Internet.url }
  end 
end 