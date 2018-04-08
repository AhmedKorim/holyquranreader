// async function get(url) {
//
//     const data=  await fetch(url);
//     const dataGet = await data.json();
//     return dataGet.data.ayahs;
// }
class quran {
    async data(number) {
        if (number >= 1 && number <= 114) {
            const data = await fetch(`http://api.alquran.cloud/surah/${number}/ar.alafasy`);
            const getData = await data.json();
            const ayat =await getData.data.ayahs
            const souraName =await getData.data.name
            return {ayat,souraName};
        } else {

        }
    }
}

class ui {
    constructor() {
        this.sourBody = document.querySelector('#soura-body');
        this.fullTime;
        this.intervalId;
        this.active;
        this.junk;

    }


    creatAyas(ayat) {
        let UIsouraText = "",
            souraname=document.getElementById("souraname");
        ayat.ayat.forEach(function (aya, index) {
            index = index === 0 ? "" : index;
            UIsouraText += `<div class="aya">  <audio src="${aya.audio}" id="play${index}"></audio><span class="bacgroundProgress" id="heighlight${index}"></span><span 
class="aya-text" 
data-index="${index}">
${aya.text}<span 
class="aya-index">${index}</span></span></div>`
        })
        this.sourBody.innerHTML = UIsouraText;
        souraname.innerHTML=ayat.souraName;
        this.play()
    }


    play() {
        this.sourBody.addEventListener("click", (e) => {
            if (e.target.className === "aya-text") {
                this.active=e.target;
                let width=getComputedStyle(this.active).width;
                    width=width.slice(0,-2);
                this.junk = Array.from(this.sourBody.children);
                let curentplay = document.querySelector(`#play${this.active.getAttribute("data-index")}`);

                this.junk.forEach((i) => {
                    let audio = i.querySelector('audio');
                    audio.pause();
                    audio.currentTime = 0;

                });
                curentplay.play();
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                this.fullTime = curentplay.duration;
                this.intervalId = setInterval(() => {
                        this.curentplayTime = curentplay.currentTime;
                        this.heigHtligh(width)
                        if (this.fullTime <= this.curentplayTime) {

                            clearInterval(this.intervalId)
                            this.active.parentElement.nextElementSibling.querySelector('.aya-text').click();
                        }
                    }
                    , 100);
            }
        })

    }

    heigHtligh(width) {
        let curentBackGround = document.querySelector(`#heighlight${this.active.getAttribute("data-index")}`);
        this.junk.forEach((i) => {
             i.querySelector('.bacgroundProgress').style.width=0;

        });
            curentBackGround.style.width=`${(this.curentplayTime/this.fullTime)*width}px`;


    }


}
document.querySelector(".btn").addEventListener("click",function (e) {
    e.preventDefault()

    let val  = document.querySelector(".fetch").value,

    safha;
    let one = new quran,
        soura = one.data(val).then(function (data) {
          
            safha = new ui();
            safha.creatAyas(data);
        })

})

