require 'spec_helper'

describe Html5AppsController do
    render_views

 before(:each) do
    @base_title = "HTML5/Javascript Development"
 end
  describe "GET 'fingerpaint'" do
    it "should be successful" do
      get 'fingerpaint'
      response.should be_success
    end

    it " home should have the right title" do
      get 'fingerpaint'
      response.should have_selector("title",
                        :content => "Finger Paint | #{@base_title} | ")
    end

    it " fingerpaint should have non blank body" do
      get 'fingerpaint'
      response.body.should_not =~ /<body>\s*<\/body>/
    end

     it " fingerpaint should have :all the javascript" do
      get 'fingerpaint'
      response.body.should =~ /finger_paint.js/
    end
  end
end
