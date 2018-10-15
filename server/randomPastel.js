
module.exports = () => {
    let rand = Math.random * 7;
    if(rand < 1) return '#FFC0CB' //pink
    if(rand < 2) return '#CBFFC0' //green
    if(rand < 3) return '#C0CBFF' //blue
    if(rand < 4) return '#FFF4C0' //yellow
    if(rand < 5) return '#F4C0FF' //other pink
    if(rand < 6) return '#E1C1ED' //lilac
    if(rand < 7) return '#C1EDE1' //other green
}