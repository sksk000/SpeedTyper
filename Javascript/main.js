//必要な変数設定
var inputdata = document.getElementById("form");
var sentence = document.getElementById("sentence");

//タイピングデータをCSVから取得
var csvdata = document.getElementById("csv").textContent.trim();
var typedata = new Array(); 
var splitdata = csvdata.split(",");

console.log(typeof(splitdata[1]));
//CSVデータを配列に格納
for(var i = 0; i < csvdata.length; ++i)
{
    if(splitdata[i])
    {
        typedata.push(splitdata[i]); 
    }
}


sentence.textContent = typedata[0];

inputdata.addEventListener("input",function()
{
    if(sentence.textContent === inputdata.value)
    {
        inputdata.value = "";
        sentence.textContent = typedata[getRandomNum(typedata.length)];
    }
});

//0～maxまでの整数のランダムな数値を返す
function getRandomNum(max)
{
    return Math.floor(Math.random() * max);
}


