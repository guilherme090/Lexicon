const replies = [
    ['Hello!', 'https://tenor.com/view/hi-hello-wave-gif-5957952'],
    ['Good morning!', 'https://tenor.com/view/good-morning-love-heart-sunrise-gif-16970370'],
    ['Good afternoon!', 'https://tenor.com/view/kellemes-délutánt-good-afternoon-date-table-cake-gif-17731335'],
    ['Good evening!', 'https://tenor.com/view/good-evening-sunset-beach-gif-11855750'],
    ['Good night!', 'https://tenor.com/view/golden-retriever-pjs-blue-yawning-cute-gif-14489623'],
    [`It's nice to meet you`, 'https://tenor.com/view/nice-to-meet-you-kit-harington-cat-warner-popbuzz-meets-popbuzz-gif-17291595'],
    [`It's a pleasure to meet you`, 'https://tenor.com/view/nice-to-meet-you-handshake-congratulations-congrats-gif-gif-18471224']
];

module.exports = function(msg, args){
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index][0]);
    msg.channel.send(replies[index][1]);
    msg.channel.send('Via Tenor.');
    // console.log(msg.guild);
}
