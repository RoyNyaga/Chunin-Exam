require 'rails_helper'

RSpec.describe "Urls", type: :request do
  describe "POST / create" do
    describe "with valid information" do 
      it "returns 201 status" do 
        post urls_path, params: {
          url: {
            original: Faker::Internet.url
          }
        }
        expect(response).to have_http_status(201)
      end 
    end 

    describe "with invalid information" do 
      it "returns status 400" do 
        post urls_path, params: {
          url: {
            original: "https:/thisas"
          }
        }
        expect(response).to have_http_status(400)
      end 
    end 
  end
end
