var bags = [];

function getBag(color){
    for (let x in bags)
        if (bags[x].Color == color)
            return (bags[x]);
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
        cur_bag = {
            Color: res[0],
            Contain: []
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
                        Contain: []
                    });
                    found = bags[bags.length - 1];
                 }
                console.log(found)
                cur_bag.Contain.push(getBag(color));
            }
        }
        bags.push(cur_bag)
    }
}
