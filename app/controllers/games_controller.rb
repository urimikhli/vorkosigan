class GamesController < ApplicationController
  def cssgameengine
     @title = "CSSGameEngine"
  end

  def gmp
     @title = "GMP"
     @renderJSinBody = true
  end

  def jaws
     @title = "JawsJS"
  end

  def entityjs
     @title = "EntityJS"
  end

  def impactjs
     @title = "ImpactJS"
  end

end
