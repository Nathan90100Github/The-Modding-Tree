addLayer("tfd", {
    name: "the_first_difficulty", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TFD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    effect() {
        return 'tfd'.points.add(1).pow(0.25)
    },
    effectDisplay() {
        [this.layer].effect
    },
    color: "#333333",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "THE FIRST DIFFICULTY", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Gain THE FIRST DIFFICULTY", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    function() {
        if (hasUpgrade('na', 12)) autoPrestige('tfd')
    },
    upgrades:{
        11:{
            title: "Impossible to lose.",
            description: "You legit cannot lose to TFD. x5 win gain.",
            cost: new Decimal(50)
        },
        12:{
            title: "Free wins!",
            description: "Playing an obby with the difficulty The First Difficulty is just getting free wins. TFD boosts wins.",
            cost: new Decimal(2000),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    }
})
addLayer("na", {
    name: "na", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    effect() {
        return 'na'.points.add(1).pow(0.5)
    },
    effectDisplay() {
        [this.layer].effect
    },
    color: "#883388",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "N/A", // Name of prestige currency
    baseResource: "tfd", // Name of resource prestige is based on
    baseAmount() {return player.tfd.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Gain N/A", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title: "Still too simple",
            description: "We're starting to get a bit harder now! x8 win gain.",
            cost: new Decimal(30)
        },
        12:{
            title: "More everything!",
            description: "N/A isn't going to stop you. Neither will anyone be stopped by N/A. Automate TFD gain.",
            cost: new Decimal(100),
        }
    }
})