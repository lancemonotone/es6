$traceurRuntime.registerModule("../src/phones.es6", [], function() {
  "use strict";
  var __moduleName = "../src/phones.es6";
  (function() {
    "use strict";
    var SPENDING_THRESHOLD = 800;
    var TAX_AMOUNT = 0.085;
    var PHONES_INVENTORY = [{
      name: 'iPhone',
      price: 649
    }, {
      name: 'Galaxy S6',
      price: 576
    }, {
      name: 'Galaxy Note 5',
      price: 489
    }];
    var ACCESSORIES_INVENTORY = [{
      name: 'Charger',
      price: 53
    }, {
      name: 'Case',
      price: 78
    }, {
      name: 'Bluetooth',
      price: 96
    }];
    var Utility = function() {
      function Utility() {}
      return ($traceurRuntime.createClass)(Utility, {}, {
        getRandomElement: function(arr) {
          return arr[Math.floor(Math.random() * arr.length)];
        },
        formatAmount: function(amount) {
          return ("$" + amount.toFixed(2));
        },
        dividerTemplate: function() {
          var char = arguments[0] !== (void 0) ? arguments[0] : '-';
          var length = arguments[1] !== (void 0) ? arguments[1] : 20;
          return ("" + new Array(length).join(char));
        }
      });
    }();
    var PurchaseModel = function() {
      function PurchaseModel(options) {
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
        };
      }
      return ($traceurRuntime.createClass)(PurchaseModel, {
        render: function() {},
        doPurchase: function() {},
        calculateTax: function() {
          return this.subtotal * this.taxAmount;
        },
        calculateTotal: function() {
          return this.subtotal + this.tax;
        },
        isUnderThreshold: function(price) {
          return this.subtotal + price <= this.threshold;
        }
      }, {});
    }();
    var PhonePurchaseModel = function($__super) {
      function PhonePurchaseModel(options) {
        $traceurRuntime.superConstructor(PhonePurchaseModel).call(this, options);
        this.phonesInventory = options.phonesInventory;
        this.accessoriesInventory = options.accessoriesInventory;
        this.purchase = this.doPurchase();
        this.tax = this.calculateTax();
        this.total = this.calculateTotal();
      }
      return ($traceurRuntime.createClass)(PhonePurchaseModel, {
        render: function() {
          var accessories = this.purchase.accessories;
          var items = accessories.items;
          var phoneTemplate = (this.purchase.phone.name + " " + Utility.formatAmount(this.purchase.phone.price));
          var accessoryTemplate = [];
          for (var i = 0; i < items.length; i++) {
            accessoryTemplate.push(("\t" + items[i].name + " " + Utility.formatAmount(items[i].price)));
          }
          accessoryTemplate.push(("Accessories " + Utility.formatAmount(accessories.total)));
          accessoryTemplate = accessoryTemplate.join('\n');
          var totalTemplate = ("\nSubtotal: " + Utility.formatAmount(this.subtotal) + "\nTax: " + Utility.formatAmount(this.tax) + "\nTotal: " + Utility.formatAmount(this.total));
          return ("\n" + phoneTemplate + "\n\n" + accessoryTemplate + "\n" + totalTemplate);
        },
        doPurchase: function() {
          return {
            "phone": this.getPhone(),
            "accessories": this.getAccessories()
          };
        },
        getPhone: function() {
          var phone = Utility.getRandomElement(this.phonesInventory);
          if (this.isUnderThreshold(phone.price)) {
            this.subtotal += phone.price;
            return phone;
          }
        },
        getAccessories: function(accessories) {
          accessories = accessories || {
            total: 0,
            items: []
          };
          var accessory = Utility.getRandomElement(this.accessoriesInventory);
          if (this.isUnderThreshold(accessory.price)) {
            accessories.items.push(accessory);
            accessories.total += accessory.price;
            this.subtotal += accessory.price;
            return this.getAccessories(accessories);
          } else {
            return accessories;
          }
        }
      }, {}, $__super);
    }(PurchaseModel);
    var PurchasesModel = function() {
      function PurchasesModel() {
        this.purchases = [];
        this.total = 0;
        return {
          total: this.total,
          purchases: this.purchases,
          count: this.getCount,
          addPurchase: this.addPurchase,
          render: this.render
        };
      }
      return ($traceurRuntime.createClass)(PurchasesModel, {
        render: function(options) {
          var summaryTemplate = ("\n" + this.count() + " " + (options.title || "Purchase(s)") + "   " + Utility.formatAmount(this.total));
          var purchaseTemplate = [];
          for (var i = 0; i < this.purchases.length; i++) {
            purchaseTemplate.push(("" + this.purchases[i].render()));
          }
          purchaseTemplate = purchaseTemplate.join('\n' + Utility.dividerTemplate());
          return (purchaseTemplate + "\n" + Utility.dividerTemplate('=') + "\n" + summaryTemplate);
        },
        getCount: function() {
          return this.purchases.length;
        },
        addPurchase: function(purchase) {
          this.total += purchase.total;
          this.purchases.push(purchase);
        }
      }, {});
    }();
    var phonePurchaseOptions = {
      taxAmount: TAX_AMOUNT,
      phonesInventory: PHONES_INVENTORY,
      accessoriesInventory: ACCESSORIES_INVENTORY,
      threshold: SPENDING_THRESHOLD
    };
    var myBalance = 10000;
    var phones = new PurchasesModel();
    while (myBalance >= 0) {
      var phone = new PhonePurchaseModel(phonePurchaseOptions);
      if (myBalance - phone.total >= 0) {
        phones.addPurchase(phone);
        myBalance -= phone.total;
      } else {
        break;
      }
    }
    console.log(("" + phones.render({title: 'Phone(s)'})));
  })();
  return {};
});
$traceurRuntime.getModule("../src/phones.es6" + '');
//# sourceMappingURL=phones.js.map
