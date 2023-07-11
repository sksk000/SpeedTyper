//必要な変数設定
var inputdata = document.getElementById("inputtypearea");
var sentence = document.getElementById("sentence");
var timer = document.getElementById("timer");
var score = document.getElementById("score");
var typerarea = document.getElementById("typetext");
var reloadbutton = document.getElementById("reloadbutton");
var result = document.getElementById("result");
var resultscore = document.getElementById("resultscore");
var optionbutton = document.getElementById("optionbutton");
var option = document.getElementById("selectdefficalty");
var optionlist = document.getElementById("optionlist");



//現在のHTMLデータを取得
var defaultHTML = document.body.innerHTML;

//定数宣言
const asksec = 10;
const addsec = 4;

//タイピングデータを格納する変数用意
var typedata = new Array();
typedata = readCSV();

//初期化処理を行う
var seccount = 0;
var pointcount = 0;

//現在の難易度の番号
var selectIndex;

initsspeedtyper();

//インターバルのIDを格納しておく(消したりするため)
var intervalId = setInterval(updateTimer,1000);

//設定した秒数経過するたびに呼ばれる設定
function updateTimer()
{
    //秒数カウントダウン
    seccount--;

    //秒数が0以下だったらタイマー処理を停止する
    if(seccount < 0)
    {
        seccount = 0;
        if(intervalId)
        {
            clearInterval(intervalId);
        }

        //終了時に画面を変更
        showresult();
    }
    else
    {
        timer.textContent = "Time Left:" + seccount.toString();
    }
    
}

//入力されたときのイベント設定
inputdata.addEventListener("input",function()
{
    //表示された文字と入力された文字が完全一致しているか確認
    if(sentence.textContent === inputdata.value)
    {
        //入力されている文字を消して、次の表示する文字をランダムに設定する
        inputdata.value = "";
        sentence.textContent = typedata[selectIndex][getRandomNum(typedata[selectIndex].length)];

        //スコア追加と時間追加
        seccount += addsec;
        pointcount++;

        //スコアと時間表示
        score.textContent = "Score:" + pointcount.toString();
        timer.textContent = "Time Left:" + seccount.toString();

        //今使用しているインターバルを停止して新たにインターバルを生成して開始する
        if(intervalId)
        {
            clearInterval(intervalId);
        }
        intervalId = setInterval(updateTimer,1000);

    }
});

//0～maxまでの整数のランダムな数値を返す
function getRandomNum(max)
{
    return Math.floor(Math.random() * max);
}

reloadbutton.addEventListener("click",function()
{
    //リセット処理を行う
    resetspeedtyper();
})

//リザルト画面表示
function showresult()
{
    result.style.display = "inline";
    typerarea.style.display = "none";

    resultscore.textContent = "Your final score is " + pointcount.toString();

}

//リセット処理
function resetspeedtyper()
{
    //初期化処理を行う
    initsspeedtyper();

    //タイマーの処理開始
    intervalId = setInterval(updateTimer,1000);

    result.style.display = "none";
    typerarea.style.display = "inline";
}

//初期化処理
function initsspeedtyper()
{
    //現在選択されているオプションIndexを設定する
    selectIndex = optionlist.selectedIndex;

    //最初に表示する文字を設定
    sentence.textContent = typedata[selectIndex][getRandomNum(typedata.length)];
    score.textContent = "Score:0"

    //制限時間とスコアの初期値入力
    seccount = asksec;
    pointcount = 0;
    timer.textContent = "Time Left:" + seccount.toString();

    //入力部分をきれいにしておく
    inputdata.value = "";
}

//上にある難易度選択をボタンを押したら非表示にするように変更
optionbutton.addEventListener("click",function()
{
    option.classList.toggle("openoption");
})

//CSVのデータを読む
function readCSV()
{
    var ret = new Array();
    //用意しているCSVデータを取得する
    for(var i = 0; i < optionlist.options.length; ++i)
    {
        //データをCSVから取得
        var csvdata = document.getElementById(optionlist.options[i].innerText.toLowerCase()).textContent.trim();
        var data = new Array(); 
        var splitdata = csvdata.split(",");

        var data = new Array();
        //CSVデータを配列に格納
        for(var j = 0; j < csvdata.length; ++j)
        {  
            if(splitdata[j])
            {
                data.push(splitdata[j]); 
            }
        }

        //二次元配列を作成する
        ret.push(data);
    }

    return ret;

}