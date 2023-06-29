export class Item {
    name: string;
    sellIn: number; //Days to sell
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
            //The quality gets better over time
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { //Quality never changes
                        this.items[i].quality = this.items[i].quality - 1 //If not any of these quality goes down
                    }
                }
            } else {
                //If ages brie or backstage pass
                if (this.items[i].quality < 50) { //Max quality == 50
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1 //If it is within 11 days goes up by 2
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1 //If it is within 6 days then goes up by 3
                            }
                        }
                    }
                }
            }

            //Changing SellIn Days
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }

            //If it's past the sellIn date quality goes down faster
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        //This sets the quality for the ticket to 0;
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    //If its Aged Brie
                    if (this.items[i].quality < 50) { //Max Quality == 50
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
