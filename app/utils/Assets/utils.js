const id_regex = /\b\d+\.\d+\.(\d+)\b/;

const Utils = {

    get_asset_precision: (precision) => {
        precision = (precision && precision.toJS) ? precision.get("precision") : precision;
        return Math.pow(10, precision);
    },

    get_asset_amount: function(amount, asset) {
        if (amount === 0) return amount;
        if (!amount) return null;
        return amount / this.get_asset_precision(asset.toJS ? asset.get("precision") : asset.precision);
    },

    get_asset_price: function(quoteAmount, quoteAsset, baseAmount, baseAsset, inverted = false) {
        if (!quoteAsset || !baseAsset) {
            return 1;
        }
        var price = this.get_asset_amount(quoteAmount, quoteAsset) / this.get_asset_amount(baseAmount, baseAsset);
        return inverted ? 1 / price : price;
    },

    are_equal_shallow: function(a, b) {
        if (!a && b || a && !b) {
            return false;
        }
        if (Array.isArray(a) && Array.isArray(a)) {
            if (a.length > b.length) {
                return false;
            }
        }
        for(var key in a) {
            if(!(key in b) || a[key] !== b[key]) {
                return false;
            }
        }
        for(var key in b) {
            if(!(key in a) || a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    },

    limitByPrecision: function(value, assetPrecision) {
        let valueString = value.toString();
        let splitString = valueString.split(".");
        if (splitString.length === 1 || splitString.length === 2 && splitString[1].length <= assetPrecision) {
            return valueString;
        } else {
            return splitString[0] + "." + splitString[1].substr(0, assetPrecision);
        }
    },

    estimateFee: function(op_type, options, globalObject) {
        // if (!globalObject) return 0;
        // let op_code = ops[op_type];
        // let currentFees = globalObject.getIn(["parameters", "current_fees", "parameters", op_code, 1]).toJS();
        //
        // let fee = 0;
        // if (currentFees.fee) {
        //     fee += currentFees.fee;
        // }
        //
        // if (options) {
        //     for (let option of options) {
        //         fee += currentFees[option];
        //     }
        // }
        //
        // return fee * globalObject.getIn(["parameters", "current_fees", "scale"]) / 10000;
        return 0;
    },

    replaceName(name, isBitAsset = false) {
        let prefix = isBitAsset ? "bit" : null;

        return {
            name,
            prefix
        };
    }

};

export default Utils;
