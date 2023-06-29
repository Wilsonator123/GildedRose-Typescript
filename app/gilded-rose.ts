export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    /**
     * This updates the quality
     */
    updateQuality() {

        //Changing Quality
        for (let i = 0; i < this.items.length; i++) {
            const name = this.items[i].name;
            const quality = this.items[i].quality;
            const sellIn = this.items[i].sellIn;

            if (name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn -= 1;
            }

            switch (name) {
                case 'Sulfuras, Hand of Ragnaros':
                    break;

                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (sellIn <= 0) {
                        this.items[i].quality = 0;
                    } else if (sellIn <= 5) {
                        this.items[i].quality = Math.min(quality + 3, 50);
                    } else if (sellIn <= 10) {
                        this.items[i].quality = Math.min(quality + 2, 50);
                    } else {
                        this.items[i].quality = Math.min(quality + 1, 50);
                    }
                    break;

                case 'Aged Brie':
                    if (sellIn <= 0) {
                        this.items[i].quality = Math.min(quality + 2, 50);
                    } else {
                        this.items[i].quality = Math.min(quality + 1, 50);
                    }
                    break;

                default:
                    if (sellIn <= 0) {
                        this.items[i].quality = Math.max(quality - 2, 0);
                    } else {
                        this.items[i].quality = Math.max(quality - 1, 0);
                    }
            }
        }

        return this.items;
    }
}
