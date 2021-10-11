module.exports = async function(msg, args){
    // console.log(msg.author);
    // console.log(msg);

    if (msg.author.id == '429686973205053451') {
        try{
            if(parseInt(args) >= 1 && parseInt(args) <= 100){
                msg.channel.bulkDelete(parseInt(args));
            }else{
                msg.channel.send('Você só pode eliminar entre 1 e 100 mensagens de uma só vez.');
            }
        }catch(error){
            msg.channel.send('Houve um erro com o seu comando: ' + error);
        } 
    }else{
        msg.channel.send('Então você quer destruir este canal? Não permitirei 😒');
    }
}