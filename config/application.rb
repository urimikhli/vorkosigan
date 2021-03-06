require File.expand_path('../boot', __FILE__)

require 'rails/all'

# If you have a Gemfile, require the gems listed there, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env) if defined?(Bundler)

module Vorkosigan
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Custom directories with classes and modules you want to be autoloadable.
    # config.autoload_paths += %W(#{config.root}/extras)

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    # Activate observers that should always be running.
    # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # JavaScript files you want as :defaults (application.js is always included).
    config.action_view.javascript_expansions[:html5fp] = %w(modernizr-1.6.min jquery-1.6.2.min html5fp html5fp/finger_painting html5fp/geolocation-story html5fp/glossary html5fp/graph_calc html5fp/smily)
    config.action_view.javascript_expansions[:fingerpaint]= %w(modernizr-1.6.min jquery-1.10.2.min html5_apps/finger_paint.js)
    config.action_view.javascript_expansions[:cssgameengine] = %w(play_bg_audio.js CSS_Game/ENGINE/game-min CSS_Game/ENGINE/controls-min)
    config.action_view.javascript_expansions[:gmp] = %w(GMP/gmp-engine.1.7.4 GMP/space-invaders)
    config.action_view.javascript_expansions[:jaws] = %w()
    config.action_view.javascript_expansions[:entityjs] = %w()
    config.action_view.javascript_expansions[:impactjs] = %w()
    ###config.action_view.javascript_expansions[:prototype] = ['prototype', 'effects', 'dragdrop', 'controls']
    config.action_view.stylesheet_expansions[:html5fp] = %w()
    config.action_view.stylesheet_expansions[:fingerpaint]= %w(fingerpaint/fingerpaint)
    config.action_view.stylesheet_expansions[:cssgameengine] = %w(CSS_Game/engine-min)
    config.action_view.stylesheet_expansions[:gmp] = %w(GMP/space-invaders)
    config.action_view.stylesheet_expansions[:jaws] = %w()
    config.action_view.stylesheet_expansions[:entityjs] = %w()
    config.action_view.stylesheet_expansions[:impactjs] = %w()

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]
  end
end
