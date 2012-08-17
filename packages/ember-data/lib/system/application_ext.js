var set = Ember.set;

Ember.onLoad('Ember.Application', function(Application) {
  Application.registerInjection({
    name: "store",
    before: "controllers",

    injection: function(app, stateManager, property) {
      if (property === 'Store') {
        set(stateManager, 'store', app[property].create());
      }
    }
  });

  Application.registerInjection({
    name: "giveStoreToControllers",

    injection: function(app, stateManager, property) {
      if (property.match(/Controller$/)) {
        var controllerName = property.charAt(0).toLowerCase() + property.substr(1);
        var store = stateManager.get('store');
        var controller = stateManager.get(controllerName);

        controller.set('store', store);
      }
    }
  });
});
