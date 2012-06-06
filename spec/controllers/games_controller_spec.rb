require 'spec_helper'

describe GamesController do

  describe "GET 'cssgameengine'" do
    it "returns http success" do
      get 'cssgameengine'
      response.should be_success
    end
  end

  describe "GET 'gmp'" do
    it "returns http success" do
      get 'gmp'
      response.should be_success
    end
  end

  describe "GET 'jaws'" do
    it "returns http success" do
      get 'jaws'
      response.should be_success
    end
  end

  describe "GET 'entityjs'" do
    it "returns http success" do
      get 'entityjs'
      response.should be_success
    end
  end

  describe "GET 'impactjs'" do
    it "returns http success" do
      get 'impactjs'
      response.should be_success
    end
  end

end
