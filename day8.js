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
request.open('get', 'https://adventofcode.com/2020/day/8/input', true);  
request.send();

function found_last_jmp(codes, start)
{
     if (!start)
        start = codes.length - 1;
    for (let i = start; i >= 0; i--)
        if (codes[i].search("jmp") != -1)
        {
            codes[i].replace("jmp", "nop"); 
           return (codes);
        }
    return (-1);
}

function found_last_nop(codes, start)
{
    if (!start)
        start = codes.length - 1;
    for (let i = start; i >= 0; i--)
        if (codes[i].search("nop") != -1)
        {
            codes[i].replace("nop", "jmp"); 
           return (codes);
        }
    return (-1);
}

/* PART ONE

function treat_code(codes)
{
    let acc = 0;
    let done = [];
    let i = 0;
  //  let last = found_last_jmp(codes); 
   let last_nop = found_last_nop(codes);
    while (done.indexOf(i) == -1)
    {
        if (!codes[i] || codes[i] == "")
        {
            console.log("NATURAL END") 
           break;
        }
        let code = codes[i];
        done.push(i);
        let res = code.match(/([a-z]*)\s([-+0-9]*)/);
        console.log(res)
        if (res[1] == "acc")
            acc += parseInt(res[2]);
        if (res[1] == "jmp")
            i += parseInt(res[2]);
        else
            i++;
    }
    console.log(acc);
}
*/

//PART TWO (NOT WORKING)
function treat_code(codes)
{

    let start = codes.length - 1;
  //  let last = found_last_jmp(codes); 
   let last_nop = found_last_nop(codes);
    let clone = JSON.parse(JSON.stringify(codes));
    let acc = 0;
    for (let x = 0; x < 2; x++)
    {
        acc = 0;
        let start = clone.length - 1;
       stop = false;
        while (start >= 0 && !stop)
        {
             let done = [];
             let i = 0;
            console.log(start)
          
           
            codes = JSON.parse(JSON.stringify(clone));
            codes = (x == 0 ? found_last_jmp(clone, start) : found_last_nop(clone, start))
    
            while (done.indexOf(i) == -1 && !stop)
            {
                if (!codes[i] || codes[i] == "")
                {
                    console.log("NATURAL END") 
                    console.log(acc);
                    stop = true;
                    break;
                }
                let code = codes[i];
                done.push(i);
                let res = code.match(/([a-z]*)\s([-+0-9]*)/);
                if (res[1] == "acc")
                    acc += parseInt(res[2]);
                if (res[1] == "jmp")
                    i += parseInt(res[2]);
                else
                    i++;
            }
            start--;
        }
    }
    console.log(acc);
}
