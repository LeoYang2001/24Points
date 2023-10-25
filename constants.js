const TotalCards = [
    require('./assets/pokerCards/2C.png'),
    require('./assets/pokerCards/2D.png'),
    require('./assets/pokerCards/2H.png'),
    require('./assets/pokerCards/2S.png'),
    require('./assets/pokerCards/3C.png'),
    require('./assets/pokerCards/3D.png'),
    require('./assets/pokerCards/3H.png'),
    require('./assets/pokerCards/3S.png'),
    require('./assets/pokerCards/4C.png'),
    require('./assets/pokerCards/4D.png'),
    require('./assets/pokerCards/4H.png'),
    require('./assets/pokerCards/4S.png'),
    require('./assets/pokerCards/5C.png'),
    require('./assets/pokerCards/5H.png'),
    require('./assets/pokerCards/5D.png'),
    require('./assets/pokerCards/5S.png'),
    require('./assets/pokerCards/6C.png'),
    require('./assets/pokerCards/6D.png'),
    require('./assets/pokerCards/6H.png'),
    require('./assets/pokerCards/6S.png'),
    require('./assets/pokerCards/7C.png'),
    require('./assets/pokerCards/7D.png'),
    require('./assets/pokerCards/7H.png'),
    require('./assets/pokerCards/7S.png'),
    require('./assets/pokerCards/8C.png'),
    require('./assets/pokerCards/8D.png'),
    require('./assets/pokerCards/8H.png'),
    require('./assets/pokerCards/8S.png'),
    require('./assets/pokerCards/9C.png'),
    require('./assets/pokerCards/9D.png'),
    require('./assets/pokerCards/9H.png'),
    require('./assets/pokerCards/9S.png'),
    require('./assets/pokerCards/AC.png'),
    require('./assets/pokerCards/AD.png'),
    require('./assets/pokerCards/AS.png'),
    require('./assets/pokerCards/AH.png'),
    require('./assets/pokerCards/JC.png'),
    require('./assets/pokerCards/JD.png'),
    require('./assets/pokerCards/JH.png'),
    require('./assets/pokerCards/JS.png'),
    require('./assets/pokerCards/KC.png'),
    require('./assets/pokerCards/KD.png'),
    require('./assets/pokerCards/KH.png'),
    require('./assets/pokerCards/KS.png'),
    require('./assets/pokerCards/QC.png'),
    require('./assets/pokerCards/QD.png'),
    require('./assets/pokerCards/QH.png'),
    require('./assets/pokerCards/QS.png'),
    require('./assets/pokerCards/TC.png'),
    require('./assets/pokerCards/TD.png'),
    require('./assets/pokerCards/TH.png'),
    require('./assets/pokerCards/TS.png'),
]


const Shuffle = (a)=>{
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


export default Shuffle(TotalCards)