require 'spec_helper'

describe UsersController do
    render_views

  before(:each) do
    @base_title = "HTML5/Javascript Games Development"
  end
  
  describe "GET 'new'" do
    it "returns http success" do
      get 'new'
      response.should be_success
    end
  end


  it "new user should have the right title" do
      get 'new'
      response.should have_selector("title",
                        :content => "Sign Up | #{@base_title} | ")
   end

end
