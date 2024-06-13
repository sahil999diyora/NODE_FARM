const http = require("http")
const fs = require("fs")
const url = require("url")

const server = http.createServer((req,res)=>{

    let JSON_DATA = JSON.parse(fs.readFileSync("data.json","utf-8"))

    let URL_DATA = url.parse(req.url,true)
    let URL_ANS = URL_DATA.pathname

    // console.log(URL_DATA);
    // console.log(URL_ANS);


    if (URL_ANS == "/") 
    {
        data = " "  

    for (let i = 0; i < JSON_DATA.length; i++) 
    {

        let organic = ""

        if(JSON_DATA[i].organic == true)
        {
            organic = "ORGENIC" 
        }
        else
        {
            organic = "INORGENIC"
        }

        data = data + fs.readFileSync("overviewdata.html","utf-8")
        .replace(/<%%EMOJI%%>/g,JSON_DATA[i].image)
        .replace("<%%TITLE%%>",JSON_DATA[i].productName)
        .replace("<%%ORGANIC%%>",organic)
        .replace("<%%DETAIL%%>",JSON_DATA[i].quantity)
        .replace(/<%%PRICE%%>/g,JSON_DATA[i].price)
        .replace("<%%ID%%>",i)
    }

        const ans = fs.readFileSync("overview.html","utf-8")
        .replace("<%%ALL_DATA%%>",data)
        
        res.write(ans);    
    }
    else if(URL_ANS == "/product.html")
    {
            let ANS = URL_DATA.query.id

            let organic = ""

            if(JSON_DATA[ANS].organic == true)
            {
                organic = "ORGENIC" 
            }
            else
            {
                organic = "INORGENIC"
            }

            PRODUCT_DATA = fs.readFileSync("product.html","utf-8")
                .replace(/<%%EMOJI%%>/g,JSON_DATA[ANS].image)
                .replace("<%%%from%%>",JSON_DATA[ANS].from)
                .replace("<%%TITLE%%>",JSON_DATA[ANS].productName)
                .replace("<%%nutrients%%>",JSON_DATA[ANS].nutrients)
                .replace("<%%description%%>",JSON_DATA[ANS].description)
                .replace("<%%DETAIL%%>",JSON_DATA[ANS].quantity)
                .replace(/<%%PRICE%%>/g,JSON_DATA[ANS].price)
                .replace("<%%TITLE%%>",JSON_DATA[ANS].productName)
                .replace("<%%ORGANIC%%>",organic)

            res.write(PRODUCT_DATA)
    }


    res.end();

}).listen(8080)