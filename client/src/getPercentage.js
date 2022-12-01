export const getPercentage = (str) => {
    let stack = [];

    let UNDERSTOOD = 0;
    let SOMEWHATUNDERSTOOD = 0;
    let NOTCLEAR = 0;
    let WHATRUBBISH = 0;
    let count = 0;

    for (let value of str) {
        let lestEle = stack[stack.length - 1];

        if (lestEle === '[' && value === ']') {
            stack.pop();
            UNDERSTOOD += 4;
            count++
        }
        if ('[' === value) stack.push(value);

        if (lestEle === "<" && value === '>') {
            stack.pop();
            SOMEWHATUNDERSTOOD += 3;
            count++
        }
        if ("<" === value) stack.push(value);

        if (lestEle === '(' && value === ')') {
            stack.pop();
            NOTCLEAR += 2;
            count++
        }
        if ("(" === value) stack.push(value);

        if (lestEle === '/' && value === '?') {
            stack.pop();
            WHATRUBBISH += 1;
            count++
        }
        if ("/" === value) stack.push(value);
    }

    return {
        UNDERSTOOD: (UNDERSTOOD / (count * 4) * 100).toFixed(2),
        SOMEWHATUNDERSTOOD: (SOMEWHATUNDERSTOOD / (count * 4) * 100).toFixed(2),
        WHATRUBBISH: (WHATRUBBISH / (count * 4) * 100).toFixed(2),
        NOTCLEAR: (NOTCLEAR / (count * 4) * 100).toFixed(2),
    }
    // console.log((UNDERSTOOD / (count * 4) * 100).toFixed(2) , 'UNDERSTOOD')
    // console.log((SOMEWHATUNDERSTOOD / (count * 4) * 100).toFixed(2) , 'SOMEWHATUNDERSTOOD')
    // console.log((WHATRUBBISH / (count * 4) * 100).toFixed(2) , 'WHATRUBBISH')
    // console.log((NOTCLEAR / (count * 4) * 100).toFixed(2) , 'NOTCLEAR')
}



// console.log(getmark('[ Lorem ipsum dolor sit amet,] , [consectetur adipisicing elit.] [ Natus corporis deserunt magni, ] [dolorum atque aliquam! ] , < Lorem ipsum dolor sit amet, consectetur adipisicing elit.> < Natus corporis deserunt magni, dolorum atque aliquam! > , ( Lorem ipsum dolor sit amet, consectetur adipisicing elit.) (ASDgtsgrgwaggag) (Natus corporis deserunt magni, dolorum atque aliquam! ) / ajaofiaf0fu0weu9weoadamno ? /seestsrtgdrhd ? '));
