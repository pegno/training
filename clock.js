class TimeConst {
  constructor() {
    this.h = 24;
    this.m = 60;
    this.s = 60;
    this.coefficient = 60; // 1日が何分か-の係数
    this.diff = 84000; // 時刻調節
  }
}

clock();

function clock () {
    var tc = new TimeConst();

    // 現在日時を取得
    const d = new Date();
    const t = new TimeConst();

    // デジタル時計を更新
    updateDigitalClock(d, t);

    // 次の「0ミリ秒」に実行されるよう、次の描画処理を予約
    const delay = 1000 - new Date().getMilliseconds();
    setTimeout(clock, 0);
}

function updateDigitalClock (d, t) {
    const paraMilliSecond = 1000 * ( t.coefficient / (t.h * t.m) );

    const timeAdjust = paraMilliSecond * 84000 ;

    const d2ms = paraMilliSecond * 60 * 60 * 24;
    const h2ms = paraMilliSecond * 60 * 60;
    const m2ms = paraMilliSecond * 60;

    let originalMilliSeconds = Math.floor((d.getTime() % d2ms) + timeAdjust);
    let hh = Math.floor(originalMilliSeconds / h2ms);

    if(hh > 23) { hh = hh - 24; }
    let mm = Math.floor((originalMilliSeconds % h2ms) / m2ms);
//    let ss = ((originalSeconds % h2ms) % m2ms);

    // 桁あわせ
    if(hh < 10) { hh = "0" + hh; }
    if(mm < 10) { mm = "0" + mm; }
    //if(ss < 10) { ss = "0" + ss; }

    //var text = YY + '/' + MM + '/' + DD + ' (' + AA_str[AA] + ')<br>' + hh + ':' + mm + ':' + ss
    //console.log(VAL);
    var text = hh + ":" + mm;
    document.getElementById("digital_clock").innerHTML = text;
}
