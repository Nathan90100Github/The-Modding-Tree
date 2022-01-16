addLayer("g", {
    name: "games", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#9BB0F4",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "games", // Name of prestige currency
    baseResource: "gamers", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g',13)) mult = mult.div(upgradeEffect('g',13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for games", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title:"The day video games appeared.",
            description:"It's a normal day in the 70's, and one of the first video games is done developping. Give Games an effect.",
            cost: new Decimal(0),
            effect() {
                  return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12:{
            title:"Pong",
            description:"Pong is a very know game, while also being very old. Double Gamers gain.",
            cost: new Decimal(1)
        },
        13:{
            title:"Pac-Man",
            description:"Pac-Man is one of the most well known arcade games. Games divide Games requirement.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.3).add(0.1)
           },
          effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
        },
        14:{
            title:"Donkey Kong",
            description:"An arcade game which added 2 very well known video game characters: Donkey Kong and Mario. Gamers boost Gamers gain.",
            cost: new Decimal(6),
            effect() {
                return player.points.add(1).pow(0.4).add(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        15:{
            title:"Space Invaders",
            description:"idk what to say about this game it's just very cool but very hard... Gain a boost to all previous upgrade effects(if they have scaling effects).",
            cost: new Decimal(10)
        }
    },
    milestones:{
        10:{
            requirementDescription: "5 Games Required",
            effectDescription: "Gamers are multiplied by 1.25 for every milestone you get.",
        
            done() { 
                return player.g.points.gt(4.5);
            },
        
        },
        20:{
            requirementDescription: "11 Games Required",
            effectDescription: "You can bulk buy Games.",
        
            done() { 
                return player.g.points.gt(10.5);
            },
        },
    },
})
