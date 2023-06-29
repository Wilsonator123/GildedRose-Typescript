import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    //Normal Items



    //Aged Brie
    describe('Age Brie', function() {
        it('Aged Brie (in date)', function () {
            const goldedRose = new GildedRose([new Item('Aged Brie', 10, 0)]);
            const items = goldedRose.updateQuality();
            expect(items[0].quality).to.equal(1);
            expect(items[0].sellIn).to.equal(9);
        });
        it('Aged Brie (out-of-date)', function () {
            const goldedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
            const items = goldedRose.updateQuality();
            expect(items[0].quality).to.equal(12);
            expect(items[0].sellIn).to.equal(-1);
        });
        it('Aged Brie (max quality)', function () {
            const goldedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
            const items = goldedRose.updateQuality();
            expect(items[0].quality).to.equal(50);
        });
    });


    //Backstage Passes
    describe('Backstage Passes', function() {
        it('Backstage passes greater than 11 days', function () {
            const goldedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 0)]);
            const items = goldedRose.updateQuality();
            expect(items[0].quality).to.equal(1);
            expect(items[0].sellIn).to.equal(11);
        });
        it('Backstage passes within 11 days', function () {
            const goldedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);
            const items = goldedRose.updateQuality();
            expect(items[0].quality).to.equal(2);
            expect(items[0].sellIn).to.equal(9);
        });
        it('Backstage passes within 6 days', function () {
            const goldedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]);
            const items = goldedRose.updateQuality();
            expect(items[0].quality).to.equal(3);
            expect(items[0].sellIn).to.equal(4);
        });
    });

    //Sulfuras
    it('Sulfuras', function() {
        const goldedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
        const items = goldedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
        expect(items[0].sellIn).to.equal(10);
    })

});
