require 'rails_helper'

RSpec.describe Url, type: :model do
  context "on createion" do 
    it "url should be create" do 
      expect(create(:url)).to be_valid
    end
  end 

  context "after creation" do 
    it "short_version should be created" do 
      url = create(:url)
      expect(url.short_version).to be_present
    end 
  end

  context "during validation" do 
    let(:url) { create(:url) }
    it "url original field must be unique" do
      copy_url = build(:url, original: url.original)
      copy_url.save
      expect(copy_url.errors.full_messages).to include("Original has already been taken")
    end 

    it "url original must have a valid url format" do 
      url.update(original: "some-kind-of-url")
      expect(url.errors.full_messages).to include("Url must inlude a protocal, domain and path. ex: http://domain/path")
    end 
  end 
end
