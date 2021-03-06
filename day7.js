// https://adventofcode.com/2020/day/7

var bags = [];

// -- XHR to get the input

function successListener() {
  var data = this.responseText.split("\n"); // split the rules
	console.log(data)
	bags = []
	treat_rules(data);
	console.log(bags)
	// Part ONE
	setParents(bags);
	let gold_bags = bags.filter(a => a.HasGold).sort((a, b) => a.Color < b.Color ? -1 : 1);
	gold_bags = gold_bags.filter(function(item, pos) {
		return gold_bags.indexOf(item) == pos;
	})
	console.log(gold_bags) // Result
	console.log("Shiny Gold bag can be hold in %d bags",gold_bags.length) // Result

	//Part Two
	console.log("Shiny Gold bag can contain %d bags", count_childs(getBag("shiny gold")));
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

function setParents(bags_list)
{
	for (let x in bags_list)
		if (bags_list[x].HasGold)
			setParentsGold(bags_list[x])
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

function count_childs(bag)
{
	var count = 0;

	for (var x in bag.Contain)
	{
		count++;
		count += count_childs(bag.Contain[x])
	}
	return (count)
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
		if (res[1] != "no other bags.")
		{
			for (let y in contain_split)
			{
				let bag_split = contain_split[y].match(/(\d)([a-z ]*) bag(s|)/);
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
				found.Parents.push(cur_bag)
				if (color == "shiny gold")
					cur_bag.HasGold = true;
				for (let i = 0; i < count; i++)
					cur_bag.Contain.push(getBag(color));
			}
		}
		bags.push(cur_bag)
	}
}
