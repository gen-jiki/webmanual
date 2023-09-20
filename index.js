let hoge = document.getElementById("hogehoge");
let hoge2 = document.getElementById("hogehoge2");
let element =  document.getElementById("myDiv");
// hoge.textContent = "Hello, js!"

let image = "";

let lislis = [];

let x = 0;
let y = 0;

function piyo(geko) {
    // let jira = document.createElement("br");
    // geko.appendChild(jira);
    // jira = document.createElement("img");
    // jira.src = image;
    // geko.appendChild(jira);
    // // スタイルを設定して位置を指定
    // jira.style.position = "absolute";
    // jira.style.left = 300 + "px";
    // jira.style.top = 300 + "px";

}

function downloadArrayAsTextFile() {
    // ダウンロードする配列データ
    var dataArray = ["Item 1", "Item 2", "Item 3", "Item 4"];

    // 配列データをテキストに変換
    var textData = lislis.join('\n');

    // Blobオブジェクトを作成
    var blob = new Blob([textData], { type: 'text/plain' });

    // ダウンロード用のリンクを作成
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'myArray.txt'; // ダウンロード時のファイル名を指定

    // リンクをクリックしてダウンロードを開始
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const selectFile = () => {
    // FileListオブジェクト取得
    const selectFiles = document.querySelector("#select-file").files
    console.log("Hello, file!")

    // Fileオブジェクト取得
    const file = selectFiles[0]

    // FileReaderオブジェクト取得
    const reader = new FileReader()
    reader.readAsText(file)

    // ファイル読み込み完了時の処理
    reader.onload = () => {
        console.log(reader.result)
        test = reader.result
        filerecords = test.split("\n")
        //   filetext = test.split("\n")[2].split(",").slice(2).join(",");
        for (const item of filerecords){
            const paragraphContainer = document.getElementById("hogehoge");
            const paragraph = document.createElement("div");
            // paragraph.innerHTML = item.split(",").slice(2).join(",").slice(1, -1);
            paragraph.innerHTML = item;
            // para_id += 1;
            // paragraph.id = para_ini + para_id;
            paragraphContainer.appendChild(paragraph);
    
            // スタイルを設定して位置を指定
            // paragraph.style.position = "absolute";
            // paragraph.style.left = item.split(",")[0] + "px";
            // paragraph.style.top = item.split(",")[1] + "px";
            // paragraph.style.left = 0 + "px";
            // paragraph.style.top = 0 + "px";

            if (lislis != ""){
                lislis += "\r\n"
            }
            lislis += item
        }
        lislis = lislis.split("\r\n")
        console.log(filerecords)

        const fileset = document.getElementById("select-file");
        fileset.value = ""
    }

    // ファイル読み込みエラー時の処理
    reader.onerror = () => {
        console.log("ファイル読み込みエラー")
    }
}

document.addEventListener("keydown", function(event){
    if (event.key === "a"){
        piyo(hoge2);
    }
    if (event.key === "Enter"){
        let jira = document.createElement("div");
        jira.innerHTML = element.innerHTML;
        console.log(element.innerHTML)
        // div要素内の最初の画像を取得
        let imgElement = element.querySelector("img");
        // imgElementがnullでないことを確認してから処理を行う
        if (imgElement) {
            // 画像が見つかった場合、imgElementを使用して操作を行う
            // 例: 画像の幅を取得する
            var imgWidth = imgElement.width;
            
            // 例: 画像のsrc属性を取得する
            var imgSrc = imgElement.src;
            
            // 他の操作も行えます
        } else {
            // 画像が見つからなかった場合の処理
            console.log("画像が見つかりませんでした。");
        }
        if(!element.innerHTML == ""){
            lislis.push(element.innerHTML)
            console.log(lislis)
            element.textContent = "";
            hoge.appendChild(jira);
        }
    }
})

document.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        element.textContent = "";
    }
})

// document.addEventListener("click", function(event){
//     x = event.clientX;
//     y = event.clientY;

//     let jira = document.createElement("img");
//     jira.src = image;
//     hoge.appendChild(jira);

//     // スタイルを設定して位置を指定
//     jira.style.position = "absolute";
//     jira.style.left = x + "px";
//     jira.style.top = y + "px";
// })

element.addEventListener("paste", function(e){
    // 画像の場合
    // e.clipboardData.types.length == 0
    // かつ
    // e.clipboardData.types[0] == "Files"
    // となっているので、それ以外を弾く
    if (!e.clipboardData 
            || !e.clipboardData.types
            || (e.clipboardData.types.length != 1)
            || (e.clipboardData.types[0] != "Files")) {
            return true;
    }

    // ファイルとして得る
    // (なぜかgetAsStringでは上手くいかなかった)
    var imageFile = e.clipboardData.items[0].getAsFile();

    // FileReaderで読み込む
    var fr = new FileReader();
    fr.onload = function(e) {
        // onload内ではe.target.resultにbase64が入っているのであとは煮るなり焼くなり
        var base64 = e.target.result;
        image = base64;
        // document.getElementById("outputImage").src = base64;
    };
    fr.readAsDataURL(imageFile);

    // 画像以外がペーストされたときのために、元に戻しておく
    // this.innerHTML = "paste image here";
});