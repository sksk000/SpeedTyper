//必要な変数設定
var inputdata = document.getElementById("form");
var sentence = document.getElementById("sentence");
var timer = document.getElementById("timer");
var score = document.getElementById("score");

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
score.textContent += "0";
var seccount = asksec;
var pointcount = 0;

//設定した秒数経過するたびに呼ばれる設定
var intervalfunc = setInterval(function()
{
    if(seccount <= 0)
    {
        seccount = 0;
        clearInterval(intervalfunc);
    }
    else
    {
        seccount--;
        timer.textContent = "Time Left:" + seccount.toString();
    }
    
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

        //スコア追加と時間追加
        seccount += addsec;
        pointcount++;

        score.textContent = "Score:" + pointcount.toString();
    }
});

//0～maxまでの整数のランダムな数値を返す
function getRandomNum(max)
{
    return Math.floor(Math.random() * max);
}


