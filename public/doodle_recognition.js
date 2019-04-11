const IMAGE_SIZE = 784;
const CLASSES = ['laptop', 'rainbow', 'baseball_bat', 'ice_cream', 'flower', 'suitcase', 'tree', 'microphone', 'sword', 'helmet', 'apple', 'umbrella', 'frying_pan', 'envelope', 'triangle', 'alarm_clock', 'paper_clip', 'light_bulb', 'scissors', 'cat', 't-shirt', 'ceiling_fan', 'key', 'mountain', 'table', 'moon', 'smiley_face', 'car', 'spoon', 'bird', 'saw', 'traffic_light', 'knife', 'wristwatch', 'shovel', 'circle', 'face', 'bridge', 'camera', 'bread', 'screwdriver', 'tennis_racquet', 'cell_phone', 'airplane', 'bed', 'baseball', 'moustache', 'candle', 'tooth', 'star', 'sock', 'dumbbell', 'lollipop', 'bicycle', 'hat', 'spider', 'clock', 'shorts', 'anvil', 'pants', 'syringe', 'ladder', 'axe', 'headphones', 'grapes', 'square', 'chair', 'coffee_cup', 'lightning', 'cookie', 'wheel', 'pencil', 'cloud', 'mushroom', 'door', 'drums', 'fan', 'bench', 'sun', 'stop_sign', 'eye', 'beard', 'radio', 'snake', 'line', 'power_outlet', 'diving_board', 'rifle', 'eyeglasses', 'broom', 'donut', 'pillow', 'hot_dog', 'butterfly', 'hammer', 'basketball', 'book', 'tent', 'pizza', 'cup'];
let model;
let drawingcanvas;

async function loadMyModel() {
    model = await tf.loadLayersModel('./model/model.json');
    model.summary();
    console.log('load my model');
}


function setup() {
    // load the model
    loadMyModel();
    console.log('load model');
}

function createDrawingCanvas() {
    drawingcanvas = createCanvas(280, 280);
    background(255);
    drawingcanvas.mouseReleased(guess);

    // make the canvas the child of container
    drawingcanvas.parent('drawing-container');


    let guessButton = select('#guess');
    guessButton.mousePressed(guess);

    let clearButton = select('#clear');
    clearButton.mousePressed(() => {
        background(255);
        select('#res').html('');
    });
}

function guess() {
    // Get input image from the canvas
    const inputs = getInputImage();

    // Predict
    let guess = model.predict(tf.tensor([inputs]));

    // Format res to an array
    const rawProb = Array.from(guess.dataSync());

    // Get top 5 res with index and probability
    const rawProbWIndex = rawProb.map((probability, index) => {
        return {
            index,
            probability
        }
    });

    const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
    const top5ClassWIndex = sortProb.slice(0, 5);
    const top5Res = top5ClassWIndex.map(i => CLASSES[i.index]);
    select('#res').html(`I see ${top5Res.toString()}`);
}

function getInputImage() {
    let inputs = [];
    // p5 function, get image from the canvas
    let img = get();
    img.resize(28, 28);
    img.loadPixels();

    // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
    let oneRow = [];
    for (let i = 0; i < IMAGE_SIZE; i++) {
        let bright = img.pixels[i * 4];
        let onePix = [parseFloat((255 - bright) / 255)];
        oneRow.push(onePix);
        if (oneRow.length === 28) {
            inputs.push(oneRow);
            oneRow = [];
        }
    }

    return inputs;
}

function draw() {

    strokeWeight(10);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

}
