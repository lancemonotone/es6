(function () {
    "use strict";

    const SPENDING_THRESHOLD = 800;
    const TAX_AMOUNT = 0.085;
    const PHONES_INVENTORY = [
        {name: 'iPhone', price: 649},
        {name: 'Galaxy S6', price: 576},
        {name: 'Galaxy Note 5', price: 489}
    ];
    const ACCESSORIES_INVENTORY = [
        {name: 'Charger', price: 53},
        {name: 'Case', price: 78},
        {name: 'Bluetooth', price: 96}
    ];

    class Utility {
        static getRandomElement(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }

        static formatAmount(amount) {
            return `$${amount.toFixed(2)}`;
        }

        static dividerTemplate(char = '-', length = 20) {
            return `${new Array(length).join(char)}`;
        }
    }

    class PurchaseModel {
        constructor(options) {
            this.subtotal = 0;
            this.taxAmount = options.taxAmount;
            this.threshold = options.threshold;

            this.purchase = this.doPurchase;
            this.tax = this.calculateTax;
            this.total = this.calculateTotal;

            return {
                purchase: this.purchase,
                subtotal: this.subtotal,
                tax: this.tax,
                total: this.total,
                render: this.render
            }
        }

        /**
         * @returns {string}
         */
        render() {}

        /**
         * @returns {object}
         */
        doPurchase() {}

        /**
         * @returns {number}
         */
        calculateTax() {
            return this.subtotal * this.taxAmount;
        }

        calculateTotal() {
            return this.subtotal + this.tax;
        }

        isUnderThreshold(price) {
            return this.subtotal + price <= this.threshold
        }
    }

    class PhonePurchaseModel extends PurchaseModel {
        constructor(options) {
            super(options);
            this.phonesInventory = options.phonesInventory;
            this.accessoriesInventory = options.accessoriesInventory;

            this.purchase = this.doPurchase();
            this.tax = this.calculateTax();
            this.total = this.calculateTotal();
        }

        render() {
            let accessories = this.purchase.accessories;
            let items = accessories.items;

            let phoneTemplate = `${this.purchase.phone.name} ${Utility.formatAmount(this.purchase.phone.price)}`;
            let accessoryTemplate = [];

            for (let i = 0; i < items.length; i++) {
                accessoryTemplate.push(`\t${items[i].name} ${Utility.formatAmount(items[i].price)}`);
            }
            accessoryTemplate.push(`Accessories ${Utility.formatAmount(accessories.total)}`);
            accessoryTemplate = accessoryTemplate.join('\n');

            let totalTemplate = `
Subtotal: ${Utility.formatAmount(this.subtotal)}
Tax: ${Utility.formatAmount(this.tax)}
Total: ${Utility.formatAmount(this.total)}`;

            return `
${phoneTemplate}

${accessoryTemplate}
${totalTemplate}`;
        }

        doPurchase() {
            return {
                "phone": this.getPhone(),
                "accessories": this.getAccessories()
            }
        }

        getPhone() {
            let phone = Utility.getRandomElement(this.phonesInventory);
            if (this.isUnderThreshold(phone.price)) {
                this.subtotal += phone.price;
                return phone;
            }
        }

        getAccessories(accessories) {
            accessories = accessories || {
                    total: 0,
                    items: []
                };

            let accessory = Utility.getRandomElement(this.accessoriesInventory);

            if (this.isUnderThreshold(accessory.price)) {
                accessories.items.push(accessory);
                accessories.total += accessory.price;
                this.subtotal += accessory.price;
                return this.getAccessories(accessories);
            } else {
                return accessories;
            }
        }
    }

    class PurchasesModel {
        constructor() {
            this.purchases = [];
            this.total = 0;
            return {
                total: this.total,
                purchases: this.purchases,
                count: this.getCount,
                addPurchase: this.addPurchase,
                render: this.render
            }
        }

        render(options) {
            let summaryTemplate = `
${this.count()} ${options.title || "Purchase(s)"}   ${Utility.formatAmount(this.total)}`;
            let purchaseTemplate = [];

            for (let i = 0; i < this.purchases.length; i++) {
                purchaseTemplate.push(`${this.purchases[i].render()}`);
            }

            purchaseTemplate = purchaseTemplate.join('\n' + Utility.dividerTemplate());

            return `${purchaseTemplate}
${Utility.dividerTemplate('=')}
${summaryTemplate}`;
        }

        getCount() {
            return this.purchases.length;
        }

        addPurchase(purchase) {
            this.total += purchase.total;
            this.purchases.push(purchase);
        }
    }

    let phonePurchaseOptions = {
        taxAmount: TAX_AMOUNT,
        phonesInventory: PHONES_INVENTORY,
        accessoriesInventory: ACCESSORIES_INVENTORY,
        threshold: SPENDING_THRESHOLD
    };

    let myBalance = 10000;
    let phones = new PurchasesModel();

    while (myBalance >= 0) {
        let phone = new PhonePurchaseModel(phonePurchaseOptions);
        if (myBalance - phone.total >= 0) {
            phones.addPurchase(phone);
            myBalance -= phone.total;
        } else {
            break;
        }
    }

    console.log(`${phones.render({title: 'Phone(s)'})}`);

})();