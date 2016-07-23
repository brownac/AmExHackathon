import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  primaryKey: '_id',
    serializeId: function(id) {
        return id.toString();
    }
});
