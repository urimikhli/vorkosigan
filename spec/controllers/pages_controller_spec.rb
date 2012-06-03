require 'spec_helper'

describe PagesController do
    render_views

 before(:each) do
    @base_title = "HTML5/Javascript Games Development"
 end
    
  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end

    it " home should have the right title" do
      get 'home'
      response.should have_selector("title",
                        :content => "Home | #{@base_title} | ")
    end

    it " home should have non blank body" do
      get 'home'
      response.body.should_not =~ /<body>\s*<\/body>/
    end

     it "  home should have :default javascript" do
      get 'home'
      response.body.should_not =~ /html5fp.js/
      response.body.should =~ /application.js/
    end
  end

  describe "GET 'contact'" do
    it "should be successful" do
      get 'contact'
      response.should be_success
    end
  
    it " contact should have the right title" do 
      get 'contact'
      response.should have_selector("title",
                        :content => "Contact | #{@base_title} | ")
    end
    it " contact should have non blank body" do
      get 'contact'
      response.body.should_not =~ /<body>\s*<\/body>/
    end
  end

  describe "GET 'about'" do
    it "should be successful" do
      get 'about'
      response.should be_success
    end

    it "about should have the right title" do 
      get 'about'
      response.should have_selector("title",
                        :content => "About | #{@base_title} | ")
    end
    it " about should have non blank body" do
      get 'about'
      response.body.should_not =~ /<body>\s*<\/body>/
    end
  end

  describe "GET 'help'" do
    it "returns http success" do
      get 'help'
      response.should be_success
    end
    it "should have the right About Help title" do
      get 'help'
      response.should have_selector("title",
                                    :content => "Help | #{@base_title} | ")
    end    
    it " help should have non blank body" do
      get 'help'
      response.body.should_not =~ /<body>\s*<\/body>/
    end
  end

  describe "GET 'intro to HTML5 for Publishers'" do
    it "returns http success" do
      get 'html5fp'
      response.should be_success
    end
    it "should have the right HTML5 for Publishers title" do
      get 'html5fp'
      response.should have_selector("title",
                                    :content => "HTML5 for Publishers | #{@base_title} | ")
    end    
    it " HTML5 for Publishers should have non blank body" do
      get 'html5fp'
      response.body.should_not =~ /<body>\s*<\/body>/
    end
    it " HTML5 fp should have :all the javascript" do
      get 'html5fp'
      response.body.should =~ /html5fp.js/
    end
  end

end
