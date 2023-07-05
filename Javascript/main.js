//必要な変数設定
var inputdata = document.getElementById("form");
var sentence = document.getElementById("sentence");
var timer = document.getElementById("timer");

//定数宣言
const asksec = 10;
const addsec = 4;

//タイピングデータをCSVから取得
var csvdata = document.getElementById("csv").textContent.trim();
var typedata = new Array(); 
var splitdata = csvdata.split(",");

//CSVデータを配列に格納
for(var i = 0; i < csvdata.length; ++i)
{
    if(splitdata[i])
    {
        typedata.push(splitdata[i]); 
    }
}

//最初に表示する文字を設定
sentence.textContent = typedata[getRandomNum(typedata.length)];
var count = asksec;

//設定した秒数経過するたびに呼ばれる設定
var intervalfunc = setInterval(function()
{
    timer.textContent = "Time Left:" + count.toString();

    if(count < 0)
    {
        count = 0;
        clearInterval(intervalfunc);
    }

    count--;
},1000)

//入力されたときのイベント設定
inputdata.addEventListener("input",function()
{
    //表示された文字と入力された文字が完全一致しているか確認
    if(sentence.textContent === inputdata.value)
    {
        //入力されている文字を消して、次の表示する文字をランダムに設定する
        inputdata.value = "";
        sentence.textContent = typedata[getRandomNum(typedata.length)];
        count += addsec;
    }
});

//0～maxまでの整数のランダムな数値を返す
function getRandomNum(max)
{
    return Math.floor(Math.random() * max);
}


