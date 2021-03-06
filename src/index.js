require('dotenv').config();
const ethers = require('ethers');
const pieABI = require('./abis/pie.json');
const gasNow = require('./apis/gasnow');  
const discord = require('./apis/discord');

const provider = ethers.getDefaultProvider('mainnet', {
    infura: process.env.INFURA_KEY,
});

const pie = process.env.PIE.toLowerCase();
const pieName = process.env.PIENAME;

async function run() {
    console.log('Running');
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    wallet = wallet.connect(provider);
    let pool = new ethers.Contract(pie, pieABI, wallet);

    
    

    // Get Gas Now
    let gasPrices = {rapid: 95000000000}; //await gasNow.fetchGasPrice();

    console.log('Rapid Gas is:', gasPrices.rapid);
    let hash = await pool.pokeWeights({gasLimit: '100000000000', gasPrice: gasPrices.rapid});
    //await discord.notify(`Poking weights of ${pieName} at ${Date.now()}, next pokeing in ${process.env.INTERVAL} seconds.`)
    console.log('Poke tx hash:', hash);
}

setInterval(function(){ run()}, process.env.INTERVAL || 60000)
run();