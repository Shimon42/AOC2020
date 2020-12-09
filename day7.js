// https://adventofcode.com/2020/day/7

var bags = [];

// -- XHR to get the input

function successListener() {  
  var data = this.responseText.split("\n"); // split the rules
    console.log(data)
    bags = []
    treat_rules(data);
    console.log(bags)
    setParents(bags);
    console.log(bags.filter(a => a.HasGold));
}

function failureListener(err) {  
  console.log('Request failed', err);  
}

var request = new XMLHttpRequest();  
request.onload = successListener;  
request.onerror = failureListener;  
request.open('get', 'https://adventofcode.com/2020/day/7/input', true);  
request.send();

// -- functions
var bags = [];

function getBag(color){
    for (let x in bags)
        if (bags[x].Color == color)
            return (bags[x]);
}

function setParents(bags)
{
    for (let x in bags)
        if (bags[x].HasGold)
            setParentsGold(bags[x])
}

function setParentsGold(bag)
{
    var parents = bag.Parents;
    if (parents)
        for (let x in parents)
        {
            parents[x].HasGold = true;
            setParentsGold(parents[x]);
        }
    
}

function treat_rules(rules)
{
    
    for (let x in rules)
    {
    if (!rules[x].length)
            continue;
        var cur_bag;
        let res = rules[x].split(" bags contain ");
        let contain_split = res[1].split(", ");
        if (!(cur_bag = getBag(res[0])))
            cur_bag = {
                Color: res[0],
                Contain: [],
                HasGold: false,
                Parents: [],
                ObjectType: "Bag"
             };
        console.log(contain_split)
        if (res[1] != "no other bags.")
        {
            for (let y in contain_split)
            {
                console.log(contain_split[y])

                let bag_split = contain_split[y].match(/(\d)([a-z ]*) bag(s|)/);
                console.log(bag_split)
                let count = bag_split[1].trim();
                let color = bag_split[2].trim();
                let found;
                if (!(found = getBag(color)))
                {
                    bags.push({
                        Color: color,
                        Contain: [],
                        HasGold: false,
                        Parents: [cur_bag]
                    });
                    found = bags[bags.length - 1];
                 }
                cur_bag.Parents.push(found)
                console.log(found)
                if (color == "shiny gold")
                    cur_bag.HasGold = true;
                cur_bag.Contain.push(getBag(color));
            }
        }
        bags.push(cur_bag)
    }
}
