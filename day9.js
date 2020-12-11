// https://adventofcode.com/2020/day/7
let stop = false;

// -- XHR to get the input

function successListener() {  
  var data = this.responseText.split("\n"); // split the rules
    console.log(data)
   treat_code(data);
}

function failureListener(err) {  
  console.log('Request failed', err);  
}

var request = new XMLHttpRequest();  
request.onload = successListener;  
request.onerror = failureListener;  
request.open('get', 'https://adventofcode.com/2020/day/9/input', true);  
request.send();

function is_add(nbr, head)
{
    let x = 0;
    let y = 0;
    for (x = 0; x < head.length; x++)
    {
        for (y = 0; y < head.length; y++)
        {
            if (head[x] + head[y] == nbr && x != y)
                return (true)
        }
    }
    return (false);
}

function treat_code(data)
{
    let clone = JSON.parse(JSON.stringify(data));
    let head = clone.slice(0,25).map(a => parseInt(a));
    let body = data.slice(25, data.length).map(a => parseInt(a))
    console.log(head)
    console.log(body)
    for (let x = 0; x < body.length; x++)
    {
        let res; 
       if ((res = is_add(body[x], head)) == false)
       {
            console.log("FOUND BAD")
            console.log(body[x])
            return (body[x])
       }
        head.shift()
        head.push(body[x])
        console.log(head)
        console.log(res)
    }
}
/* PART TWO NOT WORKING
function treat_code(data)
{
    let clone = JSON.parse(JSON.stringify(data));
    let head = clone.slice(0,25).map(a => parseInt(a));
    let body = data.slice(25, data.length).map(a => parseInt(a))
    let check = false;
    console.log(head)
    console.log(body)
    for (let x = 0; x < body.length; x++)
    {
        let res; 
       if ((res = is_add(body[x], head)) == false)
       {
            console.log("FOUND BAD")
            console.log(body[x])
             console.log(head)
            check = body[x];
       } else if (check != false)
       {
         console.log("FOUND BADEND")
            console.log(body[x])
             console.log(head)
            console.log("RES: %d", check + body[x]);
            console.log("res-1 %d", check + body[x - 1])
            check = true;
            return;
        }
        head.shift()
        head.push(body[x])
        console.log(head)
        console.log(res)
    }
}*/
