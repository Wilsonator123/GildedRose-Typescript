import {expect} from "chai";
import {GildedRose, Item} from "../app/gilded-rose";

describe("Gilded Rose", () => {
    describe("constructor", () => {
        it("should set item array correctly", () => {
            const items = [new Item("foo", 0, 0), new Item("bar", 0, 0)];
            const gildedRose = new GildedRose(items);
            expect(gildedRose.items).to.equal(items);
        });
    });

    describe("updateQuality", () => {
        it("should not update item name", () => {
            const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
            gildedRose.updateQuality();
            expect(gildedRose.items[0].name).to.equal("foo");
        });

        describe("normal items", () => {
            it("should decrease sellIn by 1 if > 0", () => {
                const gildedRose = new GildedRose([new Item("foo", 2, 0)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(1);
            });

            it("should decrease sellIn by 1 if <= 0", () => {
                const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].sellIn).to.equal(-1);
            });

            it("should not decrease quality below 0", () => {
                const gildedRose = new GildedRose([new Item("foo", 1, 0)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(0);
            });

            it("should not decrease quality below 0 when sellIn <= 0", () => {
                const gildedRose = new GildedRose([new Item("foo", 0, 1)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(0);
            });

            it("should decrease quality by 1 if sellIn is > 0", () => {
                const gildedRose = new GildedRose([new Item("foo", 2, 2)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(1);
            });

            it("should decrease quality by 2 if sellIn is 0", () => {
                const gildedRose = new GildedRose([new Item("foo", 0, 3)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(1);
            });

            it("should decrease quality by 2 if sellIn is < 0", () => {
                const gildedRose = new GildedRose([new Item("foo", -1, 3)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(1);
            });
        });

        //Aged Brie
        describe("Aged Brie", () => {
            it("Aged Brie (in date)", () => {
                const goldedRose = new GildedRose([new Item("Aged Brie", 10, 0)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(1);
                expect(items[0].sellIn).to.equal(9);
            });

            it("Aged Brie (out-of-date)", () => {
                const goldedRose = new GildedRose([new Item("Aged Brie", 0, 10)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(12);
                expect(items[0].sellIn).to.equal(-1);
            });

            it("Aged Brie (max quality)", () => {
                const goldedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(50);
            });

            it("should keep quality <= 50 when sellIn <= 0", () => {
                const gildedRose = new GildedRose([new Item("Aged Brie", 0, 49)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(50);
            });
        });

        //Backstage Passes
        describe("Backstage Passes", () => {
            it("Backstage passes greater than 10 days", () => {
                const goldedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(1);
                expect(items[0].sellIn).to.equal(11);
            });

            it("Backstage passes within 11 days", () => {
                const goldedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(2);
                expect(items[0].sellIn).to.equal(9);
            });

            it("Backstage passes within 6 days", () => {
                const goldedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(3);
                expect(items[0].sellIn).to.equal(4);
            });

            it("Backstage passes expired", () => {
                const goldedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(0);
                expect(items[0].sellIn).to.equal(-1);
            });
        });

        //Sulfuras
        describe("Sulfuras, Hand of Ragnaros", () => {
            it("should not decrease sellIn", () => {
                const goldedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
                const items = goldedRose.updateQuality();
                expect(items[0].sellIn).to.equal(10);
            });

            it("should not decrease quality", () => {
                const goldedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
                const items = goldedRose.updateQuality();
                expect(items[0].quality).to.equal(80);
            });
        });

        describe("Conjured Mana Cake", () => {
            it("should not decrease quality below 0", () => {
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 1, 0)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(0);
            });

            it("should not decrease quality below 0 when sellIn <= 0", () => {
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 1)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(0);
            });

            it("should decrease quality by 2 if sellIn is > 0", () => {
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 2, 3)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(1);
            });

            it("should decrease quality by 4 if sellIn is 0", () => {
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 5)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(1);
            });

            it("should decrease quality by 4 if sellIn is < 0", () => {
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", -1, 5)]);
                gildedRose.updateQuality();
                expect(gildedRose.items[0].quality).to.equal(1);
            });
        });
    });
});

describe("Item", () => {
    describe("constructor", () => {
        it("should set properties correctly", () => {
            const item = new Item("foo", 1, 2);
            expect(item.name).to.equal("foo");
            expect(item.sellIn).to.equal(1);
            expect(item.quality).to.equal(2);
        });
    });
});
