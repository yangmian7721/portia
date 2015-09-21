import Ember from 'ember';
import DS from 'ember-data';


const Annotation = DS.Model.extend({
    name: DS.attr('string'),
    parent: DS.belongsTo('item', {
        inverse: 'annotations'
    }),
    type: DS.attr('string'),
    selector: DS.attr('string'),
    attribute: DS.attr('string'),

    // matching element in the current sample, populated when active
    elements: [],

    color: Ember.computed('orderedIndex', 'sample.annotationColors.length', function() {
        const colors = this.get('sample.annotationColors');
        return colors[this.get('orderedIndex')];
    }),
    orderedIndex: Ember.computed('sample.orderedAnnotations', function() {
        return this.get('sample.orderedAnnotations').indexOf(this);
    }),
    sample: Ember.computed.or('parent.sample', 'parent.itemAnnotation.sample')
});

Annotation.reopenClass({
    FIXTURES: [
        {
            id: 'a1',
            name: 'name',
            type: 'text',
            parent: 'ti1',
            selector: 'h3 a'
        },
        {
            id: 'a2',
            name: 'price',
            type: 'price',
            parent: 'ti1',
            selector: '.large-4 h3'
        },
        {
            id: 'a3',
            name: 'image',
            type: 'image',
            parent: 'ti1',
            selector: '.large-2 img',
            attribute: 'src'
        },
        {
            id: 'a4',
            name: 'description',
            type: 'text',
            parent: 'ti1',
            selector: '.large-6 li:nth-child(2)'
        },
        {
            id: 'a5',
            name: 'property',
            type: 'text',
            parent: 'ti2',
            selector: '.details strong'
        },
        {
            id: 'a6',
            name: 'value',
            type: 'text',
            parent: 'ti2',
            selector: 'span'
        }
    ]
});

export default Annotation;